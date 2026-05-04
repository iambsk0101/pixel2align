import { useEffect, useRef, useState } from "react";
import { Check, Palette } from "lucide-react";
import { useIde, THEMES } from "./IdeContext";

export function StatusBarThemePopover() {
  const ide = useIde();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  const current = THEMES.find((t) => t.id === ide.theme);

  return (
    <div ref={ref} className="relative h-full">
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-full px-2.5 inline-flex items-center gap-1.5 hover:bg-black/15 transition-colors"
        title="Change theme"
      >
        <Palette className="h-3 w-3" />
        <span>{current?.label ?? "Theme"}</span>
      </button>
      {open && (
        <div className="absolute right-0 bottom-full mb-1 w-56 bg-surface-elevated border border-border shadow-2xl rounded-md py-1 text-foreground">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            Color theme
          </div>
          {THEMES.map((t) => {
            const active = t.id === ide.theme;
            return (
              <button
                key={t.id}
                onClick={() => { ide.setTheme(t.id); setOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] hover:bg-surface text-left font-mono"
              >
                <span className="h-3 w-3 rounded-full border border-border" style={{ background: t.dot }} />
                <span className="flex-1">{t.label}</span>
                {active && <Check className="h-3.5 w-3.5 text-accent" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
