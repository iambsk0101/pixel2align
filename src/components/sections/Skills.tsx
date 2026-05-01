import { Reveal } from "@/components/Reveal";

const skills = [
  "UI / UX Design",
  "Website Design",
  "Landing Page Design",
  "Conversion Optimization",
  "Branding & Visual Identity",
];

export function Skills() {
  return (
    <section id="skills" className="py-28 md:py-36 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.25em] text-background/60">✦ Capabilities</div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-balance max-w-3xl">
            What I do — done <span className="italic text-accent">exceptionally well.</span>
          </h2>
        </Reveal>

        <ul className="mt-16 divide-y divide-background/15 border-y border-background/15">
          {skills.map((s, i) => (
            <Reveal as="li" key={s} delay={i * 60}>
              <div className="group flex items-center justify-between py-7 md:py-9 cursor-default">
                <div className="flex items-center gap-6">
                  <span className="font-mono text-sm text-background/50">0{i + 1}</span>
                  <span className="font-display text-2xl md:text-4xl font-medium transition-colors group-hover:text-accent">
                    {s}
                  </span>
                </div>
                <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-accent text-2xl">
                  →
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
