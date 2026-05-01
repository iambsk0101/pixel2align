import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { toast } from "sonner";

export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    toast.success("Thanks — I'll be in touch within 24 hours.");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <section id="contact" className="py-28 md:py-40 relative overflow-hidden">
      <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[40rem] rounded-full bg-accent/15 blur-3xl -z-10" />
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">✦ Contact</div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight text-balance">
            Let's build something <span className="italic font-display text-accent">premium.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Tell me about your brand and what you're trying to ship. I respond
            within 24 hours.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <form
            onSubmit={onSubmit}
            className="mt-12 grid md:grid-cols-2 gap-4 text-left"
          >
            <input
              required
              name="name"
              placeholder="Your name"
              className="px-5 py-4 rounded-2xl bg-surface border border-border focus:border-accent focus:outline-none transition-colors"
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              className="px-5 py-4 rounded-2xl bg-surface border border-border focus:border-accent focus:outline-none transition-colors"
            />
            <input
              name="company"
              placeholder="Company / Project"
              className="md:col-span-2 px-5 py-4 rounded-2xl bg-surface border border-border focus:border-accent focus:outline-none transition-colors"
            />
            <textarea
              required
              name="message"
              placeholder="Tell me about your project…"
              rows={5}
              className="md:col-span-2 px-5 py-4 rounded-2xl bg-surface border border-border focus:border-accent focus:outline-none transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={sent}
              className="md:col-span-2 mt-2 inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-foreground text-background font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 disabled:opacity-60"
            >
              {sent ? "Sent ✓" : "Send message →"}
            </button>
          </form>
        </Reveal>

        <div className="mt-12 text-sm text-muted-foreground">
          or email{" "}
          <a className="story-link text-foreground" href="mailto:hello@pixel2align.com">
            hello@pixel2align.com
          </a>
        </div>
      </div>
    </section>
  );
}
