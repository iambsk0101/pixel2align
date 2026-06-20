import { useState } from "react";
import { EditorPane, Reveal } from "@/components/ide/EditorPane";
import anugraha from "@/assets/projects/anugraha.jpg";
import dilip from "@/assets/projects/dilip.jpg";
import moonlight from "@/assets/projects/moonlight.jpg";
import spaceion from "@/assets/projects/spaceion.jpg";
import adibaba from "@/assets/projects/adibaba.jpg";
import phstore from "@/assets/projects/phstore.jpg";
import v2v from "@/assets/projects/v2v.jpg";
import v2vBio from "@/assets/projects/v2v-bio.jpg";
import v2vConvert from "@/assets/projects/v2v-convert.jpg";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyModal, type CaseStudy } from "@/components/ide/CaseStudyModal";

/**
 * Bento span tokens — kept tiny and intentional so the grid stays calm
 * on desktop and stacks perfectly on mobile.
 * - "hero"   : 2 cols × 2 rows  (big feature card, top-left)
 * - "wide"   : 2 cols × 1 row
 * - "tall"   : 1 col  × 2 rows
 * - default  : 1 col  × 1 row
 */
type BentoSpan = "hero" | "wide" | "tall" | "square";
type Project = CaseStudy & { span: BentoSpan };

const projects: Project[] = [
  { no: "01", name: "Anugraha Bhimtal", category: "Hospitality · Lakeside Resort", year: "2025", blurb: "Editorial resort site that turns lakeside calm into bookings — full-bleed photography, story-led scroll, friction-free inquiry.", tags: ["Web Design", "Branding", "CMS"], image: anugraha, url: "#", span: "hero", problem: "A boutique lakeside property with strong visuals but a generic site that wasn't converting browsers into bookings.", approach: "Editorial typography, full-bleed photography, story-led scroll, and a friction-free booking inquiry flow.", outcome: "Brand finally feels as premium as the property. Inquiries up, drop-off down." },
  { no: "02", name: "SpaceionDesign", category: "Branding · Interior Studio", year: "2024", blurb: "Luxury identity and website for a high-end interior studio.", tags: ["Identity", "Web"], image: spaceion, url: "#", span: "tall" },
  { no: "03", name: "View2Value", category: "SaaS · Business Site", year: "2025", blurb: "A confident business site that positions value, not features.", tags: ["Web", "Copy"], image: v2v, url: "#", span: "wide" },
  { no: "04", name: "Dilip's Retreat", category: "Hospitality · Mountain Retreat", year: "2025", blurb: "Warm, story-led design with parallax storytelling.", tags: ["Web Design", "UX"], image: dilip, url: "#", span: "square" },
  { no: "05", name: "The Moonlight Homestay", category: "Hospitality · Homestay", year: "2024", blurb: "Intimate, image-first layout that sells the experience.", tags: ["Brand", "Web Design"], image: moonlight, url: "#", span: "square" },
  { no: "06", name: "Adibaba Travels", category: "Travel · Booking Platform", year: "2024", blurb: "A fast, trustworthy travel site engineered around clear CTAs.", tags: ["UX", "Conversion"], image: adibaba, url: "#", span: "wide" },
  { no: "07", name: "PH Store", category: "Ecommerce · Lifestyle", year: "2024", blurb: "A polished storefront engineered for repeat purchase.", tags: ["Ecommerce", "Shopify"], image: phstore, url: "#", span: "tall" },
  { no: "08", name: "View2Value Bio", category: "Funnel · Bio Link", year: "2025", blurb: "A bio link funnel optimised for one click, one outcome.", tags: ["Funnel", "Mobile"], image: v2vBio, url: "#", span: "square" },
  { no: "09", name: "View2Value Convert", category: "Landing · Paid Traffic", year: "2025", blurb: "A landing page tuned for paid traffic and ruthless A/B iteration.", tags: ["CRO", "Landing"], image: v2vConvert, url: "#", span: "square" },
];

const SPAN_CLASS: Record<BentoSpan, string> = {
  hero: "md:col-span-2 md:row-span-2",
  wide: "md:col-span-2 md:row-span-1",
  tall: "md:col-span-1 md:row-span-2",
  square: "md:col-span-1 md:row-span-1",
};

const ASPECT_CLASS: Record<BentoSpan, string> = {
  hero: "aspect-[16/11]",
  wide: "aspect-[16/8]",
  tall: "aspect-[3/4]",
  square: "aspect-[4/3]",
};

export function Work() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <EditorPane id="projects" lines={64}>
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
        <p className="mt-6 max-w-xl text-muted-foreground text-base md:text-lg">
          Nine recent engagements across hospitality, ecommerce and high-conversion funnels — laid out bento-style. Click any card for the full case study.
        </p>
      </Reveal>

      {/* Bento grid · 1 col mobile → 4 cols desktop with mixed spans */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(180px,1fr)] gap-4 md:gap-5">
        {projects.map((p, i) => (
          <Reveal
            key={p.no}
            delay={i * 40}
            className={SPAN_CLASS[p.span]}
          >
            <button
              onClick={() => setOpen(p)}
              className="group relative block w-full h-full text-left rounded-2xl overflow-hidden border border-border bg-surface/40 hover:border-accent transition-all duration-500"
            >
              <div className={`relative ${ASPECT_CLASS[p.span]} md:absolute md:inset-0 md:aspect-auto overflow-hidden bg-surface`}>
                <img
                  src={p.image}
                  alt={`${p.name} website screenshot — ${p.category}`}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
                />
                {/* readability gradient — heavier on big cards */}
                <div
                  className={`absolute inset-0 ${p.span === "hero" || p.span === "tall" ? "bg-gradient-to-t from-black/85 via-black/35 to-black/10" : "bg-gradient-to-t from-black/80 via-black/30 to-transparent"}`}
                />

                {/* top-row meta */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/60 text-white border border-white/10">{p.no}</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/60 text-white border border-white/10">{p.year}</span>
                  </div>
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent group-hover:rotate-45 transition-all duration-500 shrink-0">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                {/* bottom-row copy */}
                <div className={`absolute left-3 right-3 ${p.span === "hero" ? "bottom-5" : "bottom-3"} text-white`}>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/70">{p.category}</div>
                  <h3 className={`mt-1 font-display uppercase leading-[1] ${p.span === "hero" ? "text-3xl md:text-5xl" : p.span === "wide" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"} group-hover:text-accent transition-colors`}>
                    {p.name}
                  </h3>
                  {(p.span === "hero" || p.span === "wide") && (
                    <p className="mt-2 text-sm text-white/75 line-clamp-2 max-w-[44ch]">{p.blurb}</p>
                  )}
                  {p.span === "hero" && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[10px] uppercase tracking-wider font-mono px-2 py-1 rounded border border-white/20 bg-white/5 text-white/85">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 font-mono text-sm">];</div>

      <CaseStudyModal study={open} onClose={() => setOpen(null)} />
    </EditorPane>
  );
}
