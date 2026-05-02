import { useEffect, useRef, useState } from "react";
import { useIde, FILES, FILE_ORDER, THEMES, type FileId } from "./IdeContext";
import { toast } from "sonner";

type MenuItem =
  | { type: "item"; label: string; shortcut?: string; onClick: () => void; disabled?: boolean }
  | { type: "sep" }
  | { type: "header"; label: string };

export function TitleBar() {
  const ide = useIde();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  const close = () => setOpenMenu(null);

  const fileItems: MenuItem[] = [
    { type: "item", label: "New Tab", shortcut: "Ctrl+T", onClick: () => {
      const idx = ide.activeTab ? FILE_ORDER.indexOf(ide.activeTab) : -1;
      const next = FILE_ORDER[(idx + 1) % FILE_ORDER.length];
      ide.openFile(next); close();
    }},
    { type: "item", label: "Open File…", shortcut: "Ctrl+P", onClick: () => { ide.openPalette(); close(); }},
    { type: "sep" },
    { type: "item", label: "Close Tab", shortcut: "Ctrl+W", onClick: () => { if (ide.activeTab) ide.closeTab(ide.activeTab); close(); }, disabled: !ide.activeTab },
    { type: "item", label: "Close All Tabs", onClick: () => { ide.closeAllTabs(); close(); }},
    { type: "sep" },
    { type: "header", label: "Open Recent" },
    ...ide.recents.slice(0, 5).map<MenuItem>((id) => ({
      type: "item",
      label: FILES[id].name,
      onClick: () => { ide.openFile(id); close(); },
    })),
    { type: "sep" },
    { type: "item", label: "Download Brief", onClick: () => { ide.openBrief(); close(); }},
  ];

  const editItems: MenuItem[] = [
    { type: "item", label: "Undo", shortcut: "Ctrl+Z", onClick: () => { toast("Nothing to undo"); close(); }},
    { type: "item", label: "Redo", shortcut: "Ctrl+Y", onClick: () => { toast("Nothing to redo"); close(); }},
    { type: "sep" },
    { type: "item", label: "Find in Page", shortcut: "Ctrl+F", onClick: () => { ide.openPalette(); close(); }},
  ];

  const viewItems: MenuItem[] = [
    { type: "item", label: ide.sidebarOpen ? "Hide Sidebar" : "Show Sidebar", shortcut: "Ctrl+B", onClick: () => { ide.toggleSidebar(); close(); }},
    { type: "item", label: ide.terminalOpen ? "Hide Terminal" : "Show Terminal", shortcut: "Ctrl+`", onClick: () => { ide.toggleTerminal(); close(); }},
    { type: "item", label: "Command Palette", shortcut: "Ctrl+P", onClick: () => { ide.openPalette(); close(); }},
    { type: "sep" },
    { type: "header", label: "Color Theme" },
    ...THEMES.map<MenuItem>((t) => ({
      type: "item",
      label: t.label,
      onClick: () => { ide.setTheme(t.id); close(); toast(`Theme: ${t.label}`); },
    })),
  ];

  const goItems: MenuItem[] = FILE_ORDER.map<MenuItem>((id) => ({
    type: "item",
    label: `Go to ${FILES[id].name}`,
    onClick: () => { ide.openFile(id); close(); },
  }));

  const runItems: MenuItem[] = [
    { type: "item", label: "▶ Start Project Inquiry", onClick: () => { ide.openFile("contact"); close(); }},
    { type: "item", label: "✓ Run Audit", onClick: () => { toast.success("Audit complete: 98 / 100"); close(); }},
    { type: "item", label: "📊 View Case Studies", onClick: () => { ide.openFile("projects"); close(); }},
  ];

  const terminalItems: MenuItem[] = [
    { type: "item", label: ide.terminalOpen ? "Hide Terminal" : "New Terminal", shortcut: "Ctrl+`", onClick: () => { ide.toggleTerminal(); close(); }},
    { type: "item", label: "Run Build", onClick: () => { toast("npm run build → ✓ compiled"); close(); }},
    { type: "item", label: "Clear", onClick: () => { toast("Terminal cleared"); close(); }},
  ];

  const helpItems: MenuItem[] = [
    { type: "item", label: "About Pixel2Align", onClick: () => { ide.openFile("about"); close(); }},
    { type: "item", label: "Keyboard Shortcuts", onClick: () => { ide.openSettings(); close(); }},
    { type: "item", label: "Contact Studio", onClick: () => { ide.openFile("contact"); close(); }},
  ];

  const menus: { label: string; items: MenuItem[] }[] = [
    { label: "File", items: fileItems },
    { label: "Edit", items: editItems },
    { label: "View", items: viewItems },
    { label: "Go", items: goItems },
    { label: "Run", items: runItems },
    { label: "Terminal", items: terminalItems },
    { label: "Help", items: helpItems },
  ];

  return (
    <div ref={ref} className="h-9 bg-titlebar border-b border-border flex items-center px-3 select-none text-xs font-mono text-muted-foreground relative z-50">
      <div className="flex items-center gap-2 mr-4">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>

      <div className="hidden md:flex">
        {menus.map((m) => (
          <div key={m.label} className="relative">
            <button
              onMouseDown={(e) => { e.preventDefault(); setOpenMenu(openMenu === m.label ? null : m.label); }}
              onMouseEnter={() => openMenu && setOpenMenu(m.label)}
              className={`px-3 h-9 flex items-center hover:bg-surface hover:text-foreground transition-colors ${
                openMenu === m.label ? "bg-surface text-foreground" : ""
              }`}
            >
              {m.label}
            </button>
            {openMenu === m.label && (
              <div className="absolute top-full left-0 min-w-[240px] bg-surface-elevated border border-border shadow-2xl py-1 text-[13px] text-foreground">
                {m.items.map((it, i) => {
                  if (it.type === "sep") return <div key={i} className="h-px bg-border my-1" />;
                  if (it.type === "header") return <div key={i} className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-wider text-muted-foreground">{it.label}</div>;
                  return (
                    <button
                      key={i}
                      onClick={it.onClick}
                      disabled={it.disabled}
                      className="w-full flex items-center justify-between gap-6 px-3 py-1.5 hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-foreground text-left"
                    >
                      <span>{it.label}</span>
                      {it.shortcut && <span className="text-[11px] opacity-70 font-mono">{it.shortcut}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
        <button
          onClick={() => toast("✦ Pixel's Copilot — coming soon")}
          className="px-3 h-9 flex items-center text-accent hover:bg-surface transition-colors"
        >
          ✦ Copilot
        </button>
      </div>

      <div className="flex-1 flex justify-center">
        <button
          onClick={ide.openPalette}
          className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-background/60 border border-border min-w-[280px] justify-center hover:border-accent transition-colors"
        >
          <span>🔍</span>
          <span>pixel2align : portfolio</span>
          <kbd className="ml-2 px-1.5 py-0.5 rounded bg-surface border border-border text-[10px]">Ctrl</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px]">P</kbd>
        </button>
      </div>
    </div>
  );
}
