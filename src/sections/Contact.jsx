import { motion } from "framer-motion";
import { Mail, Phone, Linkedin } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import RevealText from "@/components/motion/RevealText";
import { ease } from "@/utils/motion";

const ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: "fmatar646@gmail.com",
    href: "mailto:fmatar646@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+44 7497702267",
    href: "tel:+447497702267",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Fares Matar",
    href: "https://www.linkedin.com/in/faris-matar-28b86630b",
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-[160px] overflow-hidden">
      {/* Warm radial glow behind headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(255, 107, 43, 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container-edge text-center relative z-[1]">
        <FadeIn>
          <p
            className="eyebrow mb-6"
            style={{ display: "inline-flex", justifyContent: "center" }}
          >
            Contact
          </p>
        </FadeIn>
        <RevealText
          as="h2"
          lines={[
            <>
              Let's work <span className="text-primary">together.</span>
            </>,
          ]}
          className="font-display font-bold text-text-primary text-display-lg"
        />
        <FadeIn delay={0.2} className="mt-6">
          <p className="font-sans text-text-muted text-lg max-w-2xl mx-auto">
            Open to graduate roles, engineering positions, and web development
            projects.
          </p>
        </FadeIn>

        <div className="mt-16 flex flex-col items-stretch max-w-[480px] mx-auto">
          {ITEMS.map((item, i) => (
            <ContactRow key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactRow({ item, index }) {
  const Icon = item.icon;
  const linkProps = item.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.a
      href={item.href}
      {...linkProps}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.5,
        ease: ease.primary,
        delay: index * 0.1,
      }}
      className="contact-row mb-4 last:mb-0 text-left"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "24px 32px",
        background: "linear-gradient(135deg, #0A1628 0%, #081220 100%)",
        border: "1px solid rgba(255, 107, 43, 0.15)",
        borderRadius: 6,
        transition: "all 0.3s ease",
      }}
    >
      <Icon size={20} color="#FF6B2B" strokeWidth={1.75} />
      <div className="flex flex-col gap-1 min-w-0">
        <span className="font-mono uppercase tracking-widest text-[10px] text-text-muted">
          {item.label}
        </span>
        <span
          className="font-display font-medium text-text-primary truncate"
          style={{ fontSize: 17 }}
        >
          {item.value}
        </span>
      </div>
      <style>{`
        .contact-row:hover {
          border-color: rgba(255, 107, 43, 0.5) !important;
          box-shadow: 0 0 30px rgba(255, 107, 43, 0.08);
          transform: translateX(4px);
        }
      `}</style>
    </motion.a>
  );
}
