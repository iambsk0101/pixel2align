import { useState } from "react";
import { EditorPane, Reveal } from "@/components/ide/EditorPane";

type Project = {
  no: string;
  name: string;
  category: string;
  year: string;
  blurb: string;
  tags: string[];
  hue: string;
  url: string;
};

const projects: Project[] = [
  { no: "01", name: "Anugraha Bhimtal", category: "Hospitality · Lakeside Resort", year: "2025", blurb: "An editorial resort site that turns lakeside calm into bookings. Bespoke type pairing and a slow, cinematic gallery.", tags: ["Web Design", "Branding", "CMS"], hue: "from-amber-300 via-orange-400 to-rose-500", url: "#" },
  { no: "02", name: "Dilip's Retreat", category: "Hospitality · Mountain Retreat", year: "2025", blurb: "Warm, story-led design with parallax storytelling and a quiet booking flow.", tags: ["Web Design", "UX"], hue: "from-rose-300 via-amber-300 to-yellow-400", url: "#" },
  { no: "03", name: "The Moonlight Homestay", category: "Hospitality · Homestay", year: "2024", blurb: "Intimate, image-first layout that sells the experience before the rooms.", tags: ["Brand", "Web Design"], hue: "from-indigo-400 via-violet-500 to-fuchsia-500", url: "#" },
  { no: "04", name: "SpaceionDesign", category: "Branding · Interior Studio", year: "2024", blurb: "Luxury identity & website for a high-end interior studio. Editorial grid, gallery-first.", tags: ["Identity", "Web Design"], hue: "from-stone-300 via-zinc-400 to-slate-600", url: "#" },
  { no: "05", name: "Adibaba Travels", category: "Travel · Booking Platform", year: "2024", blurb: "A fast, trustworthy travel site engineered around clear CTAs and proof.", tags: ["UX", "Conversion"], hue: "from-sky-300 via-cyan-400 to-teal-500", url: "#" },
  { no: "06", name: "PH Store", category: "Ecommerce · Lifestyle", year: "2024", blurb: "A polished storefront engineered for repeat purchase and brand love.", tags: ["Ecommerce", "Shopify"], hue: "from-fuchsia-300 via-pink-400 to-rose-500", url: "#" },
  { no: "07", name: "View2Value", category: "SaaS · Business Site", year: "2025", blurb: "A confident business site that positions value, not features. Bold type, restrained motion.", tags: ["Web Design", "Copy"], hue: "from-blue-400 via-indigo-500 to-violet-600", url: "#" },
  { no: "08", name: "View2Value Bio", category: "Funnel · Bio Link", year: "2025", blurb: "A bio link funnel optimised for one click, one outcome.", tags: ["Funnel", "Mobile"], hue: "from-emerald-300 via-teal-400 to-cyan-500", url: "#" },
  { no: "09", name: "View2Value Convert", category: "Landing · Paid Traffic", year: "2025", blurb: "A conversion landing page tuned for paid traffic and ruthless A/B iteration.", tags: ["CRO", "Landing"], hue: "from-orange-300 via-red-400 to-rose-600", url: "#" },
];

export function Work() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <EditorPane id="projects" lines={48}>
      <div className="font-mono text-sm syntax-comment mb-2">// projects.js · selected work, 2024 — 2025</div>
      <div className="font-mono text-sm">
        <span className="syntax-keyword">export const </span>
        <span className="syntax-fn">projects</span> = [
      </div>

      <Reveal>
        <h2 className="mt-8 font-display uppercase leading-[0.88] text-[clamp(2.4rem,8vw,6.25rem)]">
          Selected
          <br />
          <span className="text-accent italic">work.</span>
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <p className="mt-6 max-w-xl text-muted-foreground text-lg">
          Nine recent engagements across hospitality, ecommerce and high-conversion funnels. Hover
          a row — open the case study.
        </p>
      </Reveal>

      {/* Immersive list */}
      <div
        className="mt-14 border-y border-border"
        onMouseLeave={() => setHover(null)}
      >
        {projects.map((p, i) => (
          <Reveal key={p.no} delay={i * 40}>
            <a
              href={p.url}
              onMouseEnter={() => setHover(i)}
              className="group relative grid grid-cols-12 items-center gap-4 py-7 md:py-9 border-b border-border last:border-b-0 transition-colors"
            >
              <div className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">
                {p.no}
              </div>
              <div className="col-span-7 md:col-span-5">
                <h3
                  className={`font-display uppercase leading-[0.95] text-[clamp(1.6rem,4.2vw,3.25rem)] transition-colors ${
                    hover === i ? "text-accent" : "text-foreground"
                  }`}
                >
                  {p.name}
                </h3>
              </div>
              <div className="hidden md:block col-span-3 text-sm text-muted-foreground font-mono">
                {p.category}
              </div>
              <div className="hidden md:flex col-span-2 justify-end gap-2 flex-wrap">
                {p.tags.slice(0, 2).map((t) => (
                  <span key={t} className="text-[10px] uppercase tracking-wider font-mono px-2 py-1 rounded border border-border">
                    {t}
                  </span>
                ))}
              </div>
              <div className="col-span-3 md:col-span-1 flex items-center justify-end gap-3">
                <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
                <span className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-border group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all duration-300 group-hover:rotate-45">
                  ↗
                </span>
              </div>

              {/* Floating preview swatch on hover (desktop) */}
              <div
                className={`pointer-events-none absolute right-24 top-1/2 -translate-y-1/2 hidden lg:block transition-all duration-500 ${
                  hover === i ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              >
                <div className={`w-56 h-32 rounded-lg bg-gradient-to-br ${p.hue} shadow-2xl border border-white/10`}>
                  <div className="w-full h-full grain opacity-30 rounded-lg" />
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 font-mono text-sm">];</div>
    </EditorPane>
  );
}
