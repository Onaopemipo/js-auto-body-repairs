export type ThreeQuality = "ultra-low" | "low" | "medium" | "high";

export interface ThreeQualityProfile {
  quality: ThreeQuality;
  dpr: [number, number];
  shadows: boolean;
  antialias: boolean;
  powerPreference: "default" | "high-performance" | "low-power";
  environmentIntensity: number;
  contactShadows: boolean;
  maxLights: number;
}
