import { EditorPane, Reveal } from "@/components/ide/EditorPane";

const steps = [
  { k: "01", name: "Discover", body: "Positioning workshop, competitive audit, and a sharp brief everyone signs off on." },
  { k: "02", name: "Design", body: "Custom type system, layout grid, and high-fidelity prototypes ready for usability checks." },
  { k: "03", name: "Build", body: "Pixel-precise build in Webflow, Framer, or your stack — performant, accessible, SEO-ready." },
  { k: "04", name: "Convert", body: "Launch, instrument, A/B test. Design that keeps earning months after handoff." },
];

export function Process() {
  return (
    <EditorPane id="process" lines={32}>
      <div className="font-mono text-sm syntax-comment">// process.ts — how we ship</div>

      <Reveal>
        <h2 className="mt-6 font-display uppercase leading-[0.9] text-[clamp(2.2rem,7vw,5rem)]">
          A four-step <span className="text-accent">function.</span>
        </h2>
      </Reveal>

      <div className="mt-12 space-y-px">
        {steps.map((s, i) => (
          <Reveal key={s.k} delay={i * 80}>
            <div className="group grid grid-cols-12 gap-4 items-start py-8 border-t border-border last:border-b">
              <div className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">
                {s.k}
              </div>
              <div className="col-span-10 md:col-span-3">
                <h3 className="font-display uppercase text-2xl md:text-4xl group-hover:text-accent transition-colors">
                  {s.name}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-7 md:col-start-6 text-muted-foreground text-lg text-pretty">
                {s.body}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </EditorPane>
  );
}
