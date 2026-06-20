import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { EditorPane, Reveal } from "@/components/ide/EditorPane";
import { critiqueSite } from "@/utils/critique.functions";
import { Sparkles, Loader2, Globe, ArrowRight, Wand2 } from "lucide-react";
import { useIde } from "@/components/ide/IdeContext";

const EXAMPLES = ["stripe.com", "linear.app", "vercel.com"];

function MarkdownLite({ text }: { text: string }) {
  // Lightweight markdown: ###, **bold**, - bullets, paragraphs
  const blocks = text.split(/\n{2,}/);
  return (
    <div className="space-y-4 text-[15px] leading-7">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (lines[0].startsWith("### ")) {
          return (
            <div key={i}>
              <h3 className="font-display uppercase text-lg md:text-xl tracking-tight text-accent">
                {lines[0].replace(/^###\s+/, "")}
              </h3>
              <div className="mt-2 text-foreground/90">
                <MarkdownLite text={lines.slice(1).join("\n")} />
              </div>
            </div>
          );
        }
        if (lines.every((l) => l.trim().startsWith("- "))) {
          return (
            <ul key={i} className="space-y-1.5 list-none pl-0">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-2.5 text-foreground/85">
                  <span className="text-accent shrink-0">▸</span>
                  <span dangerouslySetInnerHTML={{ __html: inline(l.replace(/^-\s+/, "")) }} />
                </li>
              ))}
            </ul>
          );
        }
        return <p key={i} className="text-foreground/85" dangerouslySetInnerHTML={{ __html: inline(block) }} />;
      })}
    </div>
  );
}

function inline(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="font-mono text-[0.9em] bg-surface px-1.5 py-0.5 rounded text-accent">$1</code>');
}

export function Critique() {
  const ide = useIde();
  const audit = useServerFn(critiqueSite);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const run = async (target: string) => {
    if (!target.trim() || loading) return;
    setLoading(true);
    setResult(null);
    setError(false);
    try {
      const res = await audit({ data: { url: target.trim() } });
      setResult(res.reply);
      setError(!!res.error);
    } catch {
      setResult("Something went wrong. Try again.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EditorPane id="critique" lines={40}>
      <div className="font-mono text-sm syntax-comment">// critique.ai · free, brutally honest 30-second site audit</div>
      <div className="mt-2 font-mono text-sm">
        <span className="syntax-keyword">async function </span>
        <span className="syntax-fn">auditYourSite</span>
        <span className="syntax-tag">(</span>
        <span className="syntax-var">url</span>
        <span className="syntax-tag">) {`{`}</span>
      </div>

      <Reveal>
        <h2 className="mt-8 font-display uppercase leading-[0.88] text-[clamp(2.4rem,8vw,6rem)]">
          Get a free
          <br />
          <span className="text-accent italic">AI design critique.</span>
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Paste any live website. In 30 seconds our AI critic reads it like a senior designer would —
          calls out the weak spots, the wins, and exactly how Pixel2Align would rebuild it.
          No signup, no fluff.
        </p>
      </Reveal>

      <Reveal delay={200}>
        <form
          onSubmit={(e) => { e.preventDefault(); run(url); }}
          className="mt-10 rounded-xl border border-border bg-surface/40 p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:items-center"
        >
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-md bg-background border border-border focus-within:border-accent transition-colors">
            <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="yourwebsite.com"
              autoComplete="url"
              className="flex-1 bg-transparent outline-none text-sm sm:text-base font-mono placeholder:text-muted-foreground/60"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-accent text-accent-foreground font-mono text-sm font-semibold disabled:opacity-50 hover:translate-y-[-1px] transition-transform shrink-0"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
            {loading ? "Auditing…" : "Roast my site"}
          </button>
        </form>
      </Reveal>

      <Reveal delay={260}>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
          <span>Try:</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => { setUrl(ex); run(ex); }}
              disabled={loading}
              className="px-2.5 py-1 rounded border border-border hover:border-accent hover:text-accent transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
      </Reveal>

      {loading && (
        <div className="mt-10 rounded-xl border border-border bg-surface/40 p-6 sm:p-8 animate-fade-in">
          <div className="flex items-center gap-3 text-muted-foreground font-mono text-sm">
            <Loader2 className="h-4 w-4 animate-spin text-accent" />
            <span>Fetching site → parsing structure → asking the AI critic…</span>
          </div>
          <div className="mt-5 space-y-3">
            {[80, 92, 70, 88, 60].map((w, i) => (
              <div key={i} className="h-3 rounded bg-surface animate-pulse" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      )}

      {result && !loading && (
        <Reveal>
          <div className={`mt-10 rounded-xl border ${error ? "border-destructive/40" : "border-accent/30"} bg-surface/50 p-6 sm:p-8`}>
            <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-border">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span>pixel's-critic · gemini</span>
              </div>
              <button
                onClick={() => { setResult(null); setUrl(""); }}
                className="text-xs font-mono text-muted-foreground hover:text-accent"
              >
                New audit
              </button>
            </div>
            <MarkdownLite text={result} />

            {!error && (
              <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="text-sm text-muted-foreground">Liked the read? Let's actually build the fix.</div>
                <button
                  onClick={() => ide.openFile("contact")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-accent text-accent-foreground font-mono text-sm font-semibold hover:translate-y-[-1px] transition-transform"
                >
                  Start a project <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </Reveal>
      )}

      <div className="mt-12 font-mono text-sm syntax-tag">{`}`}</div>
    </EditorPane>
  );
}
