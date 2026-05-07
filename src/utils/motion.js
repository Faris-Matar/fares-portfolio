/* ============================================================
   Fares Matar Portfolio , Motion System
   Cinematic, controlled, slow. No bounce. No spring.
   ============================================================ */

/* ─── 1. TIMING ─── */
export const duration = {
  fast: 0.25,
  normal: 0.5,
  slow: 0.8,
  hero: 1.2,
};

/* ─── 2. EASING ─── */
// Framer Motion uses cubic bezier arrays.
export const ease = {
  primary: [0.25, 0.1, 0.25, 1], // out-quart , cinematic
  out: [0.33, 1, 0.68, 1],       // soft tail
  in: [0.32, 0, 0.67, 0],
};

/* GSAP ease string (used via gsap.to({ ease: ease.gsap })) */
export const gsapEase = "power2.out";

/* ─── 3. STAGGER ─── */
export const STAGGER = 0.08;

/* ─── 4. VARIANTS ─── */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal, ease: ease.primary },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: ease.primary },
  },
};

export const fadeUpLarge = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.primary },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.primary },
  },
};

export const stagger = (gap = STAGGER, delay = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: gap,
      delayChildren: delay,
    },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: ease.primary },
  },
};

/* Reveal mask , line-by-line clip reveal */
export const revealLine = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { duration: 0.7, ease: ease.primary },
  },
};

/* ─── 5. PAGE TRANSITION ─── */
export const pageTransition = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: duration.fast, ease: ease.primary },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.fast, ease: ease.primary },
  },
};

/* ─── 6. VIEWPORT defaults ─── */
export const viewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -10% 0px",
};

export const viewportEarly = {
  once: true,
  amount: 0.1,
  margin: "0px 0px -5% 0px",
};

/* ─── 7. MICRO-INTERACTIONS ─── */
export const buttonHover = {
  whileHover: {
    scale: 1.02,
    transition: { duration: duration.fast, ease: ease.primary },
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.15, ease: ease.primary },
  },
};
