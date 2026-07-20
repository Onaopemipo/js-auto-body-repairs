"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { qualityProfiles } from "@/three/config/quality-profiles";
import { detectThreeQuality } from "@/three/performance/detect-three-quality";
import type { ThreeQuality, ThreeQualityProfile } from "@/three/types/quality";

interface ThreePerformanceContextValue {
  profile: ThreeQualityProfile;
  ready: boolean;
  setRuntimeQuality: (quality: ThreeQuality) => void;
}

const ThreePerformanceContext =
  createContext<ThreePerformanceContextValue | null>(null);

export function ThreePerformanceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [profile, setProfile] = useState<ThreeQualityProfile>(
    qualityProfiles.medium,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    detectThreeQuality()
      .then((nextProfile) => {
        if (active) {
          setProfile(nextProfile);
          setReady(true);
        }
      })
      .catch(() => {
        if (active) {
          setReady(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      profile,
      ready,
      setRuntimeQuality(quality: ThreeQuality) {
        setProfile(qualityProfiles[quality]);
      },
    }),
    [profile, ready],
  );

  return (
    <ThreePerformanceContext.Provider value={value}>
      {children}
    </ThreePerformanceContext.Provider>
  );
}

export function useThreePerformance() {
  const context = useContext(ThreePerformanceContext);

  if (!context) {
    throw new Error(
      "useThreePerformance must be used inside ThreePerformanceProvider.",
    );
  }

  return context;
}
