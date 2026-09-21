import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Minus, Plus, Trash2, Loader2, CheckCircle2 } from "lucide-react";
import { menu, findItemByNo, BUSINESS, CDN, type MenuItem } from "@/data/menu";
import { placeOrder } from "@/lib/orders.functions";
import { waLink } from "@/components/WhatsAppButton";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu & Number Ordering — Spice Arena Lahore" },
      {
        name: "description",
        content:
          "Browse the full Spice Arena menu and order by dish number. Chinese, desi karahi, continental, kids, desserts and drinks.",
      },
      { property: "og:title", content: "Menu & Number Ordering — Spice Arena Lahore" },
      {
        property: "og:description",
        content: "Tap a dish number to build your order, get a token number and send it to the kitchen.",
      },
      { property: "og:image", content: `${CDN}/2026/06/desi-05-s.jpg` },
      { name: "twitter:image", content: `${CDN}/2026/06/desi-05-s.jpg` },
    ],
  }),
  component: MenuPage,
});

type Line = { no: number; name: string; price: number; qty: number };

function MenuPage() {
  const [active, setActive] = useState(menu[0]!.slug);
  const [lines, setLines] = useState<Line[]>([]);
  const [quickNo, setQuickNo] = useState("");
  const [quickError, setQuickError] = useState<string | null>(null);
  const [orderType, setOrderType] = useState<"dine-in" | "takeaway">("dine-in");
  const [tableNumber, setTableNumber] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<number | null>(null);

  const submit = useServerFn(placeOrder);
  const category = menu.find((c) => c.slug === active) ?? menu[0]!;
  const total = useMemo(() => lines.reduce((s, l) => s + l.price * l.qty, 0), [lines]);

  function add(item: MenuItem) {
    setToken(null);
    setLines((prev) => {
      const found = prev.find((l) => l.no === item.no);
      if (found) return prev.map((l) => (l.no === item.no ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { no: item.no, name: item.name, price: item.price, qty: 1 }];
    });
  }

  function step(no: number, delta: number) {
    setLines((prev) =>
      prev
        .map((l) => (l.no === no ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    );
  }

  function quickAdd() {
    const parsed = Number(quickNo.trim());
    const item = Number.isFinite(parsed) ? findItemByNo(parsed) : undefined;
    if (!item) {
      setQuickError("No dish with that number.");
      return;
    }
    setQuickError(null);
    setQuickNo("");
    add(item);
  }

  const summaryText = useMemo(() => {
    const head = `*Spice Arena order*\n${orderType === "dine-in" ? `Table: ${tableNumber || "-"}` : "Takeaway"}`;
    const body = lines.map((l) => `#${l.no} ${l.name} x${l.qty} = Rs ${l.price * l.qty}`).join("\n");
    const tail = `Total: Rs ${total}${name ? `\nName: ${name}` : ""}${phone ? `\nPhone: ${phone}` : ""}${
      notes ? `\nNotes: ${notes}` : ""
    }${token ? `\nToken #${token}` : ""}`;
    return `${head}\n\n${body}\n\n${tail}`;
  }, [lines, orderType, tableNumber, name, phone, notes, total, token]);

  async function sendOrder() {
    if (lines.length === 0 || busy) return;
    setError(null);
    setBusy(true);
    try {
      const res = await submit({
        data: {
          items: lines,
          orderType,
          tableNumber: orderType === "dine-in" ? tableNumber || null : null,
          customerName: name || null,
          phone: phone || null,
          notes: notes || null,
        },
      });
      if (res.ok) {
        setToken(res.token);
      } else {
        setError(res.error);
      }
    } catch {
      setError("Could not send your order. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border">
        <img src={category.image} alt={category.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-deep/85" />
        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center">
          <p className="eyebrow">Order by Number</p>
          <h1 className="mt-5 text-4xl font-light md:text-6xl">Menu</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Every dish has its own number. Tap a number to add it, then send your order to the kitchen or on
            WhatsApp.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl gap-10 px-5 py-14 lg:grid lg:grid-cols-[1fr_22rem]">
        <div>
          {/* Category buttons */}
          <div className="flex flex-wrap gap-3">
            {menu.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setActive(c.slug)}
                className={
                  active === c.slug
                    ? "btn-brass"
                    : "btn-outline-brass"
                }
              >
                {c.title}
              </button>
            ))}
          </div>

          {/* Quick number entry */}
          <div className="mt-8 rounded-lg border border-border bg-card p-4">
            <p className="eyebrow">Know the number?</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <input
                value={quickNo}
                onChange={(e) => setQuickNo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    quickAdd();
                  }
                }}
                inputMode="numeric"
                placeholder="e.g. 202"
                className="w-32 rounded-full border border-input bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-brass"
              />
              <button type="button" onClick={quickAdd} className="btn-brass">
                Add to Order
              </button>
              {quickError && <span className="text-xs text-destructive">{quickError}</span>}
            </div>
          </div>

          {/* Items */}
          <div className="mt-8">
            <h2 className="text-3xl font-light">
              {category.title} <span className="text-brass">{category.titleUr}</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{category.blurb}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {category.items.map((item) => (
                <button key={item.no} type="button" onClick={() => add(item)} className="btn-number">
                  <span className="number-badge">{item.no}</span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="truncate text-base">{item.name}</span>
                      <span className="flex-none text-sm text-brass">Rs {item.price}</span>
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">{item.desc}</span>
                  </span>
                  <Plus className="h-4 w-4 flex-none text-brass" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Order panel */}
        <aside className="mt-12 h-fit rounded-lg border border-border bg-card p-5 lg:sticky lg:top-24 lg:mt-0">
          <p className="eyebrow">Your Order</p>

          <div className="mt-4 flex gap-2">
            {(["dine-in", "takeaway"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setOrderType(t)}
                className={`flex-1 rounded-full border px-3 py-2 text-xs tracking-widest uppercase transition-all duration-300 ${
                  orderType === t
                    ? "border-brass bg-brass text-primary-foreground"
                    : "border-border text-muted-foreground hover:-translate-y-0.5 hover:border-brass hover:text-brass"
                }`}
              >
                {t === "dine-in" ? "Dine-in" : "Takeaway"}
              </button>
            ))}
          </div>

          {orderType === "dine-in" && (
            <input
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Table number"
              className="mt-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-brass"
            />
          )}

          <div className="mt-5 space-y-3">
            {lines.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No items yet — tap a dish number to start.
              </p>
            )}
            {lines.map((l) => (
              <div key={l.no} className="flex items-center gap-3 border-b border-border/60 pb-3">
                <span className="text-xs text-brass">#{l.no}</span>
                <span className="min-w-0 flex-1 truncate text-sm">{l.name}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Decrease"
                    onClick={() => step(l.no, -1)}
                    className="rounded-full border border-border p-1 transition-colors hover:border-brass hover:text-brass"
                  >
                    {l.qty === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                  </button>
                  <span className="w-5 text-center text-sm">{l.qty}</span>
                  <button
                    type="button"
                    aria-label="Increase"
                    onClick={() => step(l.no, 1)}
                    className="rounded-full border border-border p-1 transition-colors hover:border-brass hover:text-brass"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <span className="w-20 text-right text-sm text-brass">Rs {l.price * l.qty}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
            <span className="text-xs tracking-widest uppercase">Total</span>
            <span className="font-display text-2xl text-brass">Rs {total}</span>
          </div>

          <div className="mt-4 space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-brass"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (optional)"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-brass"
            />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Less spicy, no onions…"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-brass"
            />
          </div>

          <button
            type="button"
            onClick={sendOrder}
            disabled={lines.length === 0 || busy}
            className="btn-brass mt-5 w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Send to Kitchen
          </button>

          <a
            href={waLink(summaryText)}
            target="_blank"
            rel="noreferrer"
            className={`mt-3 flex w-full items-center justify-center rounded-full bg-whatsapp px-4 py-3 text-xs font-semibold tracking-widest text-whatsapp-foreground uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-glow ${
              lines.length === 0 ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Send on WhatsApp
          </a>

          {error && <p className="mt-3 text-xs text-destructive">{error}</p>}

          {token !== null && (
            <div className="mt-5 rounded-lg border border-brass/60 bg-secondary p-4 text-center">
              <CheckCircle2 className="mx-auto h-6 w-6 text-brass" />
              <p className="eyebrow mt-3">Your Token</p>
              <p className="font-display text-4xl text-brass">#{token}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Order received. Please keep this token number. For help call {BUSINESS.phoneDisplay}.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
