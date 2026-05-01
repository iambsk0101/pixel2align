import { useState } from "react";

const files = [
  { name: "hero.tsx", icon: "⚛", target: "hero" },
  { name: "about.html", icon: "🟧", target: "about" },
  { name: "projects.js", icon: "🟨", target: "projects" },
  { name: "skills.json", icon: "{ }", target: "skills" },
  { name: "process.ts", icon: "🟦", target: "process" },
  { name: "testimonials.css", icon: "🟪", target: "testimonials" },
  { name: "contact.md", icon: "📄", target: "contact" },
  { name: "Pixel2Align_Brief.pdf", icon: "📕", target: "contact" },
];

export function Sidebar({ active, onSelect }: { active: string; onSelect: (t: string) => void }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className="hidden md:flex bg-sidebar border-r border-border">
      <div className="w-12 border-r border-border flex flex-col items-center py-3 gap-4 text-muted-foreground">
        {["📁", "🔍", "⎇", "▶", "⚙", "✦"].map((i, idx) => (
          <button
            key={idx}
            onClick={() => setCollapsed((v) => !v)}
            className={`w-8 h-8 grid place-items-center rounded hover:text-foreground hover:bg-surface ${idx === 0 ? "text-accent border-l-2 border-accent" : ""}`}
          >
            <span className="text-base">{i}</span>
          </button>
        ))}
      </div>

      {!collapsed && (
        <div className="w-60 lg:w-64 py-3">
          <div className="px-4 text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
            Portfolio
          </div>
          <ul className="text-sm font-mono">
            {files.map((f) => (
              <li key={f.name}>
                <button
                  onClick={() => onSelect(f.target)}
                  className={`w-full flex items-center gap-2 px-4 py-1.5 text-left hover:bg-surface/60 transition-colors ${
                    active === f.target ? "bg-surface text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span className="text-xs w-4 text-center">{f.icon}</span>
                  <span className="truncate">{f.name}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 px-4">
            <div className="rounded-md border border-border bg-surface/60 p-3">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-accent">✦</span>
                <span>Pixel's Copilot</span>
                <span className="ml-auto text-[10px] text-muted-foreground">AI</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
