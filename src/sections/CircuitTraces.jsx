import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";

/**
 * Animated SVG circuit traces, drawn on load via strokeDashoffset.
 * Mouse-parallax shifts the layer up to 12px in cursor direction.
 * Mobile shows fewer traces at the same opacity.
 */

/* Primary traces, thicker + brighter */
const PRIMARY = [
  "M 40 120 L 320 120 L 320 220 L 600 220 L 600 320",
  "M 40 320 L 200 320 L 200 480 L 520 480 L 520 600",
  "M 700 80 L 700 240 L 940 240 L 940 360 L 1180 360",
  "M 80 700 L 360 700 L 360 820 L 720 820",
  "M 1100 60 L 1100 180 L 880 180 L 880 320 L 1080 320",
  "M 1240 460 L 1080 460 L 1080 660 L 820 660 L 820 780",
  "M 240 880 L 460 880 L 460 760 L 640 760",
  "M 60 540 L 140 540 L 140 620",
  "M 1180 880 L 980 880 L 980 740 L 1240 740",
  "M 720 940 L 940 940 L 940 1020",
];

/* Secondary, thinner, fill the right half + corners */
const SECONDARY = [
  "M 1240 60 L 1240 220",
  "M 1100 460 L 1100 640",
  "M 800 60 L 800 140 L 1020 140",
  "M 480 60 L 480 200",
  "M 60 220 L 200 220",
  "M 660 360 L 660 520 L 820 520",
  "M 240 600 L 240 760",
  "M 1020 920 L 1020 1020",
];

const NODES = [
  [320, 120], [600, 220], [600, 320], [200, 320], [520, 480],
  [700, 240], [940, 240], [940, 360], [1180, 360],
  [360, 700], [720, 820], [1100, 180], [880, 320], [1080, 320],
  [1080, 460], [1080, 660], [820, 660], [460, 880], [980, 880], [980, 740],
  [1240, 740], [140, 540], [800, 140], [1020, 140], [660, 520], [820, 520],
];

const MOBILE_PRIMARY = PRIMARY.slice(0, 4);
const MOBILE_NODES = NODES.slice(0, 6);

export default function CircuitTraces() {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);

  /* Parallax */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 50, stiffness: 100 });
  const sy = useSpring(my, { damping: 50, stiffness: 100 });
  const tx = useTransform(sx, (v) => v * 12);
  const ty = useTransform(sy, (v) => v * 12);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const svg = svgRef.current;
      if (!svg) return;

      const primaryPaths = svg.querySelectorAll("path[data-primary]");
      const secondaryPaths = svg.querySelectorAll("path[data-secondary]");
      const total = primaryPaths.length;

      primaryPaths.forEach((p, i) => {
        const len = p.getTotalLength?.() || 800;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
        const delay = total > 1 ? (i / (total - 1)) * 2.5 : 0;
        gsap.to(p, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 4,
          delay,
          ease: "power2.out",
        });
      });
      secondaryPaths.forEach((p, i) => {
        const len = p.getTotalLength?.() || 400;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
        gsap.to(p, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 3,
          delay: 1 + i * 0.18,
          ease: "power2.out",
        });
      });

      const nodes = svg.querySelectorAll("circle[data-node]");
      nodes.forEach((n) => {
        gsap.set(n, { opacity: 0, scale: 1, transformOrigin: "center" });
        gsap.to(n, {
          opacity: 0.5,
          duration: 1.4,
          delay: 1.6 + Math.random() * 1.6,
          ease: "power2.out",
        });
        gsap.to(n, {
          scale: 1.6,
          repeat: -1,
          yoyo: true,
          duration: 2,
          delay: 2 + Math.random() * 2,
          ease: "sine.inOut",
        });
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;
  const primaryList = isMobile ? MOBILE_PRIMARY : PRIMARY;
  const secondaryList = isMobile ? [] : SECONDARY;
  const nodeList = isMobile ? MOBILE_NODES : NODES;

  return (
    <motion.div
      ref={wrapRef}
      style={{
        x: tx,
        y: ty,
        filter: "drop-shadow(0 0 6px rgba(255, 107, 43, 0.4))",
      }}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1280 1080"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        {/* Primary, brighter, thicker */}
        <g
          stroke="#FF6B2B"
          strokeWidth="1.5"
          fill="none"
          opacity="0.35"
          strokeLinecap="round"
        >
          {primaryList.map((d, i) => (
            <path key={`p-${i}`} d={d} data-primary />
          ))}
        </g>
        {/* Secondary, thinner */}
        <g
          stroke="#FF6B2B"
          strokeWidth="0.8"
          fill="none"
          opacity="0.22"
          strokeLinecap="round"
        >
          {secondaryList.map((d, i) => (
            <path key={`s-${i}`} d={d} data-secondary />
          ))}
        </g>
        {/* Nodes / via dots */}
        <g fill="#FF6B2B">
          {nodeList.map(([cx, cy], i) => (
            <circle key={i} data-node cx={cx} cy={cy} r="3" />
          ))}
        </g>
      </svg>
    </motion.div>
  );
}
