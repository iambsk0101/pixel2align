import { EditorPane, Reveal } from "@/components/ide/EditorPane";

export function Hero() {
  return (
    <EditorPane id="hero" lines={28}>
      <div className="font-mono text-sm syntax-comment mb-6">
        // hello world !! welcome to the studio of —
      </div>

      <Reveal>
        <h1 className="font-display uppercase tracking-tight leading-[0.85] text-[clamp(3rem,12vw,9.5rem)]">
          Pixel<span className="text-accent">2</span>
          <br />
          <span className="text-accent">Align</span>
        </h1>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-8 flex flex-wrap gap-2">
          {["Web Designer", "UI Designer", "Conversion Strategist", "@ Studio · 2026"].map((b, i) => (
            <span
              key={b}
              className="font-mono text-xs px-3 py-2 rounded border border-border bg-surface/60"
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle"
                style={{
                  background:
                    ["#22c55e", "#06b6d4", "#a855f7", "var(--accent)"][i] ?? "var(--accent)",
                }}
              />
              {b}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={220}>
        <div className="mt-8 font-mono text-base">
          <span className="syntax-keyword">const </span>
          <span className="syntax-fn">mission</span>
          <span className="syntax-comment"> = </span>
          <span className="syntax-string">"Designing premium websites that convert"</span>
          <span className="caret" />
        </div>
      </Reveal>

      <Reveal delay={300}>
        <p className="mt-10 max-w-2xl text-lg md:text-xl text-muted-foreground text-pretty">
          I live at the crossroads of <span className="syntax-keyword font-mono">brand</span>,{" "}
          <span className="syntax-fn font-mono">interface</span> and{" "}
          <span className="syntax-string font-mono">conversion</span>. I build websites that look
          editorial and perform like product.
        </p>
      </Reveal>

      <Reveal delay={380}>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-md bg-accent text-accent-foreground font-mono text-sm font-semibold hover:translate-y-[-2px] transition-transform"
          >
            <span>📁</span> Projects
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-md border border-border bg-surface font-mono text-sm hover:border-accent transition-colors"
          >
            <span>👤</span> About Me
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-md border border-border bg-surface font-mono text-sm hover:border-accent transition-colors"
          >
            <span>✉</span> Contact
          </a>
        </div>
      </Reveal>

      <Reveal delay={500}>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 rounded-md border border-border overflow-hidden bg-surface/40">
          {[
            ["6+", "Years"],
            ["40+", "Projects"],
            ["100%", "Retention"],
            ["↑", "Always shipping"],
          ].map(([k, v], i) => (
            <div
              key={v}
              className={`p-6 md:p-8 text-center ${i < 3 ? "border-r border-border" : ""} ${
                i < 2 ? "border-b border-border md:border-b-0" : ""
              }`}
            >
              <div className="font-display text-4xl md:text-5xl">{k}</div>
              <div className="mt-2 text-[11px] tracking-[0.25em] uppercase font-mono text-muted-foreground">
                {v}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={600}>
        <div className="mt-10 flex flex-wrap gap-2 font-mono text-xs">
          {["GitHub", "LinkedIn", "Dribbble", "Behance", "Instagram", "Email"].map((s) => (
            <a
              key={s}
              href="#contact"
              className="px-4 py-2 rounded border border-border bg-surface/60 hover:border-accent hover:text-accent transition-colors"
            >
              ▸ {s}
            </a>
          ))}
        </div>
      </Reveal>
    </EditorPane>
  );
}
