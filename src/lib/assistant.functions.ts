import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { menu, BUSINESS } from "@/data/menu";

const schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000),
      }),
    )
    .min(1)
    .max(24),
  lang: z.enum(["en", "ur"]),
});

function menuText() {
  return menu
    .map(
      (c) =>
        `${c.title} (${c.titleUr}):\n` +
        c.items.map((i) => `  #${i.no} ${i.name} / ${i.nameUr} — Rs ${i.price}`).join("\n"),
    )
    .join("\n\n");
}

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      return { ok: false as const, error: "The assistant is not configured yet." };
    }

    const system = [
      `You are the ${BUSINESS.name} host — a warm, concise restaurant assistant for a fine-dining restaurant in Lahore, Pakistan.`,
      `Reply in ${data.lang === "ur" ? "Urdu (Urdu script)" : "English"}. If the guest writes in the other language, mirror the language they used.`,
      `Keep answers under 90 words. Never invent dishes or prices outside the menu below.`,
      `Guests order by dish number on the Menu page — mention the number (e.g. #202) when recommending a dish.`,
      `Location: ${BUSINESS.address}. Timings: ${BUSINESS.hours} daily. Reservations & WhatsApp: ${BUSINESS.phoneDisplay}.`,
      `MENU:\n${menuText()}`,
    ].join("\n\n");

    const input = [
      { role: "system", content: system },
      ...data.messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-6-astra",
          input,
          reasoning: { effort: "low" },
          max_output_tokens: 700,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error(`AI gateway error [${res.status}]: ${body}`);
        if (res.status === 429) {
          return { ok: false as const, error: "Too many messages right now. Please try again in a moment." };
        }
        if (res.status === 402) {
          return { ok: false as const, error: "The assistant is temporarily unavailable. Please call us instead." };
        }
        return { ok: false as const, error: "The assistant could not answer just now." };
      }

      const payload = (await res.json()) as {
        output_text?: string;
        output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
      };

      const text =
        payload.output_text?.trim() ||
        payload.output
          ?.flatMap((o) => o.content ?? [])
          .filter((c) => c.type === "output_text" && c.text)
          .map((c) => c.text as string)
          .join("")
          .trim();

      if (!text) {
        return { ok: false as const, error: "The assistant could not answer just now." };
      }

      return { ok: true as const, reply: text };
    } catch (err) {
      console.error("askAssistant failed", err);
      return { ok: false as const, error: "Network problem reaching the assistant." };
    }
  });
