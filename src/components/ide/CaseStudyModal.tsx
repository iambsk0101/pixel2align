import { X, ExternalLink, Calendar, Tag, Target, Lightbulb, TrendingUp } from "lucide-react";
import { useEffect } from "react";

export type CaseStudy = {
  no: string;
  name: string;
  category: string;
  year: string;
  blurb: string;
  tags: string[];
  image: string;
  url: string;
  problem?: string;
  approach?: string;
  outcome?: string;
};

export function CaseStudyModal({ study, onClose }: { study: CaseStudy | null; onClose: () => void }) {
  useEffect(() => {
    if (!study) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [study, onClose]);

  if (!study) return null;

  return (
    <div
      className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onMouseDown={onClose}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="min-h-screen p-4 md:p-10 grid place-items-start"
      >
        <article className="w-full max-w-4xl mx-auto bg-editor border border-border rounded-xl overflow-hidden shadow-2xl">
          <header className="flex items-center gap-3 px-5 py-3 border-b border-border bg-titlebar">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-muted-foreground truncate">
              case-study/{study.name.toLowerCase().replace(/\s+/g, "-")}.mdx
            </span>
            <button
              onClick={onClose}
              className="ml-auto h-8 w-8 grid place-items-center hover:bg-surface rounded"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div className="aspect-[16/9] relative overflow-hidden bg-surface">
            <img src={study.image} alt={study.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="font-mono text-[11px] uppercase tracking-wider opacity-80">{study.category}</div>
              <h2 className="mt-1 font-display uppercase text-4xl md:text-6xl leading-[0.9]">{study.name}</h2>
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-8">
            <div className="flex flex-wrap gap-3 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> {study.year}
              </span>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Tag className="h-3.5 w-3.5" /> {study.tags.join(" · ")}
              </span>
            </div>

            <p className="text-lg md:text-xl text-pretty leading-relaxed">{study.blurb}</p>

            <div className="grid md:grid-cols-3 gap-5">
              <Block icon={<Target className="h-4 w-4" />} title="Problem">
                {study.problem ?? "Brand needed a premium digital presence that turns casual interest into qualified bookings."}
              </Block>
              <Block icon={<Lightbulb className="h-4 w-4" />} title="Approach">
                {study.approach ?? "Editorial layout, custom typography, conversion-first flows, and a CMS the team can actually use."}
              </Block>
              <Block icon={<TrendingUp className="h-4 w-4" />} title="Outcome">
                {study.outcome ?? "A site that looks editorial, performs like product, and consistently ships qualified leads."}
              </Block>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
              <a
                href={study.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent text-accent-foreground font-mono text-sm font-semibold"
              >
                Visit live site <ExternalLink className="h-4 w-4" />
              </a>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border font-mono text-sm hover:border-accent"
              >
                Close case study
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

function Block({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-wider">
        {icon} {title}
      </div>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}
