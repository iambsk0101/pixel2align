import { EditorPane, Reveal } from "@/components/ide/EditorPane";

const quotes = [
  { q: "Pixel2Align rebuilt our resort site and our direct bookings jumped 38% in the first quarter. Editorial, calm, and obsessively detailed.", a: "Director, Anugraha Bhimtal" },
  { q: "Most designers ship a pretty page. We got positioning, a system, and a measurable lift in conversions. Easy referral.", a: "Founder, View2Value" },
  { q: "Worked with three studios before. None matched this level of taste and rigor. We won't go anywhere else.", a: "Owner, SpaceionDesign" },
];

export function Testimonials() {
  return (
    <EditorPane id="testimonials" lines={22}>
      <div className="font-mono text-sm syntax-comment">/* testimonials.css · words from clients */</div>

      <Reveal>
        <h2 className="mt-6 font-display uppercase leading-[0.9] text-[clamp(2.2rem,7vw,5rem)]">
          Trusted by founders <br /> who <span className="text-accent">don't settle.</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {quotes.map((t, i) => (
          <Reveal key={i} delay={i * 100}>
            <figure className="h-full p-6 md:p-8 rounded-md border border-border bg-surface flex flex-col">
              <div className="text-accent font-display text-5xl leading-none">“</div>
              <blockquote className="mt-4 text-base md:text-lg text-pretty">{t.q}</blockquote>
              <figcaption className="mt-6 font-mono text-xs text-muted-foreground border-t border-border pt-4">
                — {t.a}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </EditorPane>
  );
}
