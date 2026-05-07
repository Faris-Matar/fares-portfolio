import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ease } from "@/utils/motion";
import TagPill from "./TagPill";

/**
 * ProjectCard, bento-style with image scale, top accent line,
 * orange glow shadow, and a forward-tilt entrance.
 *
 * The "meta" project (This Website) gets a unique visual treatment:
 * no image, animated rotating conic gradient border, FM watermark,
 * and a blinking-cursor "you are here" line.
 */
export default function ProjectCard({
  project,
  index = 0,
  className = "",
  spanClass = "",
}) {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const motionProps = {
    initial: isMobile
      ? { opacity: 0, y: 40 }
      : { opacity: 0, y: 60, rotateX: 8 },
    whileInView: isMobile
      ? { opacity: 1, y: 0 }
      : { opacity: 1, y: 0, rotateX: 0 },
    viewport: { once: true, margin: "-15%" },
    transition: {
      duration: 0.7,
      ease: ease.primary,
      delay: index * 0.1,
    },
    className: `${spanClass} relative`,
    style: { transformPerspective: 1000 },
  };

  if (project.meta) {
    return (
      <motion.div {...motionProps}>
        <MetaCard />
      </motion.div>
    );
  }

  const isFeatured = project.featured;
  const imageHeight = isFeatured ? "h-[260px] md:h-[300px]" : "h-[220px]";

  const inner = (
    <article
      className={`group relative overflow-hidden rounded-md h-full flex flex-col transition-all duration-[0.35s] ease-out-quart border ${className}`}
      style={{
        background: "#0A1628",
        borderColor: "rgba(255, 107, 43, 0.12)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 107, 43, 0.6)";
        e.currentTarget.style.boxShadow =
          "0 0 40px rgba(255, 107, 43, 0.12), 0 0 80px rgba(255, 107, 43, 0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 107, 43, 0.12)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <span className="absolute left-0 top-0 z-20 h-[2px] w-0 bg-primary group-hover:w-full transition-[width] duration-[0.4s] ease-out-quart" />

      {isFeatured && (
        <span className="absolute top-3 right-3 z-20 font-mono uppercase text-[10px] tracking-widest bg-primary text-background px-2.5 py-1">
          Featured
        </span>
      )}

      <div className={`relative w-full overflow-hidden ${imageHeight}`}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[0.5s] ease-out-quart group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface via-surface to-primary/20" />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 40%, #0A1628 100%)",
          }}
        />
      </div>

      <div className="flex-1 p-6 flex flex-col gap-3">
        <div className="font-mono uppercase tracking-widest text-[10px] text-text-muted">
          {project.category}
        </div>
        <h3 className="font-display font-bold text-[22px] leading-tight text-text-primary">
          {project.title}
        </h3>
        <p className="font-sans text-[15px] text-text-muted line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.slice(0, isFeatured ? 6 : 4).map((t) => (
            <TagPill key={t} size="sm">
              {t}
            </TagPill>
          ))}
        </div>
        <div className="mt-auto pt-4 flex items-center text-primary font-medium text-sm">
          <span>View Project</span>
          <span className="inline-block ml-1 transition-transform duration-300 ease-out-quart group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </article>
  );

  if (project.slug) {
    return (
      <motion.div {...motionProps}>
        <Link to={`/projects/${project.slug}`} className="block h-full">
          {inner}
        </Link>
      </motion.div>
    );
  }

  return <motion.div {...motionProps}>{inner}</motion.div>;
}

/* ─── This Website meta card ─── */
function MetaCard() {
  const goTop = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={goTop}
      className="meta-card group relative block w-full text-left rounded-md overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0A1628 0%, #0D1F35 50%, #0A1628 100%)",
        border: "1px solid rgba(255, 107, 43, 0.3)",
        padding: "0",
      }}
      aria-label="You are already here"
    >
      {/* Conic-gradient rotating border */}
      <span aria-hidden className="meta-card__border" />
      {/* Inner card surface that masks the conic gradient leaving only the edge */}
      <span aria-hidden className="meta-card__inner-bg" />

      {/* Content */}
      <div className="relative z-[2] p-7 md:p-8 min-h-[220px] flex flex-col gap-3">
        {/* FM watermark */}
        <span
          aria-hidden
          className="font-display font-bold absolute pointer-events-none select-none"
          style={{
            fontSize: "4rem",
            lineHeight: 1,
            color: "#FF6B2B",
            opacity: 0.15,
            top: 16,
            right: 24,
          }}
        >
          FM
        </span>

        <span
          className="meta-card__here font-mono uppercase tracking-widest text-[10px] text-primary"
          style={{ opacity: 0.85 }}
        >
          You Are Here
        </span>
        <h3 className="font-display font-bold text-[22px] leading-tight text-text-primary">
          This Portfolio
        </h3>
        <p className="font-sans text-[14px] text-text-muted">
          Designed, coded, and deployed by me. The site you are on right now.
        </p>

        <div className="flex flex-wrap gap-1.5 mt-1">
          {["React 18", "GSAP", "Framer Motion", "Tailwind", "Vercel"].map((t) => (
            <TagPill key={t} size="sm">
              {t}
            </TagPill>
          ))}
        </div>

        <div className="mt-auto pt-4 font-mono uppercase tracking-widest text-[10px] text-text-muted">
          You are already here
          <span className="meta-card__caret" aria-hidden>
            |
          </span>
        </div>
      </div>

      <style>{`
        .meta-card {
          position: relative;
        }
        .meta-card__border {
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            #FF6B2B 60deg,
            transparent 120deg,
            transparent 360deg
          );
          animation: meta-spin 4s linear infinite;
          z-index: 0;
        }
        .meta-card__inner-bg {
          position: absolute;
          inset: 1px;
          border-radius: 6px;
          background: linear-gradient(135deg, #0A1628 0%, #0D1F35 50%, #0A1628 100%);
          z-index: 1;
        }
        @keyframes meta-spin {
          to { transform: rotate(360deg); }
        }
        .meta-card__caret {
          display: inline-block;
          margin-left: 4px;
          color: #FF6B2B;
          animation: meta-blink 0.8s steps(1) infinite;
        }
        @keyframes meta-blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
        .meta-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(255, 107, 43, 0.12),
            0 0 80px rgba(255, 107, 43, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .meta-card:hover .meta-card__here {
          animation: meta-pulse 1.2s ease-in-out;
        }
        @keyframes meta-pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </button>
  );
}
