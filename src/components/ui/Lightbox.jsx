import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/utils/motion";

/**
 * Lightbox, full-screen image overlay.
 * Click outside to close. Close button rotates on hover.
 */
export default function Lightbox({ src, alt, open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: ease.primary }}
          style={{ backgroundColor: "rgba(5, 10, 14, 0.95)" }}
        >
          <button
            className="lightbox-close absolute top-6 right-6 z-10 text-primary text-2xl w-10 h-10 inline-flex items-center justify-center transition-transform duration-300 ease-out-quart"
            onClick={onClose}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <motion.img
            src={src}
            alt={alt || ""}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: ease.primary }}
            className="rounded"
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              objectFit: "contain",
              border: "1px solid rgba(255, 107, 43, 0.2)",
              boxShadow: "0 0 60px rgba(255, 107, 43, 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <style>{`
            .lightbox-close:hover { transform: rotate(90deg); }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
