"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";

import { useThreePerformance } from "@/three/performance/three-performance-provider";

interface AdaptiveCanvasProps extends Omit<
  CanvasProps,
  "children" | "dpr" | "shadows"
> {
  children: ReactNode;
}

export function AdaptiveCanvas({ children, ...props }: AdaptiveCanvasProps) {
  const { profile } = useThreePerformance();

  return (
    <Canvas
      dpr={profile.dpr}
      shadows={profile.shadows}
      frameloop="always"
      gl={{
        antialias: profile.antialias,
        alpha: true,
        powerPreference: profile.powerPreference,
      }}
      camera={{
        fov: 38,
        near: 0.1,
        far: 100,
        position: [0, 1.25, 6.4],
      }}
      {...props}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
