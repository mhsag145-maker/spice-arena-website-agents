import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, RefreshCw } from "lucide-react";
import { listOrders, updateOrderStatus } from "@/lib/orders.functions";

export const Route = createFileRoute("/kitchen")({
  head: () => ({
    meta: [
      { title: "Staff Order Screen — Spice Arena" },
      { name: "description", content: "Staff-only screen listing incoming Spice Arena orders by token number." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Staff Order Screen — Spice Arena" },
      { property: "og:description", content: "Staff-only screen listing incoming Spice Arena orders by token number." },
    ],
  }),
  component: KitchenPage,
});

type Line = { no: number; name: string; price: number; qty: number };
type Order = {
  id: string;
  token_number: number;
  table_number: string | null;
  customer_name: string | null;
  phone: string | null;
  order_type: string;
  items: unknown;
  total: number | string;
  notes: string | null;
  status: string;
  created_at: string;
};

const STATUSES = ["new", "preparing", "served"] as const;

function KitchenPage() {
  const [pin, setPin] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useServerFn(listOrders);
  const setStatus = useServerFn(updateOrderStatus);

  async function refresh(currentPin = pin) {
    if (!currentPin) return;
    setBusy(true);
    setError(null);
    try {
      const res = await load({ data: { pin: currentPin } });
      if (res.ok) setOrders(res.orders as Order[]);
      else setError(res.error);
    } catch {
      setError("Could not load orders.");
    } finally {
      setBusy(false);
    }
  }

  async function changeStatus(id: string, status: (typeof STATUSES)[number]) {
    const res = await setStatus({ data: { pin, id, status } });
    if (res.ok) {
      setOrders((prev) => prev?.map((o) => (o.id === id ? { ...o, status } : o)) ?? prev);
    } else {
      setError(res.error);
    }
  }

  if (orders === null) {
    return (
      <div className="mx-auto max-w-md px-5 py-24">
        <p className="eyebrow">Staff Only</p>
        <h1 className="mt-4 text-3xl font-light">Order Screen</h1>
        <p className="mt-3 text-sm text-muted-foreground">Enter the staff PIN to see incoming orders.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void refresh();
          }}
          className="mt-6 flex gap-3"
        >
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Staff PIN"
            className="flex-1 rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-brass"
          />
          <button type="submit" className="btn-brass" disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Open
          </button>
        </form>
        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Live Orders</p>
          <h1 className="mt-3 text-3xl font-light">Kitchen Screen</h1>
        </div>
        <button type="button" onClick={() => void refresh()} className="btn-outline-brass" disabled={busy}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Refresh
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      {orders.length === 0 && <p className="mt-10 text-sm text-muted-foreground">No orders yet.</p>}

      <div className="mt-8 space-y-4">
        {orders.map((o) => {
          const lines = Array.isArray(o.items) ? (o.items as Line[]) : [];
          return (
            <article key={o.id} className="rounded-lg border border-border bg-card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <span className="font-display text-3xl text-brass">#{o.token_number}</span>
                  <span className="ml-3 text-xs tracking-widest text-muted-foreground uppercase">
                    {o.order_type === "dine-in" ? `Table ${o.table_number || "-"}` : "Takeaway"}
                  </span>
                </div>
                <div className="flex gap-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void changeStatus(o.id, s)}
                      className={`rounded-full border px-3 py-1.5 text-xs tracking-widest uppercase transition-all duration-300 ${
                        o.status === s
                          ? "border-brass bg-brass text-primary-foreground"
                          : "border-border text-muted-foreground hover:-translate-y-0.5 hover:border-brass hover:text-brass"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <ul className="mt-4 space-y-1 text-sm">
                {lines.map((l) => (
                  <li key={l.no} className="flex justify-between gap-3">
                    <span>
                      <span className="text-brass">#{l.no}</span> {l.name} × {l.qty}
                    </span>
                    <span className="text-muted-foreground">Rs {l.price * l.qty}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
                <span>Total: Rs {Number(o.total)}</span>
                {o.customer_name && <span>Name: {o.customer_name}</span>}
                {o.phone && <span>Phone: {o.phone}</span>}
                <span>{new Date(o.created_at).toLocaleString()}</span>
              </div>
              {o.notes && <p className="mt-2 text-xs text-brass-soft">Note: {o.notes}</p>}
            </article>
          );
        })}
      </div>
    </div>
  );
}
