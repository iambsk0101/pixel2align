import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(40),
});

const SYSTEM = `You are "Pixel's Copilot" — the AI assistant for Pixel2Align, a premium Web & UI design studio.
You answer in a confident, concise, friendly tone. You can:
- Explain Pixel2Align services (Web Design, UI Design, Branding, Conversion strategy, CMS builds).
- Recommend the right project tier (Starter, Studio, Editorial).
- Help visitors describe their project brief.
- Suggest opening contact.md when the user is ready to start.
Never invent prices. Keep answers under 120 words. Use markdown lightly.`;

export const askCopilot = createServerFn({ method: "POST" })
  .inputValidator((input) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { reply: "Copilot is not configured.", error: true };
    }
    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [{ role: "system", content: SYSTEM }, ...data.messages],
        }),
      });
      if (res.status === 429) return { reply: "Rate limit. Try again in a moment.", error: true };
      if (res.status === 402) return { reply: "Copilot credits exhausted.", error: true };
      if (!res.ok) return { reply: `Copilot error (${res.status}).`, error: true };
      const json = await res.json();
      const reply = json?.choices?.[0]?.message?.content ?? "Sorry, I had no answer.";
      return { reply, error: false };
    } catch (e) {
      return { reply: "Network error contacting Copilot.", error: true };
    }
  });
