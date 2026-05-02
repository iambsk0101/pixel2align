import { useEffect, useState } from "react";
import { useIde, FILES, THEMES } from "./IdeContext";

export function StatusBar() {
  const { activeTab, openSettings, theme } = useIde();
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    update();
    const i = setInterval(update, 30_000);
    return () => clearInterval(i);
  }, []);

  const f = activeTab ? FILES[activeTab] : null;
  const themeMeta = THEMES.find((t) => t.id === theme);

  return (
    <div className="h-7 bg-statusbar text-primary-foreground text-[11px] font-mono flex items-center gap-3 sticky bottom-0 z-40">
      <button
        onClick={openSettings}
        title="Settings"
        className="h-full px-2.5 grid place-items-center hover:bg-black/15 transition-colors"
      >
        ⚙
      </button>
      <span>⎇ main</span>
      <span>↑1 ✦3</span>
      <span className="hidden sm:inline">📁 Pixel2Align's Portfolio</span>
      <div className="flex-1" />
      <span className="hidden md:inline">⚠ 0</span>
      <span className="hidden md:inline">⊗ 0</span>
      {f && <span className="hidden md:inline">{f.lang}</span>}
      <span className="hidden lg:inline">UTF-8</span>
      <span className="hidden lg:inline">Prettier</span>
      {themeMeta && <span>{themeMeta.emoji} {themeMeta.label}</span>}
      <span className="pr-3">▲ {time}</span>
    </div>
  );
}
