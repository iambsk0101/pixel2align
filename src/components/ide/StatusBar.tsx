import { useEffect, useState } from "react";
import { useIde, FILES } from "./IdeContext";
import { StatusBarThemePopover } from "./StatusBarThemePopover";
import { Settings, GitBranch, AlertTriangle, Ban, Bell, Wifi } from "lucide-react";

export function StatusBar() {
  const { activeTab, openSettings } = useIde();
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    update();
    const i = setInterval(update, 30_000);
    return () => clearInterval(i);
  }, []);

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
      <span className="px-2 hidden sm:inline-flex items-center gap-1"><Wifi className="h-3 w-3" /></span>
      <span className="px-3 inline-flex items-center gap-1"><Bell className="h-3 w-3" /> {time}</span>
    </div>
  );
}
