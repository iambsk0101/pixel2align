import { Reveal } from "@/components/Reveal";

type Project = {
  name: string;
  category: string;
  blurb: string;
  url: string;
  hue: string; // gradient stops
  year: string;
};

const projects: Project[] = [
  { name: "Anugraha Bhimtal", category: "Hospitality · Luxury Resort", blurb: "An editorial resort site that turns lakeside calm into bookings.", url: "#", hue: "from-amber-200 to-orange-400", year: "2025" },
  { name: "Dilip's Retreat", category: "Hospitality · Resort", blurb: "Warm, story-led design for a mountain retreat brand.", url: "#", hue: "from-rose-200 to-amber-300", year: "2025" },
  { name: "The Moonlight Homestay", category: "Hospitality · Homestay", blurb: "Intimate, image-first layout that sells the experience first.", url: "#", hue: "from-indigo-300 to-violet-400", year: "2024" },
  { name: "SpaceionDesign", category: "Branding · Interior Design", blurb: "Luxury identity & website for a high-end interior studio.", url: "#", hue: "from-stone-300 to-zinc-500", year: "2024" },
  { name: "Adibaba Travels", category: "Travel · Booking", blurb: "A fast, trustworthy travel site built around clear CTAs.", url: "#", hue: "from-sky-300 to-teal-400", year: "2024" },
  { name: "PH Store", category: "Ecommerce", blurb: "A polished storefront engineered for repeat purchase.", url: "#", hue: "from-fuchsia-300 to-pink-500", year: "2024" },
  { name: "View2Value", category: "Business · SaaS", blurb: "A confident business site that positions value, not features.", url: "#", hue: "from-blue-300 to-indigo-500", year: "2025" },
  { name: "View2Value Bio", category: "Funnel · Bio Link", blurb: "A bio link funnel optimised for one click, one outcome.", url: "#", hue: "from-emerald-300 to-teal-500", year: "2025" },
  { name: "View2Value Convert", category: "Landing · Conversion", blurb: "A conversion landing page tuned for paid traffic.", url: "#", hue: "from-orange-300 to-red-500", year: "2025" },
];

export function Work() {
  return (
    <section id="work" className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <Reveal>
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">✦ Selected Work</div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-balance">
                Brands designed to <span className="italic font-display text-accent">perform.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="max-w-sm text-muted-foreground">
              A glimpse at recent projects across hospitality, ecommerce and
              high-conversion funnels.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 80}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="group relative block overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
    >
      <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${project.hue}`}>
        <div className="absolute inset-0 grain opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-[12vw] md:text-[7vw] font-bold text-foreground/10 select-none transition-transform duration-700 group-hover:scale-110">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="absolute top-5 left-5 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur text-[11px] font-medium">
            {project.category}
          </span>
        </div>
        <div className="absolute top-5 right-5 text-xs font-mono text-foreground/70">
          {project.year}
        </div>
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
          <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight">
            {project.name}
          </h3>
          <span className="shrink-0 inline-flex items-center justify-center h-11 w-11 rounded-full bg-foreground text-background transition-transform duration-500 group-hover:rotate-45">
            ↗
          </span>
        </div>
      </div>
      <div className="p-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground max-w-md text-pretty">
          {project.blurb}
        </p>
        <span className="text-xs font-medium uppercase tracking-wider story-link">View Website</span>
      </div>
    </a>
  );
}
