export function Footer() {
  return (
    <footer className="bg-titlebar border-t border-border">
      <div className="px-6 md:px-10 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="font-display uppercase text-3xl">
            Pixel<span className="text-accent">2</span>Align
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Premium web & UI design for brands that refuse to look ordinary.
          </p>
        </div>
        <div className="font-mono text-sm">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Sitemap</div>
          <ul className="space-y-1.5">
            {[["Hero", "#hero"], ["About", "#about"], ["Projects", "#projects"], ["Process", "#process"], ["Contact", "#contact"]].map(([l, h]) => (
              <li key={l}><a href={h} className="hover:text-accent transition-colors">▸ {l}</a></li>
            ))}
          </ul>
        </div>
        <div className="font-mono text-sm">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Elsewhere</div>
          <ul className="space-y-1.5">
            {["Dribbble", "Behance", "LinkedIn", "Instagram", "Email"].map((l) => (
              <li key={l}><a href="#contact" className="hover:text-accent transition-colors">▸ {l}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-6 md:px-10 py-4 flex justify-between text-xs font-mono text-muted-foreground">
        <span>© {new Date().getFullYear()} Pixel2Align. All rights reserved.</span>
        <span>Built with restraint.</span>
      </div>
    </footer>
  );
}
