import { useEffect, useState } from "react";

export function StatusBar({ active }: { active: string }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      );
    update();
    const i = setInterval(update, 30_000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="h-7 bg-statusbar text-primary-foreground text-[11px] font-mono flex items-center px-3 gap-4 sticky bottom-0 z-40">
      <span>⚠ 0</span>
      <span>⊗ 0</span>
      <span>⎇ main</span>
      <span className="hidden sm:inline">🔄 Pixel2Align</span>
      <div className="flex-1" />
      <span className="hidden md:inline">{active}</span>
      <span className="hidden md:inline">TypeScript React</span>
      <span>UTF-8</span>
      <span>Prettier</span>
      <span>✦ Pixel Dark</span>
      <span>▲ {time}</span>
    </div>
  );
}
