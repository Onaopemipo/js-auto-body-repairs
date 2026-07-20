"use client";

import { Suspense } from "react";

import { sceneRegistry, type SceneKey } from "@/three/scenes/scene-registry";

interface SceneManagerProps {
  scene: SceneKey;
}

export function SceneManager({ scene }: SceneManagerProps) {
  switch (scene) {
    case "hero": {
      const HeroScene = sceneRegistry.hero;

      if (!HeroScene) {
        return null;
      }

      return (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      );
    }

    case "gallery":
    case "services":
    case "about":
    case "contact":
    default:
      return null;
  }
}
