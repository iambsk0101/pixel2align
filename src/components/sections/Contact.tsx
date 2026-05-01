import { useState } from "react";
import { EditorPane, Reveal } from "@/components/ide/EditorPane";
import { toast } from "sonner";

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent. I'll reply within 24h.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <EditorPane id="contact" lines={30}>
      <div className="font-mono text-sm syntax-comment"># contact.md</div>

      <Reveal>
        <h2 className="mt-6 font-display uppercase leading-[0.85] text-[clamp(2.6rem,10vw,8rem)]">
          Let's <span className="text-accent italic">align.</span>
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Booking 2026 projects. Tell me about the brand, the goal, and the timeline — I'll reply
          within 24 hours.
        </p>
      </Reveal>

      <div className="mt-12 grid lg:grid-cols-12 gap-10">
        <Reveal delay={160} className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            className="rounded-md border border-border bg-surface p-6 md:p-8 space-y-5"
          >
            {[
              { id: "name", label: "name", type: "text", placeholder: "Jane Cooper" },
              { id: "email", label: "email", type: "email", placeholder: "jane@brand.com" },
              { id: "company", label: "company", type: "text", placeholder: "Brand or studio" },
            ].map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id} className="block text-xs font-mono text-muted-foreground mb-2">
                  <span className="syntax-keyword">const </span>
                  <span className="syntax-fn">{f.label}</span>
                  <span className="syntax-comment"> = </span>
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  required
                  placeholder={f.placeholder}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            ))}
            <div>
              <label htmlFor="brief" className="block text-xs font-mono text-muted-foreground mb-2">
                <span className="syntax-keyword">const </span>
                <span className="syntax-fn">brief</span>
                <span className="syntax-comment"> = </span>
              </label>
              <textarea
                id="brief"
                required
                rows={5}
                placeholder="A few lines about the project, audience, and timeline."
                className="w-full bg-background border border-border rounded-md px-4 py-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-md bg-accent text-accent-foreground font-mono text-sm font-semibold hover:translate-y-[-2px] transition-transform disabled:opacity-60"
            >
              {sending ? "Sending..." : "▶ Run send()"}
            </button>
          </form>
        </Reveal>

        <Reveal delay={220} className="lg:col-span-5">
          <div className="space-y-4">
            <div className="rounded-md border border-border bg-surface p-6 font-mono text-sm">
              <div className="syntax-comment">// direct</div>
              <a href="mailto:hello@pixel2align.com" className="block mt-3 text-lg hover:text-accent transition-colors break-all">
                hello@pixel2align.com
              </a>
            </div>
            <div className="rounded-md border border-border bg-surface p-6 font-mono text-sm">
              <div className="syntax-comment">// availability</div>
              <div className="mt-3 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
                <span>Booking 2 projects · Q2 2026</span>
              </div>
            </div>
            <div className="rounded-md border border-border bg-surface p-6 font-mono text-sm">
              <div className="syntax-comment">// elsewhere</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Dribbble", "Behance", "LinkedIn", "Instagram"].map((s) => (
                  <a key={s} href="#" className="px-3 py-1.5 rounded border border-border hover:border-accent hover:text-accent transition-colors">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </EditorPane>
  );
}
