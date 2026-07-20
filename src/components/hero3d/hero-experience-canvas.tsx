"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

import { HeroExperienceFallback } from "@/components/hero3d/hero-experience-fallback";
import { AdaptiveCanvas } from "@/three/canvas/adaptive-canvas";
import { SceneManager } from "@/three/components/scene-manager";
import { ThreePerformanceProvider } from "@/three/performance/three-performance-provider";

class ThreeErrorBoundary extends Component<
  {
    children: ReactNode;
  },
  {
    failed: boolean;
  }
> {
  state = {
    failed: false,
  };

  static getDerivedStateFromError() {
    return {
      failed: true,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("Three.js hero fallback activated.", error, info);
  }

  render() {
    if (this.state.failed) {
      return <HeroExperienceFallback />;
    }

    return this.props.children;
  }
}

export function HeroExperienceCanvas() {
  return (
    <ThreeErrorBoundary>
      <ThreePerformanceProvider>
        <AdaptiveCanvas>
          <SceneManager scene="hero" />
        </AdaptiveCanvas>
      </ThreePerformanceProvider>
    </ThreeErrorBoundary>
  );
}
