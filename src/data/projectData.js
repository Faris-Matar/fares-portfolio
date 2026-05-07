/* Project data, single source of truth for project cards and pages. */

export const projects = [
  {
    slug: "eye-tracking",
    featured: true,
    title: "AI Eye-Tracking Control System",
    category: "AI / Embedded Systems / Python",
    description:
      "Real-time AI pipeline on Raspberry Pi 5. Eye movement classified into 6 control states using MediaPipe and OpenCV, actuating a differential drive RC car via GPIO. Built and validated under real hardware constraints.",
    tags: [
      "Python",
      "MediaPipe",
      "OpenCV",
      "Raspberry Pi",
      "GPIO",
      "Real-time AI",
    ],
    image: "/assets/eye-tracking/python_screenshot.jpeg",
    youtube: "https://youtube.com/shorts/QsjTqsgF3JQ?si=wH073ZeOO_rGLhT1",
    youtubeId: "QsjTqsgF3JQ",
  },
  {
    slug: "signal-generator",
    featured: false,
    title: "Programmable Signal Generator",
    category: "Embedded Systems / C Firmware / Electronics",
    description:
      "Programmable waveform generator in C on PIC18F45K20 with MCP4921 DAC over SPI. Six waveform types, selectable frequencies from 2Hz to 100Hz, validated on a Tektronix oscilloscope. Group project leader, 85% First Class.",
    tags: ["C Firmware", "PIC18F45K20", "SPI", "DAC", "Assembly", "Electronics"],
    image: "/assets/sig-gen/sig_gen_hardware.jpeg",
  },
  {
    slug: "intellisite",
    featured: false,
    title: "IntelliSite Web Agency",
    category: "Web Development / React / Production Deployment",
    description:
      "Full production web agency website designed, coded, and deployed end to end. React, Vite, Tailwind, GSAP, Framer Motion. Real client product live on Vercel.",
    tags: ["React", "Vite", "Tailwind", "Framer Motion", "Vercel", "GSAP"],
    image: "/assets/intellisite/intelisite_1.jpeg",
    link: "https://intellisite-website.vercel.app",
  },
  {
    slug: "parking-lot",
    featured: false,
    title: "Parking Lot Counter System",
    category: "Assembly / Embedded Firmware / Proteus Simulation",
    description:
      "Interrupt-driven vehicle management system written entirely in Assembly on PIC18F45K20. Real-time counting, motor gate control, and multiplexed 7-segment display. Simulated and validated in Proteus ISIS.",
    tags: ["Assembly", "PIC18F45K20", "Proteus", "Interrupt-Driven", "Firmware"],
    image: "/assets/parking-lot/car_parking_1.jpeg",
  },
  {
    slug: "pcb",
    featured: false,
    title: "Air Quality Monitoring PCB",
    category: "PCB Design / Mixed-Signal Electronics / ESP32",
    description:
      "Four-layer mixed-signal PCB designed in EasyEDA. CO2, temperature, humidity, and particulate matter sensors on ESP32 with OLED display, SD card logging, and dual power management. Fabricated and validated.",
    tags: ["EasyEDA", "ESP32", "4-Layer PCB", "Mixed-Signal", "Sensors", "IoT"],
    image: "/assets/pcb/pcb_3d_1.jpeg",
  },
];

// Sixth meta-card, shown on the home grid, no project page.
export const thisWebsiteCard = {
  slug: null,
  featured: false,
  title: "This Website",
  category: "Web Development",
  description:
    "This portfolio was fully planned, designed, coded, and deployed by me. Built on React 18 and Vite, animated with Framer Motion and GSAP, deployed on Vercel.",
  tags: ["React", "GSAP", "Framer Motion", "Tailwind", "Vercel"],
  image: null,
  meta: true,
};

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
