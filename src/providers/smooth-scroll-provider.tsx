"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (media.matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.15,
      anchors: { offset: -96 },
    });

    function onChange(event: MediaQueryListEvent) {
      if (event.matches) lenis.stop();
      else lenis.start();
    }

    media.addEventListener("change", onChange);

    return () => {
      media.removeEventListener("change", onChange);
      lenis.destroy();
    };
  }, []);

  return children;
}
