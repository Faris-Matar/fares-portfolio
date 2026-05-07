import { motion } from "framer-motion";
import { ease } from "@/utils/motion";

/**
 * FadeIn , fades & slides content into view as it enters the viewport.
 */
export default function FadeIn({
  children,
  delay = 0,
  y = 20,
  duration = 0.6,
  className = "",
  as = "div",
  once = true,
}) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10%" }}
      transition={{ duration, ease: ease.primary, delay }}
    >
      {children}
    </MotionTag>
  );
}
