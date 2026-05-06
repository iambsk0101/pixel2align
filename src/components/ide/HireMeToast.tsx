import { useEffect, useState } from "react";
import { Sparkles, X, ArrowRight } from "lucide-react";
import { useIde } from "./IdeContext";

const DISMISS_KEY = "p2a-hire-dismissed";

export function HireMeToast() {
  const ide = useIde();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!ide.booted) return;
    try {
      const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
      // Re-show after 6 hours
      if (Date.now() - dismissedAt < 6 * 60 * 60 * 1000) return;
    } catch {}
    const t = setTimeout(() => setShow(true), 12000);
    return () => clearTimeout(t);
  }, [ide.booted]);

  const dismiss = () => {
    setShow(false);
    try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch {}
  };

  const openContact = () => {
    ide.openFile("contact");
    dismiss();
  };

  if (!show) return null;

  return (
    <div className="fixed z-[70] bottom-10 right-4 sm:right-6 max-w-[340px] animate-fade-in">
      <div className="relative rounded-lg border border-accent/40 bg-surface-elevated/95 backdrop-blur-md shadow-2xl p-4 pr-9">
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute top-2 right-2 h-6 w-6 grid place-items-center rounded hover:bg-surface text-muted-foreground hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 shrink-0 rounded-md bg-accent/15 grid place-items-center">
            <Sparkles className="h-4 w-4 text-accent" />
          </div>
          <div className="min-w-0">
            <div className="font-mono text-[11px] uppercase tracking-wider text-accent">Available Q2 2026</div>
            <div className="font-display text-base mt-0.5 leading-tight">Let's build something memorable.</div>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Booking 2 premium projects. Avg reply time: under 24h.
            </p>
            <button
              onClick={openContact}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent text-accent-foreground font-mono text-xs font-semibold hover:translate-y-[-1px] transition-transform"
            >
              Hire me <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
