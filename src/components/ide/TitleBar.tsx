import { useEffect, useRef, useState } from "react";
import { useIde, FILES, FILE_ORDER, THEMES } from "./IdeContext";
import { useSound } from "./SoundContext";
import { toast } from "sonner";
import {
  Menu,
  Search,
  Sparkles,
  FilePlus2,
  FolderOpen,
  X,
  Undo2,
  Redo2,
  EyeOff,
  Eye,
  TerminalSquare,
  Command,
  Palette,
  PlayCircle,
  CheckCircle2,
  BarChart3,
  Mail,
  Info,
  Keyboard,
  Volume2,
  VolumeX,
  Check,
} from "lucide-react";
import { Logo } from "@/components/Logo";

type MenuItem =
  | { type: "item"; label: string; shortcut?: string; onClick: () => void; disabled?: boolean; icon?: React.ReactNode }
  | { type: "sep" }
  | { type: "header"; label: string };

export function TitleBar() {
  const ide = useIde();
  const sound = useSound();
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
    { type: "item", icon: <FilePlus2 className="h-3.5 w-3.5" />, label: "New Tab", shortcut: "Ctrl+T", onClick: () => {
      const idx = ide.activeTab ? FILE_ORDER.indexOf(ide.activeTab) : -1;
      const next = FILE_ORDER[(idx + 1) % FILE_ORDER.length];
      ide.openFile(next); close();
    }},
    { type: "item", icon: <FolderOpen className="h-3.5 w-3.5" />, label: "Open File…", shortcut: "Ctrl+P", onClick: () => { ide.openPalette(); close(); }},
    { type: "sep" },
    { type: "item", icon: <X className="h-3.5 w-3.5" />, label: "Close Tab", shortcut: "Ctrl+W", onClick: () => { if (ide.activeTab) ide.closeTab(ide.activeTab); close(); }, disabled: !ide.activeTab },
    { type: "item", icon: <X className="h-3.5 w-3.5" />, label: "Close All Tabs", onClick: () => { ide.closeAllTabs(); close(); }},
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
    { type: "item", icon: <Undo2 className="h-3.5 w-3.5" />, label: "Undo", shortcut: "Ctrl+Z", onClick: () => { toast("Nothing to undo"); close(); }},
    { type: "item", icon: <Redo2 className="h-3.5 w-3.5" />, label: "Redo", shortcut: "Ctrl+Y", onClick: () => { toast("Nothing to redo"); close(); }},
    { type: "sep" },
    { type: "item", icon: <Search className="h-3.5 w-3.5" />, label: "Find in Page", shortcut: "Ctrl+F", onClick: () => { ide.openPalette(); close(); }},
  ];

  const viewItems: MenuItem[] = [
    { type: "item", icon: ide.sidebarOpen ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />, label: ide.sidebarOpen ? "Hide Sidebar" : "Show Sidebar", shortcut: "Ctrl+B", onClick: () => { ide.toggleSidebar(); close(); }},
    { type: "item", icon: <TerminalSquare className="h-3.5 w-3.5" />, label: ide.terminalOpen ? "Hide Terminal" : "Show Terminal", shortcut: "Ctrl+`", onClick: () => { ide.toggleTerminal(); close(); }},
    { type: "item", icon: <Command className="h-3.5 w-3.5" />, label: "Command Palette", shortcut: "Ctrl+P", onClick: () => { ide.openPalette(); close(); }},
    { type: "item", icon: sound.enabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />, label: sound.enabled ? "Mute Keystrokes" : "Enable Keystroke Sounds", onClick: () => { sound.toggle(); close(); }},
    { type: "sep" },
    { type: "header", label: "Color Theme" },
    ...THEMES.map<MenuItem>((t) => ({
      type: "item",
      icon: <span className="h-3 w-3 rounded-full inline-block" style={{ background: t.dot }} />,
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
    { type: "item", icon: <PlayCircle className="h-3.5 w-3.5" />, label: "Start Project Inquiry", onClick: () => { ide.openFile("contact"); close(); }},
    { type: "item", icon: <CheckCircle2 className="h-3.5 w-3.5" />, label: "Run Audit", onClick: () => { toast.success("Audit complete: 98 / 100"); close(); }},
    { type: "item", icon: <BarChart3 className="h-3.5 w-3.5" />, label: "View Case Studies", onClick: () => { ide.openFile("projects"); close(); }},
    { type: "item", icon: <Sparkles className="h-3.5 w-3.5" />, label: "Open Copilot Chat", onClick: () => { ide.openCopilot(); close(); }},
  ];

  const terminalItems: MenuItem[] = [
    { type: "item", icon: <TerminalSquare className="h-3.5 w-3.5" />, label: ide.terminalOpen ? "Hide Terminal" : "New Terminal", shortcut: "Ctrl+`", onClick: () => { ide.toggleTerminal(); close(); }},
    { type: "item", icon: <PlayCircle className="h-3.5 w-3.5" />, label: "Run Build", onClick: () => { toast("npm run build → ✓ compiled"); close(); }},
    { type: "item", label: "Clear", onClick: () => { toast("Terminal cleared"); close(); }},
  ];

  const helpItems: MenuItem[] = [
    { type: "item", icon: <Info className="h-3.5 w-3.5" />, label: "About Pixel2Align", onClick: () => { ide.openFile("about"); close(); }},
    { type: "item", icon: <Keyboard className="h-3.5 w-3.5" />, label: "Keyboard Shortcuts", onClick: () => { ide.openSettings(); close(); }},
    { type: "item", icon: <Mail className="h-3.5 w-3.5" />, label: "Contact Studio", onClick: () => { ide.openFile("contact"); close(); }},
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
    <div ref={ref} className="h-9 bg-titlebar border-b border-border flex items-center px-3 select-none text-xs font-mono text-muted-foreground relative z-50 shrink-0">
      <div className="hidden md:flex items-center gap-2 mr-4">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>

      <button
        onClick={ide.toggleMobileNav}
        aria-label="Open menu"
        className="md:hidden h-9 w-9 grid place-items-center text-foreground hover:bg-surface transition-colors"
      >
        <Menu className="h-4 w-4" />
      </button>

      <span className="md:hidden text-[11px] truncate text-muted-foreground">
        ~/ {ide.activeTab ? ide.activeTab : "home"}
      </span>

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
              <div className="absolute top-full left-0 min-w-[260px] bg-surface-elevated border border-border shadow-2xl py-1 text-[13px] text-foreground">
                {m.items.map((it, i) => {
                  if (it.type === "sep") return <div key={i} className="h-px bg-border my-1" />;
                  if (it.type === "header") return <div key={i} className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-wider text-muted-foreground">{it.label}</div>;
                  return (
                    <button
                      key={i}
                      onClick={it.onClick}
                      disabled={it.disabled}
                      className="w-full flex items-center gap-2.5 px-3 py-1.5 hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-foreground text-left"
                    >
                      <span className="w-4 grid place-items-center opacity-80">{it.icon}</span>
                      <span className="flex-1">{it.label}</span>
                      {it.shortcut && <span className="text-[11px] opacity-70 font-mono">{it.shortcut}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
        <button
          onClick={ide.openCopilot}
          className="px-3 h-9 flex items-center gap-1.5 text-accent hover:bg-surface transition-colors"
        >
          <Sparkles className="h-3.5 w-3.5" /> Copilot
        </button>
      </div>

      <div className="flex-1 flex justify-center">
        <button
          onClick={ide.openPalette}
          className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-background/60 border border-border min-w-[280px] justify-center hover:border-accent transition-colors"
        >
          <Search className="h-3 w-3" />
          <span>pixel2align : portfolio</span>
          <kbd className="ml-2 px-1.5 py-0.5 rounded bg-surface border border-border text-[10px]">Ctrl</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px]">P</kbd>
        </button>
      </div>

      <a
        href="#top"
        onClick={(e) => { e.preventDefault(); ide.openFile("hero"); }}
        aria-label="Pixel2Align home"
        className="hidden md:flex items-center pl-3 ml-auto shrink-0"
      >
        <Logo className="h-4 w-auto opacity-90 hover:opacity-100 transition-opacity" />
      </a>
    </div>
  );
}
