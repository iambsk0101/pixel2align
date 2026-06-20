import { useEffect, useState } from "react";

type Status = {
  verb: string;
  item: string;
  tag: "designing" | "shipping" | "writing" | "listening" | "researching";
  color: string;
};

const STATUSES: Status[] = [
  { verb: "Designing", item: "a hospitality landing page", tag: "designing", color: "#22c55e" },
  { verb: "Shipping", item: "View2Value v2 redesign", tag: "shipping", color: "#06b6d4" },
  { verb: "Writing", item: "a brand voice doc for SpaceionDesign", tag: "writing", color: "#a855f7" },
  { verb: "Listening to", item: "Bonobo · Migration", tag: "listening", color: "#ec4899" },
  { verb: "Researching", item: "scroll-driven UX patterns", tag: "researching", color: "#f59e0b" },
  { verb: "Sketching", item: "a bento layout for a SaaS hero", tag: "designing", color: "#22c55e" },
  { verb: "Prototyping", item: "a typography-first nav system", tag: "designing", color: "#22c55e" },
  { verb: "Auditing", item: "a client homepage with the AI critic", tag: "researching", color: "#f59e0b" },
];

export function NowPlaying() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * STATUSES.length));
  const [tick, setTick] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const rotator = setInterval(() => {
      setIdx((i) => (i + 1) % STATUSES.length);
      setAnimKey((k) => k + 1);
    }, 9000);
    const ticker = setInterval(() => setTick((t) => t + 1), 1000);
    return () => { clearInterval(rotator); clearInterval(ticker); };
  }, []);

  const s = STATUSES[idx];
  // fake elapsed timer that resets each rotation (0-9 sec)
  const sec = tick % 9;
  const mm = Math.floor(sec / 60).toString().padStart(2, "0");
  const ss = (sec % 60).toString().padStart(2, "0");

  return (
    <div
      className="hidden lg:flex items-center gap-2.5 px-3 py-1 rounded-full border border-border bg-background/60 max-w-[340px] min-w-0"
      title={`Currently ${s.verb.toLowerCase()} ${s.item}`}
    >
      <span className="relative inline-flex h-2 w-2 shrink-0">
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-60"
          style={{ background: s.color }}
        />
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ background: s.color }}
        />
      </span>
      <span className="text-[10px] uppercase tracking-[0.18em] font-mono text-muted-foreground shrink-0">
        {s.tag}
      </span>
      <div key={animKey} className="min-w-0 overflow-hidden animate-fade-in">
        <span className="font-mono text-[11px] text-foreground truncate inline-block max-w-full align-middle">
          <span className="text-muted-foreground">{s.verb} </span>
          {s.item}
        </span>
      </div>
      <span className="ml-1 font-mono text-[10px] text-muted-foreground tabular-nums shrink-0">
        {mm}:{ss}
      </span>
    </div>
  );
}
