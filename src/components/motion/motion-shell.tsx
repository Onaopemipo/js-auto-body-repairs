"use client";

import type { ReactNode } from "react";

import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";

export function MotionShell({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      {children}
    </SmoothScrollProvider>
  );
}
