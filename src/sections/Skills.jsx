import { motion } from "framer-motion";
import FadeIn from "@/components/motion/FadeIn";
import RevealText from "@/components/motion/RevealText";
import TagPill from "@/components/ui/TagPill";
import { ease } from "@/utils/motion";

const CATEGORIES = [
  {
    title: "AI & Machine Learning",
    tags: [
      "Python",
      "OpenCV",
      "MediaPipe",
      "Real-Time Inference Pipelines",
      "Feature Engineering",
      "Embedded AI",
      "Data Pipeline Design",
      "NumPy",
      "Pandas",
      "Classification Systems",
      "Computer Vision",
    ],
  },
  {
    title: "Embedded Systems",
    tags: [
      "Raspberry Pi 5",
      "ESP32",
      "PIC18F45K20",
      "C Firmware",
      "Python Firmware",
      "GPIO",
      "PWM",
      "SPI",
      "I2C",
      "UART",
      "Interrupt-Driven Design",
      "Real-Time Control Loops",
      "Motor Control",
      "Buck Converter Design",
    ],
  },
  {
    title: "PCB Design",
    tags: [
      "EasyEDA",
      "4-Layer Mixed-Signal PCB",
      "Schematic Capture",
      "Component Selection",
      "Power Planes",
      "Decoupling Capacitors",
      "Guard Rings",
      "DFM",
      "Signal Integrity",
      "EMI Mitigation",
    ],
  },
  {
    title: "Software Development",
    tags: [
      "Python (Advanced)",
      "C",
      "Assembly",
      "MATLAB",
      "Modular OOP Architecture",
      "Event-Driven Systems",
      "State Machines",
      "Git",
      "API Integration",
      "Virtual Environments",
      "Debugging",
    ],
  },
  {
    title: "Web Development",
    tags: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "JavaScript",
      "HTML",
      "CSS",
      "REST APIs",
      "Vercel Deployment",
      "Responsive Design",
      "Lenis Smooth Scroll",
    ],
  },
  {
    title: "Electronics & Lab",
    tags: [
      "Analogue Circuit Design",
      "Digital Circuit Design",
      "Power Electronics",
      "H-Bridge Motor Drivers",
      "Signal Conditioning",
      "LDO Regulators",
      "Oscilloscope Testing",
      "Multimeter Validation",
      "Soldering (Through-Hole and SMD)",
      "Proteus ISIS",
      "Multisim",
      "Simulink",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-[120px] overflow-hidden">
      <span className="section-bg-text" aria-hidden>
        Skills
      </span>
      <div className="container-edge relative z-[1]">
        <FadeIn>
          <p className="eyebrow mb-6">Skills</p>
        </FadeIn>
        <RevealText
          as="h2"
          text="What I work with."
          className="font-display font-bold text-text-primary text-display-md"
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {CATEGORIES.map((cat, i) => (
            <CategoryBlock key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryBlock({ category, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: ease.primary, delay: index * 0.06 }}
      className="rounded-lg p-7 transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, #0A1628 0%, #081220 100%)",
        border: "1px solid rgba(255, 107, 43, 0.1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 107, 43, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 107, 43, 0.1)";
      }}
    >
      <h3 className="font-display font-medium text-text-primary text-xl mb-5 flex items-center">
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: 999,
            background: "#FF6B2B",
            marginRight: 10,
            verticalAlign: "middle",
          }}
        />
        {category.title}
      </h3>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.03,
              delayChildren: 0.2 + index * 0.04,
            },
          },
        }}
        className="flex flex-wrap gap-2"
      >
        {category.tags.map((t) => (
          <motion.div
            key={t}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.3, ease: ease.primary },
              },
            }}
          >
            <TagPill>{t}</TagPill>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
