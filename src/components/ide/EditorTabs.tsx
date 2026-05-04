import { useIde, FILES } from "./IdeContext";
import { FileIcon } from "./Sidebar";
import { X } from "lucide-react";

export function EditorTabs() {
  const { openTabs, activeTab, setActive, closeTab } = useIde();

  if (openTabs.length === 0) return <div className="h-10 bg-titlebar border-b border-border shrink-0" />;

  return (
    <div className="bg-titlebar border-b border-border flex overflow-x-auto scrollbar-hide shrink-0">
      {openTabs.map((id) => {
        const f = FILES[id];
        const isActive = activeTab === id;
        return (
          <div
            key={id}
            className={`group relative shrink-0 flex items-center gap-2 pl-3 pr-1.5 py-2.5 text-xs font-mono border-r border-border transition-colors cursor-pointer ${
              isActive ? "bg-editor text-foreground" : "bg-titlebar text-muted-foreground hover:text-foreground hover:bg-editor/50"
            }`}
            onClick={() => setActive(id)}
            onMouseDown={(e) => { if (e.button === 1) { e.preventDefault(); closeTab(id); } }}
          >
            {isActive && <span className="absolute top-0 left-0 right-0 h-px bg-accent" />}
            <FileIcon id={id} className="h-3.5 w-3.5" />
            <span>{f.name}</span>
            <button
              aria-label={`Close ${f.name}`}
              onClick={(e) => { e.stopPropagation(); closeTab(id); }}
              className="ml-1 w-5 h-5 grid place-items-center rounded opacity-40 group-hover:opacity-100 hover:bg-surface"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function Breadcrumb() {
  const { activeTab } = useIde();
  if (!activeTab) return null;
  const f = FILES[activeTab];
  const segments = f.path.split("/");
  return (
    <div className="px-6 md:px-10 py-2 text-xs font-mono text-muted-foreground border-b border-border bg-editor/60 shrink-0">
      pixel2align{" "}
      {segments.map((s, i) => (
        <span key={i}>
          <span className="opacity-40 mx-1">›</span>
          <span className={i === segments.length - 1 ? "text-foreground" : ""}>{s}</span>
        </span>
      ))}
    </div>
  );
}
