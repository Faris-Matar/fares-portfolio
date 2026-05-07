import { useEffect, useRef } from "react";

/**
 * GlobalBackground, fixed atmosphere layer behind everything.
 *
 *   - Layer 1: a faint dot grid (SVG) for depth and texture
 *   - Layer 2: a canvas with 5 radial-gradient orbs that drift with
 *              scroll progress and slow oscillation
 *   - Layer 3: a horizontal "scan line" drifting top to bottom on a
 *              loop, desktop only
 */
export default function GlobalBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const scale = isMobile ? 0.5 : 1;

    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    /* baseStart / baseEnd are normalised 0..1 viewport positions
       interpolated by total document scroll progress. */
    const orbs = [
      {
        color: "255, 107, 43",
        opacity: 0.04 * scale,
        radius: 400,
        baseStart: { x: 0.75, y: 0.4 },
        baseEnd: { x: 0.2, y: 0.6 },
        oscX: 30,
        oscY: 20,
        oscDur: 9,
        phase: 0,
      },
      {
        color: "255, 179, 71",
        opacity: 0.03 * scale,
        radius: 300,
        baseStart: { x: 0.1, y: 0.8 },
        baseEnd: { x: 0.85, y: 0.3 },
        oscX: 30,
        oscY: 20,
        oscDur: 11,
        phase: Math.PI * 0.5,
      },
      {
        color: "255, 61, 0",
        opacity: 0.02 * scale,
        radius: 500,
        baseStart: { x: 0.5, y: 0.85 },
        baseEnd: { x: 0.5, y: 0.85 },
        oscX: 25,
        oscY: 18,
        oscDur: 12,
        phase: Math.PI,
      },
      /* New orange orb — slow left-right drift at fixed y */
      {
        color: "255, 107, 43",
        opacity: 0.025 * scale,
        radius: 250,
        baseStart: { x: 0.15, y: 0.4 },
        baseEnd: { x: 0.85, y: 0.4 },
        oscX: 0,
        oscY: 0,
        oscDur: 10,
        phase: 0,
        /* This orb gets driven by an internal sine on its own clock,
           independent of scroll, by overriding x/y in the loop. */
        independent: true,
      },
      /* Cool blue orb anchored bottom centre */
      {
        color: "13, 48, 96",
        opacity: 0.08 * scale,
        radius: 600,
        baseStart: { x: 0.5, y: 0.95 },
        baseEnd: { x: 0.5, y: 0.95 },
        oscX: 30,
        oscY: 12,
        oscDur: 14,
        phase: 0.4,
      },
    ];

    const lerp = (a, b, t) => a + (b - a) * t;

    let raf = 0;
    let running = true;
    const startTime = performance.now();

    const draw = () => {
      if (!running) return;
      const t = (performance.now() - startTime) / 1000;

      const docHeight = Math.max(
        document.body.scrollHeight - window.innerHeight,
        1
      );
      const scrollY =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (const o of orbs) {
        let x;
        let y;
        if (o.independent) {
          /* Drift purely on internal sine, not scroll driven */
          const tt = (Math.sin((t / o.oscDur) * Math.PI * 2) + 1) / 2;
          x = lerp(o.baseStart.x, o.baseEnd.x, tt) * w;
          y = o.baseStart.y * h;
        } else {
          const baseX = lerp(o.baseStart.x, o.baseEnd.x, progress) * w;
          const baseY = lerp(o.baseStart.y, o.baseEnd.y, progress) * h;
          const angle = (t / o.oscDur) * Math.PI * 2 + o.phase;
          x = baseX + Math.cos(angle) * o.oscX;
          y = baseY + Math.sin(angle) * o.oscY;
        }

        const grad = ctx.createRadialGradient(x, y, 0, x, y, o.radius);
        grad.addColorStop(0, `rgba(${o.color}, ${o.opacity})`);
        grad.addColorStop(1, `rgba(${o.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, o.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {/* Layer 1: dot grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="bg-dot-grid"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="20"
              cy="20"
              r="0.8"
              fill="rgba(240, 244, 248, 0.025)"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-dot-grid)" />
      </svg>

      {/* Layer 2: orb canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      />

      {/* Layer 3: horizontal scan line (desktop only) */}
      <div className="bg-scan-line hidden lg:block" />

      <style>{`
        .bg-scan-line {
          position: absolute;
          left: 0;
          right: 0;
          top: 30%;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 107, 43, 0.06) 20%,
            rgba(255, 107, 43, 0.06) 80%,
            transparent
          );
          animation: bg-scan 12s linear infinite;
          will-change: transform;
        }
        @keyframes bg-scan {
          0% { transform: translateY(0); }
          99.999% { transform: translateY(60vh); }
          100% { transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg-scan-line { animation: none; }
        }
      `}</style>
    </div>
  );
}
