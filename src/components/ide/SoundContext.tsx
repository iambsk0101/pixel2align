import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type Ctx = { enabled: boolean; toggle: () => void; click: () => void };
const C = createContext<Ctx | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem("p2a-sound");
      if (v === "1") setEnabled(true);
    } catch {}
  }, []);

  const click = useCallback(() => {
    if (!enabled) return;
    try {
      if (!ctxRef.current) ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = ctxRef.current;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "square";
      o.frequency.value = 1100 + Math.random() * 300;
      g.gain.value = 0.04;
      o.connect(g).connect(ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
      o.stop(ctx.currentTime + 0.05);
    } catch {}
  }, [enabled]);

  const toggle = useCallback(() => {
    setEnabled((v) => {
      const n = !v;
      try { localStorage.setItem("p2a-sound", n ? "1" : "0"); } catch {}
      return n;
    });
  }, []);

  // Bind keydown -> click sound
  useEffect(() => {
    if (!enabled) return;
    const onKey = () => click();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, click]);

  return <C.Provider value={{ enabled, toggle, click }}>{children}</C.Provider>;
}

export function useSound() {
  return useContext(C) ?? { enabled: false, toggle: () => {}, click: () => {} };
}
