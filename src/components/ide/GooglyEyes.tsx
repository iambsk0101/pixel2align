import { useEffect, useRef } from "react";

export function GooglyEyes() {
  const sceneRef = useRef<HTMLSpanElement>(null);
  const leftEyeRef = useRef<HTMLSpanElement>(null);
  const rightEyeRef = useRef<HTMLSpanElement>(null);
  const leftPupilRef = useRef<HTMLSpanElement>(null);
  const rightPupilRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const eyes = [leftEyeRef.current, rightEyeRef.current];
    const pupils = [leftPupilRef.current, rightPupilRef.current];
    if (!scene || eyes.some((eye) => !eye) || pupils.some((pupil) => !pupil)) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onMove = (event: PointerEvent) => {
      eyes.forEach((eye, index) => {
        const pupil = pupils[index];
        if (!eye || !pupil) return;
        const bounds = eye.getBoundingClientRect();
        const dx = event.clientX - (bounds.left + bounds.width / 2);
        const dy = event.clientY - (bounds.top + bounds.height / 2);
        const distance = Math.hypot(dx, dy) || 1;
        const travel = Math.min(bounds.width * 0.25, distance / 8);
        pupil.style.transform = `translate(calc(-50% + ${(dx / distance) * travel}px), calc(-50% + ${(dy / distance) * travel}px))`;
      });
    };

    let blinkTimer = 0;
    const blink = () => {
      eyes.forEach((eye) => eye?.classList.add("googly-eye-blink"));
      window.setTimeout(() => eyes.forEach((eye) => eye?.classList.remove("googly-eye-blink")), 150);
    };
    if (!reducedMotion) {
      window.addEventListener("pointermove", onMove, { passive: true });
      blinkTimer = window.setInterval(blink, 3000);
    }

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.clearInterval(blinkTimer);
    };
  }, []);

  return (
    <span ref={sceneRef} className="googly-eyes" aria-hidden="true">
      <span ref={leftEyeRef} className="googly-eye"><span ref={leftPupilRef} className="googly-pupil" /></span>
      <span ref={rightEyeRef} className="googly-eye"><span ref={rightPupilRef} className="googly-pupil" /></span>
    </span>
  );
}