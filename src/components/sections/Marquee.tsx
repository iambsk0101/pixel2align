const items = [
  "UI Design",
  "Web Design",
  "Conversion",
  "Branding",
  "Landing Pages",
  "Luxury",
  "Hospitality",
  "Ecommerce",
];

export function Marquee() {
  return (
    <section aria-hidden className="py-10 border-y border-border bg-surface/40 overflow-hidden">
      <div className="flex marquee-track whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="mx-10 inline-flex items-center gap-10 text-2xl md:text-4xl font-display font-medium text-muted-foreground">
            {t}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
