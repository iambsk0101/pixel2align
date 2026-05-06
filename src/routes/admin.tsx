import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getAnalytics } from "@/utils/analytics.functions";
import { Lock, Eye, Users, FileText, ArrowUpRight, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · Pixel2Align" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type Stats = Extract<Awaited<ReturnType<typeof getAnalytics>>, { ok: true }>;

const FILE_LABELS: Record<string, string> = {
  hero: "hero.tsx",
  about: "about.html",
  projects: "projects.js",
  skills: "skills.json",
  process: "process.ts",
  testimonials: "testimonials.css",
  contact: "contact.md",
  brief: "Brief.pdf",
};

function AdminPage() {
  const fetchStats = useServerFn(getAnalytics);
  const [pwd, setPwd] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetchStats({ data: { password: pwd } });
      if (res.ok) setStats(res);
      else setError(res.error || "Invalid");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (!stats) {
    return (
      <div className="min-h-screen bg-background text-foreground grid place-items-center px-4">
        <form onSubmit={submit} className="w-full max-w-sm rounded-lg border border-border bg-surface p-8 space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-md bg-accent/15 grid place-items-center">
              <Lock className="h-4 w-4 text-accent" />
            </div>
            <div>
              <h1 className="font-display text-xl leading-none">Admin</h1>
              <p className="text-xs text-muted-foreground mt-1">Analytics dashboard</p>
            </div>
          </div>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full bg-background border border-border rounded-md px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-accent"
          />
          {error && <div className="text-xs text-destructive font-mono">{error}</div>}
          <button
            type="submit"
            disabled={loading || !pwd}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-accent text-accent-foreground font-mono text-sm font-semibold disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Unlock"}
          </button>
        </form>
      </div>
    );
  }

  const max = Math.max(...stats.daily.map((d) => d.views), 1);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl">Analytics</h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">last 30 days · auto-tracked</p>
          </div>
          <a href="/" className="text-xs font-mono text-muted-foreground hover:text-accent inline-flex items-center gap-1">
            back to site <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Stat icon={<Eye className="h-4 w-4" />} label="Page views" value={stats.totalViews} />
          <Stat icon={<Users className="h-4 w-4" />} label="Unique sessions" value={stats.uniqueSessions} />
          <Stat icon={<FileText className="h-4 w-4" />} label="File opens" value={stats.topFiles.reduce((a, [, n]) => a + n, 0)} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Panel title="Daily visits (14d)">
            <div className="flex items-end gap-1.5 h-40">
              {stats.daily.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center justify-end gap-1.5">
                  <div
                    className="w-full bg-accent/70 hover:bg-accent rounded-sm transition-colors"
                    style={{ height: `${(d.views / max) * 100}%`, minHeight: 2 }}
                    title={`${d.day}: ${d.views}`}
                  />
                  <span className="text-[9px] font-mono text-muted-foreground">{d.day.slice(5)}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Top files viewed">
            <ul className="space-y-2">
              {stats.topFiles.length === 0 && <li className="text-xs text-muted-foreground">No data yet.</li>}
              {stats.topFiles.map(([id, n]) => (
                <li key={id} className="flex items-center justify-between font-mono text-sm">
                  <span>{FILE_LABELS[id] || id}</span>
                  <span className="text-accent">{n}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Top referrers">
            <ul className="space-y-2">
              {stats.topRefs.map(([k, n]) => (
                <li key={k} className="flex items-center justify-between font-mono text-xs">
                  <span className="truncate max-w-[70%]">{k}</span>
                  <span className="text-accent">{n}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Recent visits">
            <ul className="space-y-1.5 max-h-60 overflow-y-auto">
              {stats.recent.map((r) => (
                <li key={r.id} className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                  <span>{r.path}</span>
                  <span>{new Date(r.created_at).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">{icon}{label}</div>
      <div className="mt-2 font-display text-3xl">{value.toLocaleString()}</div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">{title}</div>
      {children}
    </div>
  );
}
