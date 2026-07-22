import type { AnalyticsEventParameters } from "@/types/analytics";

declare global {
  interface Window {
    dataLayer: unknown[];

    gtag: (
      command: "js" | "config" | "event" | "consent",
      targetOrAction: Date | string | "default" | "update",
      parameters?:
        AnalyticsEventParameters | Record<string, "granted" | "denied">,
    ) => void;
  }
}

export {};
