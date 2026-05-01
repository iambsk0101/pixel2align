const tabs = [
  { id: "hero", name: "hero.tsx", icon: "⚛" },
  { id: "about", name: "about.html", icon: "🟧" },
  { id: "projects", name: "projects.js", icon: "🟨" },
  { id: "skills", name: "skills.json", icon: "{}" },
  { id: "process", name: "process.ts", icon: "🟦" },
  { id: "testimonials", name: "testimonials.css", icon: "🟪" },
  { id: "contact", name: "contact.md", icon: "📄" },
];

export function EditorTabs({ active, onSelect }: { active: string; onSelect: (t: string) => void }) {
  return (
    <div className="sticky top-0 z-30 bg-titlebar border-b border-border flex overflow-x-auto scrollbar-hide">
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`group relative shrink-0 flex items-center gap-2 px-4 py-2.5 text-xs font-mono border-r border-border transition-colors ${
              isActive
                ? "bg-editor text-foreground"
                : "bg-titlebar text-muted-foreground hover:text-foreground hover:bg-editor/50"
            }`}
          >
            {isActive && <span className="absolute top-0 left-0 right-0 h-px bg-accent" />}
            <span>{t.icon}</span>
            <span>{t.name}</span>
            <span className="opacity-40 group-hover:opacity-100 ml-2">×</span>
          </button>
        );
      })}
    </div>
  );
}

export function Breadcrumb({ active }: { active: string }) {
  const map: Record<string, string> = {
    hero: "hero.tsx",
    about: "about.html",
    projects: "projects.js",
    skills: "skills.json",
    process: "process.ts",
    testimonials: "testimonials.css",
    contact: "contact.md",
  };
  return (
    <div className="px-6 md:px-10 py-2 text-xs font-mono text-muted-foreground border-b border-border bg-editor/60">
      pixel2align <span className="opacity-40">›</span> src <span className="opacity-40">›</span>{" "}
      <span className="text-foreground">{map[active] ?? "index.tsx"}</span>
    </div>
  );
}
