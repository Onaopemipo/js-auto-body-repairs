"use client";

import { RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

interface WheelProps {
  position: [number, number, number];
}

function Wheel({ position }: WheelProps) {
  return (
    <group position={position}>
      <mesh castShadow rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.42, 0.42, 0.28, 32]} />
        <meshStandardMaterial
          color="#09090a"
          roughness={0.78}
          metalness={0.15}
        />
      </mesh>

      <mesh rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.22, 0.22, 0.3, 24]} />
        <meshStandardMaterial
          color="#8a8a8f"
          roughness={0.28}
          metalness={0.82}
        />
      </mesh>
    </group>
  );
}

export function ProceduralVehicle() {
  const vehicle = useRef<Group>(null);

  return (
    <group
      ref={vehicle}
      rotation={[0, -0.42, 0]}
      position={[0.25, -0.08, 0]}
      scale={1.08}
    >
      <RoundedBox
        castShadow
        args={[3.7, 0.72, 1.6]}
        radius={0.26}
        smoothness={5}
        position={[0, 0.05, 0]}
      >
        <meshPhysicalMaterial
          color="#e7070b"
          metalness={0.72}
          roughness={0.24}
          clearcoat={1}
          clearcoatRoughness={0.16}
        />
      </RoundedBox>

      <RoundedBox
        castShadow
        args={[1.85, 0.72, 1.34]}
        radius={0.28}
        smoothness={5}
        position={[-0.18, 0.68, 0]}
      >
        <meshPhysicalMaterial
          color="#171719"
          metalness={0.5}
          roughness={0.18}
          transmission={0.08}
        />
      </RoundedBox>

      <RoundedBox
        args={[0.78, 0.06, 1.15]}
        radius={0.04}
        smoothness={3}
        position={[1.47, 0.41, 0]}
      >
        <meshStandardMaterial
          color="#ff171b"
          emissive="#e7070b"
          emissiveIntensity={0.34}
          metalness={0.55}
          roughness={0.26}
        />
      </RoundedBox>

      <Wheel position={[-1.18, -0.35, 0.78]} />
      <Wheel position={[1.16, -0.35, 0.78]} />
      <Wheel position={[-1.18, -0.35, -0.78]} />
      <Wheel position={[1.16, -0.35, -0.78]} />
    </group>
  );
}
