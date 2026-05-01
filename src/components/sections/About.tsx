import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              ✦ About
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <Reveal delay={80}>
            <h2 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-balance">
              I'm a designer obsessed with the space between
              <span className="text-accent"> beauty</span> and
              <span className="italic font-display"> business outcomes.</span>
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl text-pretty">
              For over 6 years I've partnered with luxury hospitality brands,
              boutique studios, and ambitious founders to design websites that
              don't just look premium — they perform. Clean UI, intentional
              typography, and a relentless focus on conversion.
            </p>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {[
              ["Clean UI", "Restraint over decoration. Every pixel earns its place."],
              ["Luxury Feel", "Editorial layouts, refined motion, premium materials."],
              ["Conversion First", "Designs informed by behaviour, not assumptions."],
            ].map(([title, body], i) => (
              <Reveal key={title} delay={240 + i * 80}>
                <div className="p-6 rounded-2xl bg-surface border border-border h-full">
                  <div className="text-sm font-display font-semibold">{title}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
