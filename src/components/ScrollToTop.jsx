import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Resets scroll on every route change and refreshes ScrollTrigger so
 * per-page GSAP reveals compute their start/end against the new layout.
 *
 * Order on every navigation:
 *   1. Drive Lenis (or window) back to 0 immediately.
 *   2. After two animation frames , i.e. once the new route has rendered
 *      and the browser has laid it out , call ScrollTrigger.refresh() so
 *      any triggers registered by the new page have correct positions.
 *
 * Mount once inside <BrowserRouter>. Returns null.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = window.__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }

    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(outer);
      if (inner) cancelAnimationFrame(inner);
    };
  }, [pathname]);

  return null;
}
