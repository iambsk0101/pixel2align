import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type FileId =
  | "hero"
  | "about"
  | "projects"
  | "skills"
  | "process"
  | "testimonials"
  | "contact"
  | "brief"
  | "terminal";

export type FileMeta = {
  id: FileId;
  name: string;
  icon: string; // emoji or letter
  iconColor: string; // tailwind text color or var
  path: string; // breadcrumb path
  lang: string; // status bar language
};

export const FILES: Record<FileId, FileMeta> = {
  hero: { id: "hero", name: "hero.tsx", icon: "⚛", iconColor: "text-sky-400", path: "src/hero.tsx", lang: "TypeScript React" },
  about: { id: "about", name: "about.html", icon: "❰❱", iconColor: "text-orange-400", path: "src/about.html", lang: "HTML" },
  projects: { id: "projects", name: "projects.js", icon: "JS", iconColor: "text-yellow-400", path: "src/projects.js", lang: "JavaScript" },
  skills: { id: "skills", name: "skills.json", icon: "{ }", iconColor: "text-amber-300", path: "src/skills.json", lang: "JSON" },
  process: { id: "process", name: "process.ts", icon: "TS", iconColor: "text-blue-400", path: "src/process.ts", lang: "TypeScript" },
  testimonials: { id: "testimonials", name: "testimonials.css", icon: "#", iconColor: "text-fuchsia-400", path: "src/testimonials.css", lang: "CSS" },
  contact: { id: "contact", name: "contact.md", icon: "M↓", iconColor: "text-zinc-300", path: "src/contact.md", lang: "Markdown" },
  brief: { id: "brief", name: "Pixel2Align_Brief.pdf", icon: "PDF", iconColor: "text-red-400", path: "docs/Pixel2Align_Brief.pdf", lang: "PDF" },
  terminal: { id: "terminal", name: "terminal", icon: "▸_", iconColor: "text-emerald-400", path: "~/pixel2align", lang: "Shell" },
};

export const FILE_ORDER: FileId[] = [
  "hero",
  "about",
  "projects",
  "skills",
  "process",
  "testimonials",
  "contact",
  "brief",
];

export type ThemeId = "pixel-dark" | "rose-pine" | "tokyo-night" | "catppuccin" | "nord" | "gruvbox" | "pixel-light";

export const THEMES: { id: ThemeId; label: string; emoji: string; dot: string }[] = [
  { id: "pixel-dark", label: "Pixel Dark", emoji: "✦", dot: "#f59e0b" },
  { id: "rose-pine", label: "Rosé Pine", emoji: "🌹", dot: "#eb6f92" },
  { id: "tokyo-night", label: "Tokyo Night", emoji: "🗼", dot: "#7aa2f7" },
  { id: "catppuccin", label: "Catppuccin", emoji: "🐱", dot: "#cba6f7" },
  { id: "nord", label: "Nord", emoji: "❄", dot: "#88c0d0" },
  { id: "gruvbox", label: "Gruvbox", emoji: "🔥", dot: "#fabd2f" },
  { id: "pixel-light", label: "Pixel Light", emoji: "☀", dot: "#f97316" },
];

type IdeState = {
  openTabs: FileId[];
  activeTab: FileId | null;
  recents: FileId[];
  sidebarOpen: boolean;
  terminalOpen: boolean;
  theme: ThemeId;
  paletteOpen: boolean;
  settingsOpen: boolean;
  briefOpen: boolean;
  mobileNavOpen: boolean;
  openFile: (id: FileId) => void;
  closeTab: (id: FileId) => void;
  closeAllTabs: () => void;
  setActive: (id: FileId) => void;
  toggleSidebar: () => void;
  toggleTerminal: () => void;
  setTheme: (t: ThemeId) => void;
  openPalette: () => void;
  closePalette: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  openBrief: () => void;
  closeBrief: () => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;
};

const Ctx = createContext<IdeState | null>(null);

export function IdeProvider({ children }: { children: React.ReactNode }) {
  const [openTabs, setOpenTabs] = useState<FileId[]>(["hero"]);
  const [activeTab, setActiveTab] = useState<FileId | null>("hero");
  const [recents, setRecents] = useState<FileId[]>(["hero"]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [theme, setThemeState] = useState<ThemeId>("pixel-dark");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Load persisted theme
  useEffect(() => {
    try {
      const t = localStorage.getItem("p2a-theme") as ThemeId | null;
      if (t) setThemeState(t);
    } catch {}
  }, []);

  // Apply theme to <html> data attribute
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.classList.toggle("light", theme === "pixel-light");
    try { localStorage.setItem("p2a-theme", theme); } catch {}
  }, [theme]);

  const openFile = useCallback((id: FileId) => {
    if (id === "brief") {
      setBriefOpen(true);
      return;
    }
    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveTab(id);
    setRecents((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 8));
  }, []);

  const closeTab = useCallback((id: FileId) => {
    setOpenTabs((prev) => {
      const next = prev.filter((x) => x !== id);
      setActiveTab((cur) => {
        if (cur !== id) return cur;
        if (next.length === 0) return null;
        const idx = prev.indexOf(id);
        return next[Math.min(idx, next.length - 1)] ?? null;
      });
      return next;
    });
  }, []);

  const closeAllTabs = useCallback(() => {
    setOpenTabs([]);
    setActiveTab(null);
  }, []);

  const setActive = useCallback((id: FileId) => {
    setActiveTab(id);
    setRecents((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 8));
  }, []);

  const value = useMemo<IdeState>(
    () => ({
      openTabs,
      activeTab,
      recents,
      sidebarOpen,
      terminalOpen,
      theme,
      paletteOpen,
      settingsOpen,
      briefOpen,
      mobileNavOpen,
      openFile,
      closeTab,
      closeAllTabs,
      setActive,
      toggleSidebar: () => setSidebarOpen((v) => !v),
      toggleTerminal: () => setTerminalOpen((v) => !v),
      setTheme: (t) => setThemeState(t),
      openPalette: () => setPaletteOpen(true),
      closePalette: () => setPaletteOpen(false),
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
      openBrief: () => setBriefOpen(true),
      closeBrief: () => setBriefOpen(false),
      openMobileNav: () => setMobileNavOpen(true),
      closeMobileNav: () => setMobileNavOpen(false),
      toggleMobileNav: () => setMobileNavOpen((v) => !v),
    }),
    [openTabs, activeTab, recents, sidebarOpen, terminalOpen, theme, paletteOpen, settingsOpen, briefOpen, mobileNavOpen, openFile, closeTab, closeAllTabs, setActive],
  );

  // Global keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (meta && e.key.toLowerCase() === "w") {
        e.preventDefault();
        if (activeTab) value.closeTab(activeTab);
      } else if (meta && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarOpen((v) => !v);
      } else if (meta && e.key.toLowerCase() === "t") {
        e.preventDefault();
        // Cycle to next file
        const idx = activeTab ? FILE_ORDER.indexOf(activeTab) : -1;
        const next = FILE_ORDER[(idx + 1) % FILE_ORDER.length];
        value.openFile(next);
      } else if (meta && e.key === "`") {
        e.preventDefault();
        setTerminalOpen((v) => !v);
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
        setSettingsOpen(false);
        setBriefOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeTab, value]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useIde() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useIde outside IdeProvider");
  return v;
}
