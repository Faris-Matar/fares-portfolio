import { motion } from "framer-motion";
import { ease } from "@/utils/motion";

/**
 * RevealText , splits content into lines and reveals each line through
 * a clipping mask from the bottom. Pass an array of lines via `lines`
 * or a single string via `text`.
 */
export default function RevealText({
  lines,
  text,
  as = "h2",
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.15,
  duration = 0.7,
  once = true,
}) {
  const arr = lines || (text ? [text] : []);
  const Tag = as;

  return (
    <Tag className={className}>
      {arr.map((line, i) => (
        <motion.span
          key={i}
          className="block overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once, margin: "-10%" }}
        >
          <motion.span
            className={`block ${lineClassName}`}
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: "0%",
                transition: {
                  duration,
                  ease: ease.primary,
                  delay: delay + i * stagger,
                },
              },
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}
