import { useEffect, useState } from "react";
import { useIde, THEMES } from "./IdeContext";
import { useSound } from "./SoundContext";
import { toast } from "sonner";
import {
  Search,
  TerminalSquare,
  Sparkles,
  FileText,
  PanelLeft,
  Volume2,
  VolumeX,
  Check,
} from "lucide-react";

export function SettingsDrawer() {
  const ide = useIde();
  const sound = useSound();

  useEffect(() => {
    if (!ide.settingsOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") ide.closeSettings(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ide.settingsOpen, ide.closeSettings]);

  if (!ide.settingsOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" onMouseDown={ide.closeSettings}>
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute left-0 bottom-7 w-[320px] max-h-[85vh] overflow-y-auto bg-surface-elevated border border-border shadow-2xl text-foreground animate-fade-in"
      >
        <div className="px-4 py-3 border-b border-border text-[11px] uppercase tracking-wider font-mono text-muted-foreground">Settings</div>

        <Section title="Color Theme">
          {THEMES.map((t) => {
            const active = ide.theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => { ide.setTheme(t.id); toast(`Theme: ${t.label}`); }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-surface transition-colors ${active ? "bg-surface" : ""}`}
              >
                <span className="h-4 w-4 rounded-full border border-border" style={{ background: t.dot }} />
                <span>{t.label}</span>
                {active && <Check className="ml-auto h-4 w-4 text-accent" />}
              </button>
            );
          })}
        </Section>

        <Section title="Quick Actions">
          <Action icon={<Search className="h-4 w-4" />} label="Command Palette" shortcut="Ctrl+P" onClick={() => { ide.openPalette(); ide.closeSettings(); }} />
          <Action icon={<TerminalSquare className="h-4 w-4" />} label={ide.terminalOpen ? "Hide Terminal" : "Toggle Terminal"} shortcut="Ctrl+`" onClick={ide.toggleTerminal} />
          <Action icon={<Sparkles className="h-4 w-4 text-accent" />} label="Copilot Chat" onClick={() => { ide.openCopilot(); ide.closeSettings(); }} />
          <Action icon={<FileText className="h-4 w-4" />} label="Download Brief" onClick={() => { ide.openBrief(); ide.closeSettings(); }} />
          <Action icon={<PanelLeft className="h-4 w-4" />} label={ide.sidebarOpen ? "Hide Sidebar" : "Show Sidebar"} shortcut="Ctrl+B" onClick={ide.toggleSidebar} />
          <Action icon={sound.enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />} label={sound.enabled ? "Mute Keystrokes" : "Enable Keystroke Sounds"} onClick={sound.toggle} />
        </Section>

        <Section title="Keyboard Shortcuts">
          <Shortcut keys={["Ctrl", "P"]} label="Go to file (command palette)" />
          <Shortcut keys={["Ctrl", "`"]} label="Toggle terminal" />
          <Shortcut keys={["Ctrl", "B"]} label="Toggle sidebar" />
          <Shortcut keys={["Ctrl", "W"]} label="Close current tab" />
          <Shortcut keys={["Ctrl", "T"]} label="Cycle next tab" />
          <Shortcut keys={["Esc"]} label="Close overlay" />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-2 border-b border-border">
      <div className="px-4 py-1 text-[10px] uppercase tracking-wider text-muted-foreground font-mono flex items-center gap-2">
        <span className="text-accent">●</span> {title}
      </div>
      <div>{children}</div>
    </div>
  );
}

function Action({ label, shortcut, icon, onClick }: { label: string; shortcut?: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-surface transition-colors">
      <span className="w-5 grid place-items-center">{icon}</span>
      <span>{label}</span>
      {shortcut && <span className="ml-auto text-[10px] font-mono text-muted-foreground">{shortcut}</span>}
    </button>
  );
}

function Shortcut({ keys, label }: { keys: string[]; label: string }) {
  return (
    <div className="px-4 py-1.5 flex items-center gap-2 text-xs">
      {keys.map((k) => (
        <kbd key={k} className="px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-[10px]">{k}</kbd>
      ))}
      <span className="text-muted-foreground ml-1">{label}</span>
    </div>
  );
}
