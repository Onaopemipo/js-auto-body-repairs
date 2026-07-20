"use client";

import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";

import { CameraRig } from "@/three/camera/camera-rig";
import { StudioEnvironment } from "@/three/environment/studio-environment";
import { StudioLightingRig } from "@/three/lights/studio-lighting-rig";
import { ProceduralVehicle } from "@/three/models/procedural-vehicle";
import { useThreePerformance } from "@/three/performance/three-performance-provider";

export function HeroScene() {
  const { profile, setRuntimeQuality } = useThreePerformance();

  return (
    <>
      <PerformanceMonitor
        bounds={(refreshRate) => (refreshRate > 90 ? [45, 90] : [30, 60])}
        onDecline={() => {
          if (profile.quality === "high") {
            setRuntimeQuality("medium");
          } else if (profile.quality === "medium") {
            setRuntimeQuality("low");
          } else {
            setRuntimeQuality("ultra-low");
          }
        }}
      />

      <AdaptiveDpr pixelated />

      <CameraRig />
      <StudioLightingRig />
      <StudioEnvironment />
      <ProceduralVehicle />
    </>
  );
}
