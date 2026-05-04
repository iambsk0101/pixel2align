import { useIde } from "@/components/ide/IdeContext";
import { Sparkles } from "lucide-react";

export function Footer() {
  const ide = useIde();
  const links: [string, () => void][] = [
    ["Hero", () => ide.openFile("hero")],
    ["About", () => ide.openFile("about")],
    ["Projects", () => ide.openFile("projects")],
    ["Process", () => ide.openFile("process")],
    ["Contact", () => ide.openFile("contact")],
  ];
  const elsewhere: [string, string][] = [
    ["Dribbble", "https://dribbble.com"],
    ["Behance", "https://behance.net"],
    ["LinkedIn", "https://linkedin.com"],
    ["Instagram", "https://instagram.com"],
    ["Email", "mailto:hello@pixel2align.com"],
  ];
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
          <button
            onClick={ide.openCopilot}
            className="mt-5 inline-flex items-center gap-2 px-3 py-2 rounded border border-border hover:border-accent text-xs font-mono"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" /> Ask Pixel's Copilot
          </button>
        </div>
        <div className="font-mono text-sm">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Sitemap</div>
          <ul className="space-y-1.5">
            {links.map(([l, fn]) => (
              <li key={l}>
                <button onClick={fn} className="hover:text-accent transition-colors">▸ {l}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="font-mono text-sm">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Elsewhere</div>
          <ul className="space-y-1.5">
            {elsewhere.map(([l, u]) => (
              <li key={l}>
                <a href={u} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">▸ {l}</a>
              </li>
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
