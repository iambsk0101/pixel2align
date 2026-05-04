import { useEffect, useState } from "react";

const STEPS = [
  "▸ booting pixel2align/v2.6.0",
  "▸ loading design tokens.css",
  "▸ mounting <Editor />",
  "▸ syntax-highlighter ✓",
  "▸ scroll-reveal observer ✓",
  "▸ copilot ai gateway ✓",
  "▸ ready — opening hero.tsx",
];

export function BootLoader({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= STEPS.length) {
      const t = setTimeout(onDone, 280);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setI((v) => v + 1), 180 + Math.random() * 120);
    return () => clearTimeout(t);
  }, [i, onDone]);

  return (
    <div className="fixed inset-0 z-[200] bg-background grid place-items-center">
      <div className="font-mono text-[13px] text-foreground max-w-md w-full px-6">
        <div className="font-display uppercase text-3xl mb-6 tracking-tight">
          Pixel<span className="text-accent">2</span>Align
        </div>
        {STEPS.slice(0, i).map((s, idx) => (
          <div key={idx} className="text-muted-foreground leading-6">
            <span className="text-emerald-400">$</span> {s}
          </div>
        ))}
        <div className="mt-3 h-1 w-full bg-surface rounded overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-200"
            style={{ width: `${(i / STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
