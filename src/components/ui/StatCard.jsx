import { motion } from "framer-motion";
import { ease } from "@/utils/motion";

/**
 * StatCard, gradient surface, orange top border, soft text glow.
 * Figure scales fluidly to prevent overflow.
 */
export default function StatCard({ figure, label, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.6,
        ease: ease.primary,
        delay: index * 0.08,
      }}
      className="group rounded transition-all duration-fast ease-out-quart"
      style={{
        background: "linear-gradient(135deg, #0A1628 0%, #0D1E32 100%)",
        border: "1px solid rgba(255, 107, 43, 0.2)",
        borderTop: "2px solid #FF6B2B",
        padding: "20px 18px",
        minWidth: 0,
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 107, 43, 0.5)";
        e.currentTarget.style.borderTop = "2px solid #FF6B2B";
        e.currentTarget.style.boxShadow = "0 0 30px rgba(255, 107, 43, 0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 107, 43, 0.2)";
        e.currentTarget.style.borderTop = "2px solid #FF6B2B";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="font-mono text-primary mb-2 leading-tight"
        style={{
          fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
          textShadow: "0 0 20px rgba(255, 107, 43, 0.3)",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "normal",
        }}
      >
        {figure}
      </div>
      <div
        className="font-sans text-text-muted"
        style={{
          fontSize: 13,
          lineHeight: 1.5,
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}
