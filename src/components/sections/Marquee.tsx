const items = [
  "Web Design", "UI / UX", "Brand Identity", "Conversion", "Webflow", "Framer", "Shopify", "Design Systems", "Editorial",
];

export function Marquee() {
  return (
    <div className="border-y border-border bg-titlebar overflow-hidden">
      <div className="flex marquee-track whitespace-nowrap py-5 font-display uppercase text-3xl md:text-5xl">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="px-8 flex items-center gap-8">
            {t}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
