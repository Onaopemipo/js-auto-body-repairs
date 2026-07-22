"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";

import { HeroMediaFallback } from "@/components/hero-media/hero-media-fallback";
import { heroMediaConfig } from "@/config/hero-media";

export function HeroPhotographicMedia() {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["0%", "10%"],
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [1.03, 1.1],
  );

  if (failed) {
    return (
      <div ref={ref} className="absolute inset-0">
        <HeroMediaFallback />
      </div>
    );
  }

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={heroMediaConfig.mobile.webp}
            type="image/webp"
          />
          <source
            media="(min-width: 768px)"
            srcSet={heroMediaConfig.desktop.webp}
            type="image/webp"
          />
          <Image
            src={heroMediaConfig.desktop.fallback}
            alt={heroMediaConfig.alt}
            fill
            preload
            sizes="100vw"
            quality={92}
            onError={() => setFailed(true)}
            className="object-cover"
            style={{
              objectPosition: heroMediaConfig.focalPoint,
            }}
          />
        </picture>
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,9,0.98)_0%,rgba(8,8,9,0.88)_42%,rgba(8,8,9,0.28)_72%,rgba(8,8,9,0.62)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,9,0.52)_0%,transparent_28%,rgba(8,8,9,0.68)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(231,7,11,0.18),transparent_30%)]"
      />
    </div>
  );
}
