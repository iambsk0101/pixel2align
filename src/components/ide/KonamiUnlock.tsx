import { useEffect } from "react";
import { toast } from "sonner";
import { useIde, type ThemeId } from "./IdeContext";

const SEQ = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export function KonamiUnlock() {
  const ide = useIde();
  useEffect(() => {
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      buf.push(e.key);
      if (buf.length > SEQ.length) buf = buf.slice(-SEQ.length);
      if (buf.length === SEQ.length && buf.every((k, i) => k.toLowerCase() === SEQ[i].toLowerCase())) {
        buf = [];
        try {
          const already = localStorage.getItem("p2a-synthwave-unlocked") === "1";
          localStorage.setItem("p2a-synthwave-unlocked", "1");
          ide.setTheme("synthwave" as ThemeId);
          toast.success(already ? "🌆 Synthwave '84 activated" : "🎮 Secret unlocked: Synthwave '84", {
            description: "A hidden theme just for code archaeologists.",
          });
        } catch {}
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ide]);
  return null;
}
