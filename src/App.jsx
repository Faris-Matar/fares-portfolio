import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import GlobalBackground from "@/components/layout/GlobalBackground";
import ScrollToTop from "@/components/ScrollToTop";
import { useLenis } from "@/hooks/useLenis";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ProjectPage = lazy(() => import("@/pages/ProjectPage"));

function LoadingFallback() {
  return (
    <div className="fixed inset-0 z-[200] bg-background pointer-events-auto">
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-primary"
        initial={{ width: "0%" }}
        animate={{ width: "80%" }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  );
}

function PageRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>

        {/* Slide-over panel , exits left → right on each navigation */}
        <motion.div
          key={`slide-${location.pathname}`}
          className="fixed inset-0 z-[80] bg-background pointer-events-none"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  useLenis();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalBackground />
      <CustomCursor />
      <Navbar />
      <main id="main" className="relative z-[1]">
        <PageRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
}
