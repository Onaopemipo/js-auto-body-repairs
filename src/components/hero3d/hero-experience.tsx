"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

import { HeroExperienceFallback } from "@/components/hero3d/hero-experience-fallback";

const HeroExperienceCanvas = dynamic(
  () =>
    import("@/components/hero3d/hero-experience-canvas").then(
      (sceneModule) => sceneModule.HeroExperienceCanvas,
    ),
  {
    ssr: false,
    loading: () => <HeroExperienceFallback />,
  },
);

function subscribeToCapabilityChanges(callback: () => void) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  reducedMotion.addEventListener("change", callback);

  return () => {
    reducedMotion.removeEventListener("change", callback);
  };
}

function getClientCapabilitySnapshot() {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const canvas = document.createElement("canvas");

  const supportsWebGL = Boolean(
    canvas.getContext("webgl2") || canvas.getContext("webgl"),
  );

  return supportsWebGL && !reducedMotion;
}

function getServerCapabilitySnapshot() {
  return false;
}

export function HeroExperience() {
  const enabled = useSyncExternalStore(
    subscribeToCapabilityChanges,
    getClientCapabilitySnapshot,
    getServerCapabilitySnapshot,
  );

  if (!enabled) {
    return <HeroExperienceFallback />;
  }

  return <HeroExperienceCanvas />;
}
