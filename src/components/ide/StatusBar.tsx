import { useEffect, useState } from "react";
import { useIde, FILES } from "./IdeContext";
import { StatusBarThemePopover } from "./StatusBarThemePopover";
import { Settings, GitBranch, AlertTriangle, Ban, Bell, Wifi, MousePointer2 } from "lucide-react";

export function StatusBar() {
  const { activeTab, openSettings } = useIde();
  const [time, setTime] = useState("");
  const [cursorOn, setCursorOn] = useState(true);
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    update();
    const i = setInterval(update, 30_000);
    try {
      const v = localStorage.getItem("p2a-cursor");
      setCursorOn(v === null ? true : v === "1");
    } catch {}
    return () => clearInterval(i);
  }, []);

  const toggleCursor = () => {
    const next = !cursorOn;
    setCursorOn(next);
    try { localStorage.setItem("p2a-cursor", next ? "1" : "0"); } catch {}
    window.dispatchEvent(new Event("p2a-cursor-change"));
  };

  const f = activeTab ? FILES[activeTab] : null;

  return (
    <div className="h-7 bg-statusbar text-primary-foreground text-[11px] font-mono flex items-center sticky bottom-0 z-40 shrink-0">
      <button
        onClick={openSettings}
        title="Settings"
        className="h-full px-2.5 grid place-items-center hover:bg-black/15 transition-colors"
      >
        <Settings className="h-3 w-3" />
      </button>
      <span className="px-2 inline-flex items-center gap-1"><GitBranch className="h-3 w-3" /> main</span>
      <span className="px-2 hidden sm:inline">↑1 ✦3</span>
      <span className="px-2 hidden md:inline">Pixel2Align's Portfolio</span>
      <div className="flex-1" />
      <span className="px-2 hidden md:inline-flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> 0</span>
      <span className="px-2 hidden md:inline-flex items-center gap-1"><Ban className="h-3 w-3" /> 0</span>
      {f && <span className="px-2 hidden md:inline">{f.lang}</span>}
      <span className="px-2 hidden lg:inline">UTF-8</span>
      <span className="px-2 hidden lg:inline">Prettier</span>
      <StatusBarThemePopover />
      <button
        onClick={toggleCursor}
        title={cursorOn ? "Disable custom cursor" : "Enable custom cursor"}
        className="px-2 h-full hidden sm:inline-flex items-center gap-1 hover:bg-black/15 transition-colors"
      >
        <MousePointer2 className="h-3 w-3" />
        <span>{cursorOn ? "On" : "Off"}</span>
      </button>
      <span className="px-2 hidden sm:inline-flex items-center gap-1"><Wifi className="h-3 w-3" /></span>
      <span className="px-3 inline-flex items-center gap-1"><Bell className="h-3 w-3" /> {time}</span>
    </div>
  );
}
