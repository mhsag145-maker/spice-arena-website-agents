import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { askAssistant } from "@/lib/assistant.functions";

type Msg = { role: "user" | "assistant"; content: string };
type Lang = "en" | "ur";

const GREETING: Record<Lang, string> = {
  en: "Assalam-o-Alaikum! I'm the Spice Arena host. Ask me about dishes, prices, timings or ordering by number.",
  ur: "السلام علیکم! میں اسپائس ارینا کا میزبان ہوں۔ کھانے، قیمت، اوقات یا نمبر سے آرڈر کے بارے میں پوچھیں۔",
};

const PROMPTS: Record<Lang, string[]> = {
  en: ["Today's specials?", "What are your timings?", "Suggest a family dinner"],
  ur: ["آج کی خاص ڈش؟", "اوقات کیا ہیں؟", "فیملی ڈنر تجویز کریں"],
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ask = useServerFn(askAssistant);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setError(null);
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await ask({ data: { messages: next.slice(-12), lang } });
      if (res.ok) {
        setMessages([...next, { role: "assistant", content: res.reply }]);
      } else {
        setError(res.error);
      }
    } catch {
      setError(lang === "ur" ? "معاف کیجیے، رابطہ نہیں ہو سکا۔" : "Sorry, could not reach the assistant.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat assistant"
        className="fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-full bg-brass px-4 py-3 text-primary-foreground shadow-plate transition-all duration-300 hover:-translate-y-1 hover:px-5 hover:shadow-glow"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        <span className="hidden text-xs font-semibold tracking-widest uppercase sm:inline">
          {open ? "Close" : "Ask Us"}
        </span>
      </button>

      {open && (
        <div className="fixed right-4 bottom-24 z-50 flex h-[30rem] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-plate">
          <div className="flex items-center justify-between border-b border-border bg-deep px-4 py-3">
            <div>
              <p className="font-display text-lg leading-none text-brass">Spice Arena Host</p>
              <p className="mt-1 text-[0.65rem] tracking-widest text-muted-foreground uppercase">
                English · اردو
              </p>
            </div>
            <div className="flex gap-1 rounded-full border border-border p-1">
              {(["en", "ur"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`rounded-full px-3 py-1 text-xs transition-colors ${
                    lang === l
                      ? "bg-brass text-primary-foreground"
                      : "text-muted-foreground hover:text-brass"
                  }`}
                >
                  {l === "en" ? "EN" : "اردو"}
                </button>
              ))}
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <Bubble role="assistant" lang={lang} text={GREETING[lang]} />
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} lang={lang} text={m.content} />
            ))}
            {busy && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                {lang === "ur" ? "لکھ رہا ہے…" : "Typing…"}
              </div>
            )}
            {error && <p className="text-xs text-destructive">{error}</p>}
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {PROMPTS[lang].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => send(p)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brass hover:text-brass"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="flex items-center gap-2 border-t border-border px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              dir={lang === "ur" ? "rtl" : "ltr"}
              placeholder={lang === "ur" ? "اپنا سوال لکھیں…" : "Type your question…"}
              className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brass"
            />
            <button
              type="submit"
              disabled={busy}
              aria-label="Send"
              className="rounded-full bg-brass p-2.5 text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function Bubble({ role, text, lang }: { role: "user" | "assistant"; text: string; lang: Lang }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <p
        dir={lang === "ur" ? "rtl" : "ltr"}
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser ? "bg-brass text-primary-foreground" : "bg-secondary text-foreground"
        }`}
      >
        {text}
      </p>
    </div>
  );
}
