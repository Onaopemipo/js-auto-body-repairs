import type { ThreeQuality, ThreeQualityProfile } from "@/three/types/quality";

export const qualityProfiles: Record<ThreeQuality, ThreeQualityProfile> = {
  "ultra-low": {
    quality: "ultra-low",
    dpr: [0.75, 1],
    shadows: false,
    antialias: false,
    powerPreference: "low-power",
    environmentIntensity: 0.45,
    contactShadows: false,
    maxLights: 2,
  },
  low: {
    quality: "low",
    dpr: [0.8, 1.15],
    shadows: false,
    antialias: false,
    powerPreference: "low-power",
    environmentIntensity: 0.65,
    contactShadows: false,
    maxLights: 3,
  },
  medium: {
    quality: "medium",
    dpr: [1, 1.5],
    shadows: true,
    antialias: true,
    powerPreference: "high-performance",
    environmentIntensity: 0.85,
    contactShadows: true,
    maxLights: 4,
  },
  high: {
    quality: "high",
    dpr: [1, 2],
    shadows: true,
    antialias: true,
    powerPreference: "high-performance",
    environmentIntensity: 1,
    contactShadows: true,
    maxLights: 5,
  },
};
