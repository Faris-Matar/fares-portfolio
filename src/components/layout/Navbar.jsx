import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollDirection } from "@/utils/useScrollDirection";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const { direction, atTop } = useScrollDirection();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onHome = location.pathname === "/";
  const hidden = !atTop && direction === "down" && !open;

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const goSection = (id) => {
    setOpen(false);
    if (!onHome) {
      navigate(`/#${id}`);
      // After nav, scroll on next tick
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
        else if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
      return;
    }
    const el = document.getElementById(id);
    if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
    else if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          atTop ? "bg-transparent" : "bg-background/95 backdrop-blur-sm"
        } transition-colors duration-300`}
      >
        <div className="container-edge flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link
            to="/"
            className="font-display font-bold text-2xl text-primary tracking-tight"
            aria-label="Fares Matar , Home"
          >
            FM
          </Link>

          {/* Center links , desktop */}
          <nav className="hidden md:flex items-center gap-9" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => goSection(l.id)}
                className="font-sans uppercase tracking-widest text-[11px] text-text-muted hover:text-text-primary transition-colors duration-fast"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA , desktop */}
          <div className="hidden md:block">
            <Button variant="outline-primary" onClick={() => goSection("contact")}>
              Get In Touch
            </Button>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col justify-center w-10 h-10 gap-1.5 text-primary"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <motion.span
              animate={{
                rotate: open ? 45 : 0,
                y: open ? 6 : 0,
              }}
              className="block w-6 h-[2px] bg-primary"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              className="block w-6 h-[2px] bg-primary"
            />
            <motion.span
              animate={{
                rotate: open ? -45 : 0,
                y: open ? -6 : 0,
              }}
              className="block w-6 h-[2px] bg-primary"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.button
                key={l.id}
                onClick={() => goSection(l.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                className="font-display font-bold text-3xl text-text-primary hover:text-primary transition-colors"
              >
                {l.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Button variant="outline-primary" onClick={() => goSection("contact")}>
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
