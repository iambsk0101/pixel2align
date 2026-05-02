import { useEffect, useRef, useState } from "react";
import { useIde, FILES, FILE_ORDER } from "./IdeContext";

export function Terminal() {
  const { terminalOpen, toggleTerminal, openFile } = useIde();
  const [lines, setLines] = useState<string[]>([
    "Welcome to Pixel2Align Studio CLI",
    "Type 'help' to see available commands.",
  ]);
  const [input, setInput] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { ref.current?.scrollTo({ top: ref.current.scrollHeight }); }, [lines, terminalOpen]);

  if (!terminalOpen) return null;

  const run = (cmd: string) => {
    const c = cmd.trim();
    const out: string[] = [`pixel2align ▸ ${c}`];
    if (!c) {} else if (c === "help") {
      out.push("Available: ls, open <file>, theme, contact, clear, exit");
    } else if (c === "ls") {
      out.push(FILE_ORDER.map((id) => FILES[id].name).join("  "));
    } else if (c.startsWith("open ")) {
      const name = c.slice(5).trim();
      const id = FILE_ORDER.find((id) => FILES[id].name === name || id === name);
      if (id) { openFile(id); out.push(`✓ opened ${FILES[id].name}`); }
      else out.push(`✗ file not found: ${name}`);
    } else if (c === "theme") {
      out.push("Open Settings (⚙ bottom-left) to switch themes.");
    } else if (c === "contact") {
      openFile("contact"); out.push("✓ jumped to contact.md");
    } else if (c === "clear") {
      setLines([]); setInput(""); return;
    } else if (c === "exit") {
      toggleTerminal(); return;
    } else {
      out.push(`bash: command not found: ${c}`);
    }
    setLines((prev) => [...prev, ...out]);
    setInput("");
  };

  return (
    <div className="border-t border-border bg-titlebar">
      <div className="flex items-center px-3 h-8 text-xs font-mono border-b border-border">
        <span className="text-foreground">▸ TERMINAL</span>
        <button onClick={toggleTerminal} className="ml-auto text-muted-foreground hover:text-foreground px-2">×</button>
      </div>
      <div ref={ref} className="px-3 py-2 h-44 overflow-y-auto font-mono text-xs bg-editor text-foreground">
        {lines.map((l, i) => <div key={i} className={l.startsWith("pixel2align ▸") ? "text-accent" : ""}>{l}</div>)}
        <form onSubmit={(e) => { e.preventDefault(); run(input); }} className="flex items-center gap-2">
          <span className="text-accent">pixel2align ▸</span>
          <input autoFocus value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 bg-transparent outline-none" />
        </form>
      </div>
    </div>
  );
}
