"use client";

import { ContactShadows, Environment } from "@react-three/drei";

import { useThreePerformance } from "@/three/performance/three-performance-provider";

export function StudioEnvironment() {
  const { profile } = useThreePerformance();

  return (
    <>
      <Environment
        preset="city"
        environmentIntensity={profile.environmentIntensity}
      />

      {profile.contactShadows ? (
        <ContactShadows
          position={[0, -0.72, 0]}
          opacity={0.48}
          scale={7}
          blur={2.8}
          far={3.5}
          frames={1}
        />
      ) : null}

      <mesh receiveShadow rotation-x={-Math.PI / 2} position-y={-0.74}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#080809"
          roughness={0.82}
          metalness={0.12}
        />
      </mesh>
    </>
  );
}
