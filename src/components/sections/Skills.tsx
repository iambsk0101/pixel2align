import { EditorPane, Reveal } from "@/components/ide/EditorPane";

const skills = {
  design: ["Figma", "Framer", "Webflow", "Adobe XD", "Photoshop", "Illustrator"],
  craft: ["UI Design", "Web Design", "Brand Identity", "Design Systems", "Prototyping", "Motion"],
  strategy: ["Conversion Strategy", "User Research", "Information Architecture", "A/B Testing"],
  build: ["HTML / CSS", "Tailwind", "Shopify", "WordPress", "No-code stacks"],
};

export function Skills() {
  return (
    <EditorPane id="skills" lines={28}>
      <div className="font-mono text-sm syntax-comment">// skills.json</div>

      <Reveal>
        <h2 className="mt-6 font-display uppercase leading-[0.9] text-[clamp(2.2rem,7vw,5rem)]">
          The toolkit, <span className="text-accent">honed.</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid md:grid-cols-2 gap-6 font-mono text-sm">
        {Object.entries(skills).map(([cat, items], i) => (
          <Reveal key={cat} delay={i * 80}>
            <div className="rounded-md border border-border bg-surface p-6">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
                <span className="syntax-keyword">"</span>
                <span className="syntax-fn">{cat}</span>
                <span className="syntax-keyword">"</span>: [
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded border border-border bg-background hover:border-accent hover:text-accent transition-colors"
                  >
                    <span className="syntax-string">"{s}"</span>
                  </span>
                ))}
              </div>
              <div className="mt-4 syntax-keyword">],</div>
            </div>
          </Reveal>
        ))}
      </div>
    </EditorPane>
  );
}
