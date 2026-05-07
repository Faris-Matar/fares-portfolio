import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

const port = Number(process.env.PORT) || 3000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port,
    strictPort: false,
    host: true,
    historyApiFallback: true,
  },
  preview: {
    port,
    strictPort: false,
    historyApiFallback: true,
  },
  build: {
    target: "es2020",
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ["framer-motion"],
          gsap: ["gsap"],
          router: ["react-router-dom"],
        },
      },
    },
  },
  assetsInclude: ["**/*.mp4", "**/*.webm"],
});
