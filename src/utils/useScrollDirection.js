import { useEffect, useState } from "react";

/**
 * Tracks scroll direction (up/down) and current scrollY.
 * Uses Lenis when available, falls back to window scroll.
 */
export function useScrollDirection() {
  const [direction, setDirection] = useState("up");
  const [scrollY, setScrollY] = useState(0);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    let lastY = 0;
    let ticking = false;

    const update = (y) => {
      const delta = y - lastY;
      if (Math.abs(delta) > 4) {
        setDirection(delta > 0 ? "down" : "up");
        lastY = y;
      }
      setScrollY(y);
      setAtTop(y < 30);
      ticking = false;
    };

    const onScrollWindow = () => {
      if (!ticking) {
        const y = window.scrollY || window.pageYOffset || 0;
        window.requestAnimationFrame(() => update(y));
        ticking = true;
      }
    };

    const onLenisScroll = ({ scroll }) => {
      if (!ticking) {
        window.requestAnimationFrame(() => update(scroll));
        ticking = true;
      }
    };

    let attachedLenis = null;
    const tryAttach = () => {
      if (window.__lenis && !attachedLenis) {
        attachedLenis = window.__lenis;
        attachedLenis.on("scroll", onLenisScroll);
      }
    };

    tryAttach();
    const interval = setInterval(tryAttach, 200);
    window.addEventListener("scroll", onScrollWindow, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", onScrollWindow);
      if (attachedLenis) {
        attachedLenis.off("scroll", onLenisScroll);
      }
    };
  }, []);

  return { direction, scrollY, atTop };
}
