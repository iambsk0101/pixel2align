import { useIde, FILES, FILE_ORDER, type FileId } from "./IdeContext";
import { useState } from "react";

const ACTIVITY = [
  { id: "explorer", icon: "📁", label: "Explorer" },
  { id: "search", icon: "🔍", label: "Search" },
  { id: "git", icon: "⎇", label: "Source Control" },
  { id: "run", icon: "▶", label: "Run" },
  { id: "ext", icon: "▦", label: "Extensions" },
  { id: "ai", icon: "✦", label: "Copilot" },
];

export function Sidebar() {
  const { sidebarOpen, openFile, activeTab, openSettings } = useIde();
  const [activity, setActivity] = useState("explorer");

  return (
    <aside className="hidden md:flex bg-sidebar border-r border-border select-none">
      {/* Activity bar */}
      <div className="w-12 border-r border-border flex flex-col items-center py-2 text-muted-foreground">
        {ACTIVITY.map((a) => (
          <button
            key={a.id}
            onClick={() => setActivity(a.id)}
            title={a.label}
            className={`w-12 h-11 grid place-items-center hover:text-foreground transition-colors relative ${
              activity === a.id ? "text-foreground" : ""
            }`}
          >
            {activity === a.id && (
              <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-accent" />
            )}
            <span className="text-lg">{a.icon}</span>
          </button>
        ))}
        <div className="flex-1" />
        <button
          onClick={openSettings}
          title="Settings"
          className="w-12 h-11 grid place-items-center hover:text-foreground transition-colors text-lg"
        >
          ⚙
        </button>
      </div>

      {sidebarOpen && (
        <div className="w-60 lg:w-64 py-2 flex flex-col">
          <div className="px-4 pt-2 pb-3 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            Portfolio
          </div>
          <ul className="text-[13px] font-mono">
            {FILE_ORDER.map((id) => {
              const f = FILES[id as FileId];
              const isActive = activeTab === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => openFile(id)}
                    className={`w-full flex items-center gap-2 px-4 py-1 text-left hover:bg-surface/60 transition-colors ${
                      isActive ? "bg-surface text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <span className={`text-[10px] font-bold w-5 text-center ${f.iconColor}`}>{f.icon}</span>
                    <span className="truncate">{f.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto px-3 pb-3">
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
