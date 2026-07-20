import { lazy, type ComponentType, type LazyExoticComponent } from "react";

export type SceneKey = "hero" | "gallery" | "services" | "about" | "contact";

export type SceneComponent = LazyExoticComponent<ComponentType>;

const HeroScene = lazy(async () => {
  const sceneModule = await import("@/three/scenes/hero-scene");

  return {
    default: sceneModule.HeroScene,
  };
});

export const sceneRegistry: Partial<Record<SceneKey, SceneComponent>> = {
  hero: HeroScene,
};
