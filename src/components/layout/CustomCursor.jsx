import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CustomCursor , small filled dot + larger outer ring that lags behind.
 * Hovers detect [data-cursor], a, button, [role=button]; text-cursor detect
 * p, span, h1-h6, li.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState("default"); // default | hover | text
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Outer ring lags
  const ringX = useSpring(x, { damping: 28, stiffness: 280, mass: 0.6 });
  const ringY = useSpring(y, { damping: 28, stiffness: 280, mass: 0.6 });

  useEffect(() => {
    const isFinePointer = window.matchMedia?.("(pointer: fine)").matches;
    if (!isFinePointer) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target;
      if (!(target instanceof Element)) return;

      if (
        target.closest(
          "a, button, [role=button], [data-cursor='hover'], .project-card"
        )
      ) {
        setVariant("hover");
      } else if (
        target.closest("p, h1, h2, h3, h4, h5, h6, span, li, [data-cursor='text']")
      ) {
        setVariant("text");
      } else {
        setVariant("default");
      }
    };

    const onLeave = () => setVariant("default");

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const dotScale = variant === "hover" ? 0 : variant === "text" ? 0 : 1;
  const ringScale = variant === "hover" ? 2 : variant === "text" ? 1 : 1;
  const ringBg =
    variant === "hover" ? "rgba(255, 107, 43, 0.20)" : "rgba(255, 107, 43, 0)";
  const ringWidth = variant === "text" ? 28 : 36;
  const ringHeight = variant === "text" ? 1.5 : 36;
  const ringRadius = variant === "text" ? 1 : 999;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: ringWidth,
            height: ringHeight,
            scale: ringScale,
            backgroundColor: ringBg,
            borderRadius: ringRadius,
          }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            border: "1.5px solid rgba(255, 107, 43, 0.4)",
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{ scale: dotScale }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            backgroundColor: "#FF6B2B",
          }}
        />
      </motion.div>
    </>
  );
}
