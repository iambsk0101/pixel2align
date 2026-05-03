import { useIde, FILES, FILE_ORDER, THEMES } from "./IdeContext";

export function MobileNav() {
  const ide = useIde();
  if (!ide.mobileNavOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={ide.closeMobileNav}
      />
      <aside className="absolute left-0 top-0 bottom-0 w-[82%] max-w-sm bg-sidebar border-r border-border flex flex-col text-foreground">
        <div className="h-11 flex items-center justify-between px-4 border-b border-border">
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            Explorer
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => { ide.openSettings(); ide.closeMobileNav(); }}
              className="h-8 w-8 grid place-items-center hover:bg-surface rounded text-base"
              aria-label="Settings"
            >⚙</button>
            <button
              onClick={ide.closeMobileNav}
              className="h-8 w-8 grid place-items-center hover:bg-surface rounded text-base"
              aria-label="Close"
            >×</button>
          </div>
        </div>

        <div className="px-4 pt-3 pb-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          Pixel2Align
        </div>
        <ul className="text-[14px] font-mono">
          {FILE_ORDER.map((id) => {
            const f = FILES[id];
            const isActive = ide.activeTab === id;
            return (
              <li key={id}>
                <button
                  onClick={() => ide.openFile(id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    isActive ? "bg-surface text-foreground" : "text-muted-foreground hover:bg-surface/60"
                  }`}
                >
                  <span className={`text-[11px] font-bold w-6 text-center ${f.iconColor}`}>{f.icon}</span>
                  <span className="truncate">{f.name}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 px-4 pb-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          Quick actions
        </div>
        <div className="px-3 grid grid-cols-2 gap-2 text-[12px] font-mono">
          <button
            onClick={() => { ide.openPalette(); ide.closeMobileNav(); }}
            className="px-3 py-2 rounded border border-border hover:bg-surface text-left"
          >🔍 Command</button>
          <button
            onClick={() => { ide.toggleTerminal(); ide.closeMobileNav(); }}
            className="px-3 py-2 rounded border border-border hover:bg-surface text-left"
          >▸_ Terminal</button>
          <button
            onClick={() => { ide.openBrief(); ide.closeMobileNav(); }}
            className="px-3 py-2 rounded border border-border hover:bg-surface text-left"
          >📄 Brief</button>
          <button
            onClick={() => { ide.openFile("contact"); }}
            className="px-3 py-2 rounded bg-accent text-accent-foreground text-left"
          >✉ Contact</button>
        </div>

        <div className="mt-auto border-t border-border p-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
            Theme
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => ide.setTheme(t.id)}
                className={`flex items-center gap-2 px-2.5 py-2 rounded border text-[12px] text-left transition-colors ${
                  ide.theme === t.id
                    ? "border-accent bg-surface"
                    : "border-border hover:bg-surface/60"
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.dot }} />
                <span className="truncate">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
