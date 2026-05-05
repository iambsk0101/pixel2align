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

type Project = CaseStudy & { span?: "wide" | "tall" };

const projects: Project[] = [
  { no: "01", name: "Anugraha Bhimtal", category: "Hospitality · Lakeside Resort", year: "2025", blurb: "Editorial resort site that turns lakeside calm into bookings.", tags: ["Web Design", "Branding", "CMS"], image: anugraha, url: "#", span: "wide", problem: "A boutique lakeside property with strong visuals but a generic site that wasn't converting browsers into bookings.", approach: "Editorial typography, full-bleed photography, story-led scroll, and a friction-free booking inquiry flow.", outcome: "Brand finally feels as premium as the property. Inquiries up, drop-off down." },
  { no: "02", name: "Dilip's Retreat", category: "Hospitality · Mountain Retreat", year: "2025", blurb: "Warm, story-led design with parallax storytelling.", tags: ["Web Design", "UX"], image: dilip, url: "#" },
  { no: "03", name: "The Moonlight Homestay", category: "Hospitality · Homestay", year: "2024", blurb: "Intimate, image-first layout that sells the experience.", tags: ["Brand", "Web Design"], image: moonlight, url: "#" },
  { no: "04", name: "SpaceionDesign", category: "Branding · Interior Studio", year: "2024", blurb: "Luxury identity & website for a high-end interior studio.", tags: ["Identity", "Web"], image: spaceion, url: "#", span: "wide" },
  { no: "05", name: "Adibaba Travels", category: "Travel · Booking Platform", year: "2024", blurb: "A fast, trustworthy travel site engineered around clear CTAs.", tags: ["UX", "Conversion"], image: adibaba, url: "#" },
  { no: "06", name: "PH Store", category: "Ecommerce · Lifestyle", year: "2024", blurb: "A polished storefront engineered for repeat purchase.", tags: ["Ecommerce", "Shopify"], image: phstore, url: "#" },
  { no: "07", name: "View2Value", category: "SaaS · Business Site", year: "2025", blurb: "A confident business site that positions value, not features.", tags: ["Web", "Copy"], image: v2v, url: "#", span: "wide" },
  { no: "08", name: "View2Value Bio", category: "Funnel · Bio Link", year: "2025", blurb: "A bio link funnel optimised for one click, one outcome.", tags: ["Funnel", "Mobile"], image: v2vBio, url: "#" },
  { no: "09", name: "View2Value Convert", category: "Landing · Paid Traffic", year: "2025", blurb: "A landing page tuned for paid traffic and ruthless A/B iteration.", tags: ["CRO", "Landing"], image: v2vConvert, url: "#" },
];

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
          Nine recent engagements across hospitality, ecommerce and high-conversion funnels. Click any card for the case study.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 md:gap-6">
        {projects.map((p, i) => (
          <Reveal
            key={p.no}
            delay={i * 50}
            className={p.span === "wide" ? "lg:col-span-4" : "lg:col-span-2"}
          >
            <button
              onClick={() => setOpen(p)}
              className="group block w-full text-left rounded-xl overflow-hidden border border-border bg-surface/40 hover:border-accent transition-all duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                {/* browser chrome */}
                <div className="absolute top-0 inset-x-0 z-10 flex items-center gap-1.5 px-3 h-7 bg-black/70 backdrop-blur border-b border-white/10">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 px-2 py-0.5 rounded text-[9px] font-mono text-white/70 bg-white/5 border border-white/10 truncate max-w-[60%]">
                    {p.name.toLowerCase().replace(/\s+/g, "")}.com
                  </span>
                </div>
                <img
                  src={p.image}
                  alt={`${p.name} website screenshot — ${p.category}`}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-80" />
                <div className="absolute top-9 left-3 flex items-center gap-2">
                  <span className="font-mono text-[10px] px-2 py-1 rounded bg-black/60 text-white border border-white/10">{p.no}</span>
                  <span className="font-mono text-[10px] px-2 py-1 rounded bg-black/60 text-white border border-white/10">{p.year}</span>
                </div>
                <span className="absolute top-9 right-3 inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent group-hover:rotate-45 transition-all duration-500">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <div className="p-5">
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{p.category}</div>
                <h3 className="mt-2 font-display uppercase leading-[1] text-2xl md:text-3xl group-hover:text-accent transition-colors">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-wider font-mono px-2 py-1 rounded border border-border text-muted-foreground">
                      {t}
                    </span>
                  ))}
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
