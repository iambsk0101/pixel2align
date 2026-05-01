import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="top" className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">
      {/* ambient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-[blob_14s_ease-in-out_infinite]" />
        <div className="absolute top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-3xl animate-[blob_18s_ease-in-out_infinite]" />
        <div className="absolute inset-0 grain opacity-[0.25]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/60 backdrop-blur text-xs font-medium text-muted-foreground"
        >
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          Available for select projects · 2026
        </motion.div>

        <h1 className="mt-8 text-[clamp(2.6rem,7.5vw,6.75rem)] font-bold leading-[0.95] tracking-tight text-balance">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="block"
          >
            I design experiences
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="block"
          >
            that <span className="italic font-display text-accent">convert</span>
            <span className="text-muted-foreground"> &amp; </span>
            <span className="italic font-display">inspire.</span>
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-8 max-w-xl text-lg md:text-xl text-muted-foreground text-pretty"
        >
          Web &amp; UI Designer crafting premium, conversion-focused websites for
          brands that refuse to look ordinary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-foreground text-background font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            View Work
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-full border border-foreground/20 hover:border-foreground font-medium transition-colors"
          >
            Contact Me
          </a>
        </motion.div>

        {/* stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 border-t border-border pt-10"
        >
          {[
            ["6+", "Years designing"],
            ["40+", "Brands shipped"],
            ["9", "Featured projects"],
            ["100%", "Client retention"],
          ].map(([k, v]) => (
            <div key={v}>
              <div className="text-3xl md:text-4xl font-display font-semibold tracking-tight">{k}</div>
              <div className="mt-1 text-sm text-muted-foreground">{v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
