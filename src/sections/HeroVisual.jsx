import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";

/* Hexagon path generator, regular hexagon centred at (cx,cy) with radius r */
function hexPath(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return (
    "M " +
    pts.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(" L ") +
    " Z"
  );
}

const VB_W = 600;
const VB_H = 800;
const CX = 360;
const CY = 400;
const HEX_OUTER = 200;
const HEX_INNER = 130;

const PARTICLES = [
  { cx: 180, cy: 200, dur: 4.2, dy: 28, phase: 0 },
  { cx: 480, cy: 260, dur: 5.6, dy: 38, phase: 0.3 },
  { cx: 220, cy: 580, dur: 3.4, dy: 18, phase: 0.6 },
  { cx: 460, cy: 600, dur: 6.0, dy: 32, phase: 0.9 },
];

export default function HeroVisual() {
  const wrapRef = useRef(null);
  const outerHexRef = useRef(null);
  const innerHexRef = useRef(null);
  const particlesRef = useRef([]);

  /* Mouse parallax */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 60, stiffness: 100 });
  const sy = useSpring(my, { damping: 60, stiffness: 100 });
  const hexX = useTransform(sx, (v) => v * 0.015);
  const hexY = useTransform(sy, (v) => v * 0.015);
  const dotX = useTransform(sx, (v) => v * 0.008);
  const dotY = useTransform(sy, (v) => v * 0.008);
  const partX = useTransform(sx, (v) => v * 0.03);
  const partY = useTransform(sy, (v) => v * 0.03);

  useEffect(() => {
    const onMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set(e.clientX - w / 2);
      my.set(e.clientY - h / 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(outerHexRef.current, {
        rotation: 360,
        transformOrigin: "center",
        duration: 40,
        repeat: -1,
        ease: "none",
      });
      gsap.to(innerHexRef.current, {
        rotation: -360,
        transformOrigin: "center",
        duration: 40,
        repeat: -1,
        ease: "none",
      });
      particlesRef.current.forEach((el, i) => {
        if (!el) return;
        const p = PARTICLES[i];
        gsap.to(el, {
          y: -p.dy,
          duration: p.dur,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: p.phase,
        });
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden
    >
      {/* Dot grid layer */}
      <motion.svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        style={{ x: dotX, y: dotY }}
      >
        <defs>
          <pattern
            id="hero-dot-grid"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="20" r="2" fill="rgba(255, 107, 43, 0.08)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dot-grid)" />
      </motion.svg>

      {/* Hexagon layer */}
      <motion.svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
        style={{ x: hexX, y: hexY }}
      >
        {/* Diagonal accent lines */}
        <g stroke="rgba(255, 179, 71, 0.1)" strokeWidth="0.5" fill="none">
          <line x1={CX - 240} y1={CY - 200} x2={CX + 240} y2={CY + 200} />
          <line x1={CX - 240} y1={CY + 100} x2={CX + 240} y2={CY - 100} />
          <line x1={CX - 200} y1={CY + 240} x2={CX + 200} y2={CY - 240} />
        </g>
        {/* Outer hex */}
        <g ref={outerHexRef}>
          <path
            d={hexPath(CX, CY, HEX_OUTER)}
            fill="none"
            stroke="rgba(255, 107, 43, 0.15)"
            strokeWidth="1"
          />
        </g>
        {/* Inner hex */}
        <g ref={innerHexRef}>
          <path
            d={hexPath(CX, CY, HEX_INNER)}
            fill="none"
            stroke="rgba(255, 107, 43, 0.08)"
            strokeWidth="1"
          />
        </g>
      </motion.svg>

      {/* Floating particles layer */}
      <motion.svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
        style={{ x: partX, y: partY }}
      >
        {PARTICLES.map((p, i) => (
          <circle
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            cx={p.cx}
            cy={p.cy}
            r="4"
            fill="#FF6B2B"
            opacity="0.6"
          />
        ))}
      </motion.svg>
    </div>
  );
}
