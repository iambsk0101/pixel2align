import { useIde, FILES, FILE_ORDER, type FileId } from "./IdeContext";
import { useState } from "react";
import {
  Files,
  Search,
  GitBranch,
  Play,
  Puzzle,
  Sparkles,
  Settings,
  FileCode2,
  FileType,
  Braces,
  FileText,
  Hash,
  FileJson,
  FileType2,
} from "lucide-react";

const ACTIVITY = [
  { id: "explorer", Icon: Files, label: "Explorer" },
  { id: "search", Icon: Search, label: "Search" },
  { id: "git", Icon: GitBranch, label: "Source Control" },
  { id: "run", Icon: Play, label: "Run" },
  { id: "ext", Icon: Puzzle, label: "Extensions" },
  { id: "ai", Icon: Sparkles, label: "Copilot" },
];

const FILE_ICONS: Record<string, { Icon: any; color: string }> = {
  hero: { Icon: FileCode2, color: "text-sky-400" },
  about: { Icon: FileType, color: "text-orange-400" },
  projects: { Icon: Braces, color: "text-yellow-400" },
  skills: { Icon: FileJson, color: "text-amber-300" },
  process: { Icon: FileType2, color: "text-blue-400" },
  testimonials: { Icon: Hash, color: "text-fuchsia-400" },
  contact: { Icon: FileText, color: "text-zinc-300" },
  brief: { Icon: FileText, color: "text-red-400" },
};

export function FileIcon({ id, className = "h-3.5 w-3.5" }: { id: string; className?: string }) {
  const def = FILE_ICONS[id] ?? FILE_ICONS.contact;
  const I = def.Icon;
  return <I className={`${className} ${def.color}`} />;
}

export function Sidebar() {
  const ide = useIde();
  const [activity, setActivity] = useState("explorer");

  return (
    <aside className="hidden md:flex bg-sidebar border-r border-border select-none shrink-0 h-full">
      <div className="w-12 border-r border-border flex flex-col items-center py-2 text-muted-foreground">
        {ACTIVITY.map((a) => {
          const isActive = activity === a.id;
          return (
            <button
              key={a.id}
              onClick={() => {
                setActivity(a.id);
                if (a.id === "ai") ide.openCopilot();
              }}
              title={a.label}
              className={`w-12 h-11 grid place-items-center hover:text-foreground transition-colors relative ${
                isActive ? "text-foreground" : ""
              }`}
            >
              {isActive && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-accent" />}
              <a.Icon className="h-5 w-5" strokeWidth={1.5} />
            </button>
          );
        })}
        <div className="flex-1" />
        <button
          onClick={ide.openSettings}
          title="Settings"
          className="w-12 h-11 grid place-items-center hover:text-foreground transition-colors"
        >
          <Settings className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      {ide.sidebarOpen && (
        <div className="w-60 lg:w-64 py-2 flex flex-col overflow-y-auto">
          <div className="px-4 pt-2 pb-3 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            Portfolio
          </div>
          <ul className="text-[13px] font-mono">
            {FILE_ORDER.map((id) => {
              const f = FILES[id as FileId];
              const isActive = ide.activeTab === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => ide.openFile(id)}
                    className={`w-full flex items-center gap-2 px-4 py-1.5 text-left hover:bg-surface/60 transition-colors ${
                      isActive ? "bg-surface text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <FileIcon id={id} />
                    <span className="truncate">{f.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto px-3 pb-3">
            <button
              onClick={ide.openCopilot}
              className="w-full rounded-md border border-border bg-surface/60 hover:border-accent hover:bg-surface p-3 transition-colors text-left"
            >
              <div className="flex items-center gap-2 text-xs font-mono">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span>Pixel's Copilot</span>
                <span className="ml-auto text-[10px] text-muted-foreground">AI</span>
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">Ask anything about the studio</div>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
