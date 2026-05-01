import { EditorPane, Reveal } from "@/components/ide/EditorPane";

export function About() {
  return (
    <EditorPane id="about" lines={26} lineStart={1}>
      <div className="font-mono text-sm">
        <div className="syntax-comment">{"<!-- about.html · who is behind Pixel2Align -->"}</div>
        <div className="mt-2">
          <span className="syntax-tag">{"<section "}</span>
          <span className="syntax-fn">class</span>
          <span className="syntax-comment">=</span>
          <span className="syntax-string">"about"</span>
          <span className="syntax-tag">{">"}</span>
        </div>
      </div>

      <Reveal>
        <h2 className="mt-8 font-display uppercase leading-[0.9] text-[clamp(2.4rem,7vw,5.5rem)]">
          A studio for brands
          <br />
          that refuse to look
          <br />
          <span className="text-accent">ordinary.</span>
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-12 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6 text-lg text-muted-foreground text-pretty">
            <p>
              Pixel2Align is a one-designer studio working at the intersection of editorial
              design, product thinking, and conversion strategy. Six years in, we've shipped 40+
              websites for hospitality, ecommerce, and ambitious founders.
            </p>
            <p>
              We don't ship templates. Every project starts with a positioning workshop, a custom
              type system, and a layout grid built for the brand — not for the framework.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-md border border-border bg-surface p-6 font-mono text-sm">
              <div className="syntax-comment">// principles.json</div>
              <pre className="mt-3 whitespace-pre-wrap leading-7">
{`{
  "`}<span className="syntax-keyword">restraint</span>{`":   `}<span className="syntax-string">"every pixel earns its place"</span>{`,
  "`}<span className="syntax-keyword">hierarchy</span>{`":   `}<span className="syntax-string">"typography does the work"</span>{`,
  "`}<span className="syntax-keyword">motion</span>{`":      `}<span className="syntax-string">"intentional, never decorative"</span>{`,
  "`}<span className="syntax-keyword">conversion</span>{`":  `}<span className="syntax-string">"design informed by data"</span>{`
}`}
              </pre>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-10 font-mono text-sm syntax-tag">{"</section>"}</div>
    </EditorPane>
  );
}
