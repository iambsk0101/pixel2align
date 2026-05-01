import { Reveal } from "@/components/Reveal";

const items = [
  {
    quote:
      "Pixel2Align transformed our resort's online presence. Direct bookings are up 62% and the site finally feels as premium as the property.",
    name: "Aarav Mehta",
    role: "Founder, Anugraha Bhimtal",
  },
  {
    quote:
      "Rare to find a designer who balances aesthetics with conversion this well. Every section earns its place.",
    name: "Priya Shah",
    role: "Creative Director, SpaceionDesign",
  },
  {
    quote:
      "The landing page paid for itself within a week. Calm process, sharp output, zero drama.",
    name: "Rohit Khanna",
    role: "Growth Lead, View2Value",
  },
];

export function Testimonials() {
  return (
    <section className="py-28 md:py-36 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">✦ Kind Words</div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight max-w-3xl text-balance">
            Trusted by founders who care about the <span className="italic font-display text-accent">details.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="h-full p-8 rounded-3xl bg-background border border-border flex flex-col gap-6">
                <div className="text-accent text-3xl leading-none">&ldquo;</div>
                <blockquote className="text-base md:text-lg text-pretty">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto pt-6 border-t border-border">
                  <div className="font-display font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
