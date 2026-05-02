import { useEffect, useMemo, useState } from "react";
import { useIde, FILES, FILE_ORDER } from "./IdeContext";

export function CommandPalette() {
  const { paletteOpen, closePalette, openFile } = useIde();
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => { if (paletteOpen) { setQ(""); setIdx(0); } }, [paletteOpen]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return FILE_ORDER.filter((id) => !term || FILES[id].name.toLowerCase().includes(term));
  }, [q]);

  useEffect(() => {
    if (!paletteOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, results.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
      else if (e.key === "Enter") {
        e.preventDefault();
        const id = results[idx];
        if (id) { openFile(id); closePalette(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, results, idx, openFile, closePalette]);

  if (!paletteOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm pt-24 px-4 flex justify-center" onMouseDown={closePalette}>
      <div onMouseDown={(e) => e.stopPropagation()} className="w-full max-w-xl bg-surface-elevated border border-border rounded-md shadow-2xl overflow-hidden">
        <input
          autoFocus
          value={q}
          onChange={(e) => { setQ(e.target.value); setIdx(0); }}
          placeholder="Go to file…"
          className="w-full px-4 py-3 bg-transparent outline-none border-b border-border text-sm font-mono"
        />
        <ul className="max-h-72 overflow-y-auto py-1">
          {results.map((id, i) => {
            const f = FILES[id];
            const active = i === idx;
            return (
              <li key={id}>
                <button
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => { openFile(id); closePalette(); }}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-mono text-left ${active ? "bg-accent text-accent-foreground" : "hover:bg-surface"}`}
                >
                  <span className={`text-[10px] font-bold w-5 text-center ${active ? "" : f.iconColor}`}>{f.icon}</span>
                  <span>{f.name}</span>
                  <span className="ml-auto text-[10px] opacity-70">{f.path}</span>
                </button>
              </li>
            );
          })}
          {results.length === 0 && <li className="px-4 py-3 text-sm text-muted-foreground">No matches</li>}
        </ul>
      </div>
    </div>
  );
}
