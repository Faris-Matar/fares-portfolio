/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core surface tokens
        background: "#050A0E",
        surface: "#0A1628",
        border: "#1A2535",
        // Brand orange spectrum
        primary: "#FF6B2B",
        secondary: "#FFB347",
        glow: "#FF3D00",
        // Text
        "text-primary": "#F0F4F8",
        "text-muted": "#6B7A8D",
      },
      fontFamily: {
        display: ["Syne", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(52px, 7vw, 96px)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(40px, 6vw, 80px)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(32px, 4vw, 52px)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
      },
      letterSpacing: {
        eyebrow: "0.22em",
      },
      spacing: {
        "scene-y": "clamp(5rem, 12vh, 7.5rem)",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "out-cubic": "cubic-bezier(0.33, 1, 0.68, 1)",
      },
      transitionDuration: {
        fast: "250ms",
        normal: "500ms",
        slow: "800ms",
      },
      boxShadow: {
        "glow-orange": "0 0 30px rgba(255, 107, 43, 0.25)",
        "glow-soft": "0 0 60px rgba(255, 107, 43, 0.15)",
      },
    },
  },
  plugins: [],
};
