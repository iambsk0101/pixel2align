import { useEffect, useRef } from "react";

type GridOptions = {
  cellSize: number;
  radius: number;
  holdTime: number;
  fadeDuration: number;
  maxOpacity: number;
  pulseSpeed: number;
};

const GRID_OPTIONS: GridOptions = {
  cellSize: 60,
  radius: 160,
  holdTime: 300,
  fadeDuration: 700,
  maxOpacity: 0.6,
  pulseSpeed: 700,
};

const INK_COLORS = ["#FFCBE1", "#D6E5BD", "#F9E1A8", "#BCD8EC", "#DCCCEC", "#FFDAB4"];

type Ink = { x: number; y: number; vx: number; vy: number; age: number; life: number; size: number; color: string };

/** Low-cost canvas glow grid. Its animation sleeps whenever the pointer trail has faded. */
export function CursorGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;
    let offsetX = 0;
    let offsetY = 0;
    let brightness = new Float32Array(0);
    let strengths = new Float32Array(0);
    let touchedAt = new Float64Array(0);
    const dirty = new Set<number>();
    const pulses: { x: number; y: number; radius: number; time: number }[] = [];
    let raf = 0;
    let previousFrame = 0;
    let color = "oklch(0.9 0.02 80)";

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(width / GRID_OPTIONS.cellSize);
      rows = Math.ceil(height / GRID_OPTIONS.cellSize);
      offsetX = (width - columns * GRID_OPTIONS.cellSize) / 2;
      offsetY = (height - rows * GRID_OPTIONS.cellSize) / 2;
      const count = columns * rows;
      brightness = new Float32Array(count);
      strengths = new Float32Array(count);
      touchedAt = new Float64Array(count);
      dirty.clear();
      ctx.clearRect(0, 0, width, height);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const brightenNear = (x: number, y: number, amount: number, now: number) => {
      const reach = GRID_OPTIONS.radius + GRID_OPTIONS.cellSize;
      const minCol = Math.max(0, Math.floor((x - reach - offsetX) / GRID_OPTIONS.cellSize));
      const maxCol = Math.min(columns - 1, Math.ceil((x + reach - offsetX) / GRID_OPTIONS.cellSize));
      const minRow = Math.max(0, Math.floor((y - reach - offsetY) / GRID_OPTIONS.cellSize));
      const maxRow = Math.min(rows - 1, Math.ceil((y + reach - offsetY) / GRID_OPTIONS.cellSize));
      for (let row = minRow; row <= maxRow; row += 1) {
        for (let col = minCol; col <= maxCol; col += 1) {
          const id = row * columns + col;
          const cx = offsetX + col * GRID_OPTIONS.cellSize + GRID_OPTIONS.cellSize / 2;
          const cy = offsetY + row * GRID_OPTIONS.cellSize + GRID_OPTIONS.cellSize / 2;
          const distance = Math.hypot(cx - x, cy - y);
          if (distance > GRID_OPTIONS.radius) continue;
          const t = 1 - distance / GRID_OPTIONS.radius;
          const falloff = t * t * (3 - 2 * t);
          const next = amount * falloff;
          const current = now - touchedAt[id] < GRID_OPTIONS.holdTime
            ? strengths[id] * Math.max(0, 1 - Math.max(0, now - touchedAt[id] - GRID_OPTIONS.holdTime) / GRID_OPTIONS.fadeDuration)
            : 0;
          strengths[id] = Math.max(current, next);
          brightness[id] = strengths[id];
          touchedAt[id] = now;
          dirty.add(id);
        }
      }
    };

    function draw(now: number) {
      raf = 0;
      const delta = previousFrame ? Math.min(50, now - previousFrame) : 16;
      previousFrame = now;
      const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      if (accent) color = accent;
      ctx.clearRect(0, 0, width, height);

      for (let p = pulses.length - 1; p >= 0; p -= 1) {
        const pulse = pulses[p];
        pulse.radius += GRID_OPTIONS.pulseSpeed * delta / 1000;
        if (pulse.radius > Math.hypot(width, height) + GRID_OPTIONS.cellSize) {
          pulses.splice(p, 1);
          continue;
        }
        brightenNear(pulse.x, pulse.y, 0, now);
        const minCol = Math.max(0, Math.floor((pulse.x - pulse.radius - GRID_OPTIONS.cellSize - offsetX) / GRID_OPTIONS.cellSize));
        const maxCol = Math.min(columns - 1, Math.ceil((pulse.x + pulse.radius + GRID_OPTIONS.cellSize - offsetX) / GRID_OPTIONS.cellSize));
        const minRow = Math.max(0, Math.floor((pulse.y - pulse.radius - GRID_OPTIONS.cellSize - offsetY) / GRID_OPTIONS.cellSize));
        const maxRow = Math.min(rows - 1, Math.ceil((pulse.y + pulse.radius + GRID_OPTIONS.cellSize - offsetY) / GRID_OPTIONS.cellSize));
        for (let row = minRow; row <= maxRow; row += 1) {
          for (let col = minCol; col <= maxCol; col += 1) {
            const id = row * columns + col;
            const cx = offsetX + col * GRID_OPTIONS.cellSize + GRID_OPTIONS.cellSize / 2;
            const cy = offsetY + row * GRID_OPTIONS.cellSize + GRID_OPTIONS.cellSize / 2;
            if (Math.abs(Math.hypot(cx - pulse.x, cy - pulse.y) - pulse.radius) < GRID_OPTIONS.cellSize * 0.65) {
              strengths[id] = 1;
              brightness[id] = 1;
              touchedAt[id] = now;
              dirty.add(id);
            }
          }
        }
      }

      let stillVisible = pulses.length > 0;
      for (const id of dirty) {
        const elapsed = now - touchedAt[id] - GRID_OPTIONS.holdTime;
        const value = elapsed <= 0 ? strengths[id] : strengths[id] * Math.max(0, 1 - elapsed / GRID_OPTIONS.fadeDuration);
        brightness[id] = value;
        if (value <= 0.005) {
          dirty.delete(id);
          continue;
        }
        stillVisible = true;
        const col = id % columns;
        const row = Math.floor(id / columns);
        const x = offsetX + col * GRID_OPTIONS.cellSize + 2;
        const y = offsetY + row * GRID_OPTIONS.cellSize + 2;
        const size = GRID_OPTIONS.cellSize - 4;
        const glow = ctx.createRadialGradient(x + size / 2, y + size / 2, 0, x + size / 2, y + size / 2, size * 0.72);
        glow.addColorStop(0, color);
        glow.addColorStop(1, "transparent");
        ctx.globalAlpha = value * GRID_OPTIONS.maxOpacity;
        ctx.strokeStyle = glow;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(x, y, size, size, 4);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (stillVisible) wake();
      else previousFrame = 0;
    }

    const onMove = (event: PointerEvent) => {
      brightenNear(event.clientX, event.clientY, 1, performance.now());
      wake();
    };
    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      pulses.push({ x: event.clientX, y: event.clientY, radius: 0, time: performance.now() });
      if (pulses.length > 3) pulses.shift();
      wake();
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.documentElement);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="cursor-grid-layer" />;
}

