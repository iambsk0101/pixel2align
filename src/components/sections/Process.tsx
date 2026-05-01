import { Reveal } from "@/components/Reveal";

const steps = [
  { k: "01", title: "Discovery", body: "We dig into your brand, audience and goals to define what success looks like." },
  { k: "02", title: "Design", body: "Wireframes evolve into editorial, brand-aligned UI ready for the real world." },
  { k: "03", title: "Development", body: "Pixel-perfect handoff or build, with motion and performance baked in." },
  { k: "04", title: "Launch", body: "We ship, measure, iterate — turning the launch into the start, not the finish." },
];

export function Process() {
  return (
    <section id="process" className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">✦ Process</div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight max-w-3xl text-balance">
            A calm, deliberate way to ship <span className="italic font-display text-accent">premium work.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.k} delay={i * 100}>
              <div className="relative h-full p-7 rounded-3xl bg-surface border border-border hover:border-accent/60 transition-colors">
                <div className="font-mono text-xs text-muted-foreground">{s.k}</div>
                <div className="mt-6 font-display text-2xl font-semibold">{s.title}</div>
                <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
                <div className="absolute top-7 right-7 h-2 w-2 rounded-full bg-accent" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
