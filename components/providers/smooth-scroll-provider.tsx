"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScrollProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      // lerp gives a more natural feel than fixed duration
      lerp: 0.1,
      // Stop inertia when navigating to a new page
      stopInertiaOnNavigate: true,
      // Don't smooth-scroll inside elements that have their own scroll
      prevent: (node: HTMLElement) => {
        return (
          node.tagName === "TEXTAREA" ||
          node.tagName === "INPUT" ||
          node.hasAttribute("data-lenis-prevent") ||
          // modals / overlays
          node.closest("[data-lenis-prevent]") !== null
        );
      },
    });

    // After every Lenis tick, fire a native scroll event so that
    // Framer Motion's useScroll listeners re-sample document.documentElement.scrollTop
    // (which Lenis has already updated).
    lenis.on("scroll", () => {
      window.dispatchEvent(new Event("scroll", { bubbles: false }));
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Expose on window for debugging
    if (typeof window !== "undefined") {
      (window as Window & { __lenis?: Lenis }).__lenis = lenis;
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
