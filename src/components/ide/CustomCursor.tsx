import { useEffect, useState } from "react";

type Mode = "caret" | "pointer" | "text" | "hidden";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [mode, setMode] = useState<Mode>("caret");
  const [down, setDown] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Disable on touch / coarse pointer devices
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const read = () => {
      try {
        const v = localStorage.getItem("p2a-cursor");
        return v === null ? true : v === "1";
      } catch { return true; }
    };
    setEnabled(read());

    const onToggle = () => setEnabled(read());
    window.addEventListener("p2a-cursor-change", onToggle);
    return () => window.removeEventListener("p2a-cursor-change", onToggle);
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("cursor-none-root");
      return;
    }
    document.documentElement.classList.add("cursor-none-root");

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = e.target as HTMLElement | null;
      if (!el) return;
      if (el.closest('a,button,[role="button"],summary,label[for],select,[data-cursor="pointer"]')) {
        setMode("pointer");
      } else if (el.closest('input,textarea,[contenteditable="true"],[data-cursor="text"]')) {
        setMode("text");
      } else {
        setMode("caret");
      }
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setMode("hidden");
    const onEnter = () => setMode("caret");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("cursor-none-root");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  const base: React.CSSProperties = {
    position: "fixed",
    left: 0,
    top: 0,
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
    pointerEvents: "none",
    zIndex: 99999,
    willChange: "transform",
  };

  return (
    <>
      {/* Main shape */}
      <div
        aria-hidden
        style={base}
        className={`transition-[opacity] duration-150 ${mode === "hidden" ? "opacity-0" : "opacity-100"}`}
      >
        <div
          className="relative"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {mode === "caret" && (
            <div
              className="bg-accent shadow-[0_0_12px_var(--color-accent)] animate-blink"
              style={{ width: 3, height: 22, borderRadius: 1 }}
            />
          )}
          {mode === "text" && (
            <div className="flex flex-col items-center justify-center text-accent" style={{ width: 14, height: 24 }}>
              <div className="bg-accent" style={{ width: 10, height: 2 }} />
              <div className="bg-accent my-[1px]" style={{ width: 2, height: 18 }} />
              <div className="bg-accent" style={{ width: 10, height: 2 }} />
            </div>
          )}
          {mode === "pointer" && (
            <div
              className={`rounded-md border-2 border-accent bg-accent/10 backdrop-blur-[1px] transition-all duration-150 ${down ? "scale-90" : "scale-100"}`}
              style={{ width: 28, height: 28 }}
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[10px] text-accent uppercase tracking-widest whitespace-nowrap">
                click
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trailing dot */}
      <div
        aria-hidden
        style={{
          ...base,
          transition: "transform 0.18s cubic-bezier(.22,1,.36,1), opacity .15s",
          opacity: mode === "hidden" || mode === "pointer" ? 0 : 0.5,
        }}
      >
        <div
          className="bg-accent rounded-full"
          style={{ width: 6, height: 6, transform: "translate(-50%, -50%)" }}
        />
      </div>
    </>
  );
}
