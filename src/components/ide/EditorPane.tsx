import { useEffect, useRef } from "react";

/** Editor pane wrapper: line-number gutter + content. */
export function EditorPane({
  id,
  lineStart = 1,
  lines,
  children,
}: {
  id?: string;
  lineStart?: number;
  lines: number;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="bg-editor">
      <div className="grid grid-cols-[56px_1fr] md:grid-cols-[72px_1fr]">
        <div
          aria-hidden
          className="font-mono text-xs text-muted-foreground/50 text-right pr-3 pt-10 pb-16 select-none border-r border-border"
        >
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="leading-7">
              {lineStart + i}
            </div>
          ))}
        </div>
        <div className="px-6 md:px-10 py-10 pb-16">{children}</div>
      </div>
    </section>
  );
}

/** Reveal on scroll (no framer overhead). */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Already visible: skip animation entirely
    if (rect.top < window.innerHeight && rect.bottom > 0) return;
    el.classList.add("reveal-hidden");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.remove("reveal-hidden"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
