"use client";

import { useThreePerformance } from "@/three/performance/three-performance-provider";

export function StudioLightingRig() {
  const { profile } = useThreePerformance();

  return (
    <>
      <ambientLight intensity={0.28 * profile.environmentIntensity} />

      <directionalLight
        castShadow={profile.shadows}
        intensity={2.1}
        position={[4, 6, 5]}
        color="#ffffff"
        shadow-mapSize-width={profile.quality === "high" ? 2048 : 1024}
        shadow-mapSize-height={profile.quality === "high" ? 2048 : 1024}
      />

      <pointLight
        intensity={18}
        distance={7}
        position={[-3, 1.8, 2]}
        color="#e7070b"
      />

      <pointLight
        intensity={9}
        distance={6}
        position={[3, 0.7, -2]}
        color="#8a8a8f"
      />
    </>
  );
}