/** Soft pastel ink trail that supports mouse, pen, and touch pointers. */
export function FluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let lastFrame = 0;
    let lastPoint: { x: number; y: number } | null = null;
    let lastColorAt = 0;
    let color = INK_COLORS[0];
    const inks: Ink[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    const pickColor = (now: number) => {
      if (now - lastColorAt > 100) {
        color = INK_COLORS[Math.floor(Math.random() * INK_COLORS.length)];
        lastColorAt = now;
      }
      return color;
    };
    const addInk = (x: number, y: number, vx: number, vy: number, burst = false) => {
      const now = performance.now();
      const palette = pickColor(now);
      const force = burst ? 10 : 1;
      const count = burst ? 8 : 1;
      for (let i = 0; i < count; i += 1) {
        const angle = Math.atan2(vy, vx) + (Math.random() - 0.5) * (burst ? 2.8 : 0.42);
        const speed = (burst ? 90 + Math.random() * 250 : Math.min(180, Math.hypot(vx, vy) * 0.35)) * force;
        inks.push({
          x: x + (burst ? (Math.random() - 0.5) * 12 : 0),
          y: y + (burst ? (Math.random() - 0.5) * 12 : 0),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          age: 0,
          life: burst ? 1.8 : 1.35,
          size: burst ? 16 + Math.random() * 22 : 12 + Math.min(26, Math.hypot(vx, vy) * 0.055),
          color: palette,
        });
      }
      if (inks.length > 90) inks.splice(0, inks.length - 90);
      wake();
    };

    function render(now: number) {
      raf = 0;
      const dt = lastFrame ? Math.min(0.04, (now - lastFrame) / 1000) : 0.016;
      lastFrame = now;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen";
      for (let i = inks.length - 1; i >= 0; i -= 1) {
        const ink = inks[i];
        ink.age += dt;
        if (ink.age >= ink.life) {
          inks.splice(i, 1);
          continue;
        }
        ink.x += ink.vx * dt;
        ink.y += ink.vy * dt;
        ink.vx *= Math.pow(0.94, dt * 60);
        ink.vy *= Math.pow(0.94, dt * 60);
        const progress = ink.age / ink.life;
        const radius = ink.size * (0.7 + progress * 0.85);
        const fade = Math.min(0.42, Math.exp(-ink.age * 2.1) * 0.48);
        const gradient = ctx.createRadialGradient(ink.x, ink.y, 0, ink.x, ink.y, radius);
        gradient.addColorStop(0, `${ink.color}cc`);
        gradient.addColorStop(0.28, `${ink.color}88`);
        gradient.addColorStop(1, `${ink.color}00`);
        ctx.globalAlpha = fade;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(ink.x, ink.y, radius * 1.3, radius * 0.75, Math.atan2(ink.vy, ink.vx), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      if (inks.length > 0) wake();
      else lastFrame = 0;
    }

    const onMove = (event: PointerEvent) => {
      const point = { x: event.clientX, y: event.clientY };
      if (lastPoint) {
        const dx = point.x - lastPoint.x;
        const dy = point.y - lastPoint.y;
        if (Math.hypot(dx, dy) > 2) addInk(point.x, point.y, dx * 60, dy * 60);
      }
      lastPoint = point;
    };
    const onDown = (event: PointerEvent) => {
      lastPoint = { x: event.clientX, y: event.clientY };
      addInk(event.clientX, event.clientY, 0, 0, true);
    };
    const onUp = () => { lastPoint = null; };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      inks.length = 0;
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="fluid-cursor-layer" />;
}