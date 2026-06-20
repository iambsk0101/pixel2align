import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  url: z.string().url().max(500),
});

const SYSTEM = `You are "Pixel's Critic" — a senior brand & UX designer at Pixel2Align studio.
You audit a website honestly, like a friend who happens to design Awwwards-grade sites.
Tone: confident, sharp, a tiny bit cheeky — never mean. No corporate fluff.

Return STRICT MARKDOWN in EXACTLY this structure (use the same headings, do not skip):

### 🎯 First impression
2-3 sentences. What does this site *feel* like in the first 3 seconds?

### 🔥 What's hurting it
- 4 bullets, each ONE specific issue (typography, hierarchy, CTA clarity, performance hint, trust signal, etc.)
- Be concrete. Reference what you saw.

### ✨ What's already working
- 2-3 honest wins. Don't make them up.

### 🛠️ How Pixel2Align would fix it
- 3-4 bullets, each ONE actionable move. Mention real tactics: editorial typography, conversion-led hero, social proof above the fold, motion hierarchy, custom grid, etc.

### 📈 Expected lift
One line. Realistic outcome (e.g. "cleaner hierarchy + clearer CTA usually lifts inquiries 20-40%").

### 👉 Ready to upgrade?
Single CTA line. Invite them to open contact.md or book a brief. Mention Pixel2Align by name once.

Total response under 280 words. No preamble. Start directly with the first heading.`;

function stripTags(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMeta(html: string) {
  const pick = (re: RegExp) => html.match(re)?.[1]?.trim() ?? "";
  const title = pick(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = pick(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const ogTitle = pick(/<meta[^>]+property=["']og:title["'][^>]*content=["']([^"']*)["']/i);
  const ogImage = pick(/<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']*)["']/i);
  const viewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  const canonical = /<link[^>]+rel=["']canonical["']/i.test(html);
  const h1 = Array.from(html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)).map((m) => stripTags(m[1])).slice(0, 3);
  const h2 = Array.from(html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)).map((m) => stripTags(m[1])).slice(0, 6);
  const imgs = Array.from(html.matchAll(/<img\b[^>]*>/gi));
  const imgsTotal = imgs.length;
  const imgsAlt = imgs.filter((m) => /alt=["'][^"']+["']/i.test(m[0])).length;
  const links = (html.match(/<a\b/gi) || []).length;
  const buttons = (html.match(/<button\b/gi) || []).length;
  const scripts = (html.match(/<script\b/gi) || []).length;
  const inlineStyle = (html.match(/style=/gi) || []).length;
  return { title, description, ogTitle, ogImage, viewport, canonical, h1, h2, imgsTotal, imgsAlt, links, buttons, scripts, inlineStyle };
}

export const critiqueSite = createServerFn({ method: "POST" })
  .inputValidator((input) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) return { reply: "Critique is not configured.", error: true };

    let url = data.url.trim();
    if (!/^https?:\/\//i.test(url)) url = `https://${url}`;

    let html = "";
    let fetchError = "";
    try {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 9000);
      const res = await fetch(url, {
        signal: ctl.signal,
        redirect: "follow",
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; Pixel2AlignBot/1.0; +https://pixel2align.lovable.app)",
          Accept: "text/html,application/xhtml+xml",
        },
      });
      clearTimeout(timer);
      if (!res.ok) fetchError = `Site returned ${res.status}`;
      else html = (await res.text()).slice(0, 250_000);
    } catch (e) {
      fetchError = "Couldn't reach that URL. Make sure it's public and live.";
    }
    if (fetchError) return { reply: `**Couldn't audit this site.**\n\n${fetchError}`, error: true };

    const meta = extractMeta(html);
    const visible = stripTags(html).slice(0, 4000);

    const summary = `URL: ${url}
TITLE: ${meta.title || "(missing)"} (${meta.title.length} chars)
META DESCRIPTION: ${meta.description || "(missing)"} (${meta.description.length} chars)
OG TITLE: ${meta.ogTitle || "(missing)"}
OG IMAGE: ${meta.ogImage ? "present" : "missing"}
VIEWPORT META: ${meta.viewport ? "yes" : "NO (mobile broken)"}
CANONICAL: ${meta.canonical ? "yes" : "no"}
H1 TAGS (${meta.h1.length}): ${meta.h1.join(" | ") || "(none)"}
H2 TAGS (${meta.h2.length}): ${meta.h2.slice(0, 5).join(" | ") || "(none)"}
IMAGES: ${meta.imgsTotal} total, ${meta.imgsAlt} with alt text (${meta.imgsTotal ? Math.round((meta.imgsAlt / meta.imgsTotal) * 100) : 0}% accessible)
LINKS: ${meta.links} · BUTTONS: ${meta.buttons} · SCRIPTS: ${meta.scripts} · INLINE STYLES: ${meta.inlineStyle}

FIRST 4000 CHARS OF VISIBLE CONTENT:
${visible}`;

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: SYSTEM },
            { role: "user", content: `Audit this website and follow the exact markdown structure I gave you.\n\n${summary}` },
          ],
        }),
      });
      if (res.status === 429) return { reply: "Rate limit hit. Try again in a moment.", error: true };
      if (res.status === 402) return { reply: "Critique credits exhausted.", error: true };
      if (!res.ok) return { reply: `Critique error (${res.status}).`, error: true };
      const json = await res.json();
      const reply = json?.choices?.[0]?.message?.content ?? "Sorry, no critique generated.";
      return { reply, error: false, meta };
    } catch {
      return { reply: "Network error contacting the critic.", error: true };
    }
  });
