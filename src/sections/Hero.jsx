import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircuitTraces from "./CircuitTraces";
import HeroVisual from "./HeroVisual";
import Button from "@/components/ui/Button";
import RevealText from "@/components/motion/RevealText";
import { ease } from "@/utils/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);
  const tracesRef = useRef(null);
  const radialRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: sectionRef.current,
        start: "top top",
        end: "60% top",
        scrub: 0.6,
      };
      gsap.to(contentRef.current, { opacity: 0, y: -40, ease: "none", scrollTrigger: trigger });
      gsap.to(visualRef.current, {
        opacity: 0,
        scale: 1.05,
        ease: "none",
        scrollTrigger: trigger,
      });
      gsap.to(tracesRef.current, {
        scale: 1.1,
        ease: "none",
        scrollTrigger: { ...trigger, end: "bottom top" },
      });
      gsap.to(radialRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: trigger,
      });
    }, sectionRef);
    return () => {
      ctx.revert();
    };
  }, []);

  const goProjects = () => {
    const el = document.getElementById("projects");
    if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -60 });
    else if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-background"
    >
      {/* Radial gradient backdrop */}
      <div
        ref={radialRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, #0D1F35 0%, #050A0E 70%)",
        }}
      />

      {/* Circuit trace SVG */}
      <div ref={tracesRef} className="absolute inset-0">
        <CircuitTraces />
      </div>

      {/* Hero visual on the right (desktop) */}
      <div
        ref={visualRef}
        className="hidden lg:block absolute top-0 right-0 h-full"
        style={{ width: "45%" }}
      >
        <HeroVisual />
      </div>

      {/* Foreground content */}
      <div className="container-edge relative z-10 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] w-full items-center pt-20">
          <div ref={contentRef} className="text-center lg:text-left mx-auto lg:mx-0 max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: ease.primary, delay: 0.2 }}
              className="eyebrow mb-6"
            >
              Engineering Portfolio, 2025
            </motion.p>

            <RevealText
              as="h1"
              lines={[
                <>I build things</>,
                <>
                  that <span className="text-primary">work.</span>
                </>,
              ]}
              className="font-display font-bold text-text-primary text-display-xl heading-glow"
              stagger={0.15}
              duration={0.7}
              delay={0.4}
            />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: ease.primary, delay: 0.9 }}
              className="font-sans text-text-muted mt-8 max-w-[480px] mx-auto lg:mx-0"
              style={{ fontSize: 18, lineHeight: 1.7 }}
            >
              EEE Graduate. Embedded systems, AI pipelines, and production-ready
              software. From circuit board to deployed product.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 1.1 },
                },
              }}
              className="mt-10 flex flex-wrap items-center gap-4 justify-center lg:justify-start"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: ease.primary },
                  },
                }}
              >
                <Button onClick={goProjects}>View My Work</Button>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: ease.primary },
                  },
                }}
              >
                <Button
                  variant="outline-light"
                  href="/cv/Fares_Matar_CV_Master.pdf"
                  target="_blank"
                  download
                >
                  Download CV
                </Button>
              </motion.div>
            </motion.div>
          </div>
          {/* Right placeholder column on desktop, visual is positioned absolutely */}
          <div aria-hidden className="hidden lg:block" />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

function ScrollIndicator() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const line = ref.current?.querySelector("[data-line]");
      if (line) {
        gsap.to(line, {
          y: 20,
          repeat: -1,
          yoyo: true,
          duration: 1.4,
          ease: "power2.inOut",
        });
      }
      gsap.to(ref.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=100",
          scrub: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
    >
      <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
        Scroll
      </span>
      <span data-line className="block w-[1px] h-10 bg-text-muted/40" />
    </div>
  );
}
