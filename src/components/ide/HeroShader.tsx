import { useEffect, useRef } from "react";

/**
 * Lightweight WebGL fragment-shader background for the hero.
 * Pure WebGL (no three.js) — single full-screen quad with a subtle
 * pointer-aware flowing-noise distortion that picks up the accent color.
 * Falls back to nothing if WebGL is unavailable.
 */
export function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true, premultipliedAlpha: true });
    if (!gl) return;

    const vs = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
    const fs = `
      precision mediump float;
      uniform vec2 u_res;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec3 u_accent;

      // 2D simplex-ish noise (cheap)
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float noise(vec2 p){
        vec2 i = floor(p); vec2 f = fract(p);
        float a = hash(i); float b = hash(i + vec2(1.0,0.0));
        float c = hash(i + vec2(0.0,1.0)); float d = hash(i + vec2(1.0,1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
      }
      float fbm(vec2 p){
        float v = 0.0; float a = 0.5;
        for(int i=0;i<5;i++){ v += a * noise(p); p *= 2.02; a *= 0.5; }
        return v;
      }

      void main(){
        vec2 uv = (gl_FragCoord.xy - 0.5*u_res) / min(u_res.x, u_res.y);
        vec2 m = (u_mouse - 0.5*u_res) / min(u_res.x, u_res.y);

        float t = u_time * 0.06;
        vec2 q = uv * 1.6;
        q += 0.35 * vec2(fbm(q + t), fbm(q - t));
        float n = fbm(q + t * 0.7);

        // pointer-aware glow
        float d = length(uv - m * 0.85);
        float glow = smoothstep(0.9, 0.0, d) * 0.55;

        // base ambient color (dark)
        vec3 base = vec3(0.04, 0.05, 0.08);
        // accent ribbons
        float ribbon = smoothstep(0.42, 0.62, n) - smoothstep(0.62, 0.85, n);
        vec3 col = base + u_accent * ribbon * 0.55;
        col += u_accent * glow * 0.6;

        // subtle vignette
        float vign = smoothstep(1.3, 0.3, length(uv));
        col *= mix(0.6, 1.0, vign);

        // soft grain
        float g = (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.04;
        col += g;

        // overall alpha (so the canvas blends with bg/text)
        gl_FragColor = vec4(col, 0.85);
      }
    `;

    const compile = (src: string, type: number) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(vs, gl.VERTEX_SHADER));
    gl.attachShader(prog, compile(fs, gl.FRAGMENT_SHADER));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uAccent = gl.getUniformLocation(prog, "u_accent");

    let raf = 0;
    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };
    const start = performance.now();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const accent = { r: 0.96, g: 0.62, b: 0.04 }; // matches amber accent
    const readAccent = () => {
      try {
        const c = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
        // expect oklch or hsl or hex. We just use a fixed warm tint per theme.
        if (document.documentElement.classList.contains("light")) {
          accent.r = 0.95; accent.g = 0.45; accent.b = 0.05;
        } else {
          accent.r = 0.99; accent.g = 0.68; accent.b = 0.12;
        }
        // silence unused
        void c;
      } catch {}
    };
    readAccent();
    const themeObserver = new MutationObserver(readAccent);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      targetMouse = { x: canvas.width / 2, y: canvas.height / 2 };
      mouse = { ...targetMouse };
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      targetMouse.x = (e.clientX - r.left) * dpr;
      targetMouse.y = (r.height - (e.clientY - r.top)) * dpr;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const loop = () => {
      mouse.x += (targetMouse.x - mouse.x) * 0.06;
      mouse.y += (targetMouse.y - mouse.y) * 0.06;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform3f(uAccent, accent.r, accent.g, accent.b);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 w-full h-full opacity-70 mix-blend-screen"
    />
  );
}
