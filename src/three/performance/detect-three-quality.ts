import { getGPUTier } from "detect-gpu";

import { qualityProfiles } from "@/three/config/quality-profiles";
import type { ThreeQuality, ThreeQualityProfile } from "@/three/types/quality";

function hasReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function hasConstrainedMemory() {
  const navigatorWithMemory = navigator as Navigator & {
    deviceMemory?: number;
  };

  return (
    typeof navigatorWithMemory.deviceMemory === "number" &&
    navigatorWithMemory.deviceMemory <= 4
  );
}

function isTouchDevice() {
  return (
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

export async function detectThreeQuality(): Promise<ThreeQualityProfile> {
  if (hasReducedMotion()) {
    return qualityProfiles["ultra-low"];
  }

  try {
    const gpu = await getGPUTier({
      mobileTiers: [0, 15, 30, 60],
      desktopTiers: [0, 15, 30, 60],
      override: {
        screenSize: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      },
    });

    let quality: ThreeQuality =
      gpu.tier >= 3
        ? "high"
        : gpu.tier === 2
          ? "medium"
          : gpu.tier === 1
            ? "low"
            : "ultra-low";

    if (hasConstrainedMemory() || (isTouchDevice() && quality === "high")) {
      quality =
        quality === "high" ? "medium" : quality === "medium" ? "low" : quality;
    }

    return qualityProfiles[quality];
  } catch {
    return isTouchDevice() ? qualityProfiles.low : qualityProfiles.medium;
  }
}
