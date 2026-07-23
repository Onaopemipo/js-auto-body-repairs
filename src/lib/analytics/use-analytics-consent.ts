"use client";

import { useSyncExternalStore } from "react";

import {
  readAnalyticsConsent,
  subscribeAnalyticsConsent,
} from "@/lib/analytics/consent";
import type { AnalyticsConsent } from "@/types/analytics";

function getServerConsent(): AnalyticsConsent {
  return "unknown";
}

export function useAnalyticsConsent() {
  return useSyncExternalStore(
    subscribeAnalyticsConsent,
    readAnalyticsConsent,
    getServerConsent,
  );
}
