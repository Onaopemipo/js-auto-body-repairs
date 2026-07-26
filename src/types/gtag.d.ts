import type {
  AnalyticsEventParameters,
} from "@/types/analytics";

type ConsentValue = "granted" | "denied";

declare global {
  interface Window {
    dataLayer: Array<
      | unknown[]
      | {
          event?: string;
          [key: string]: unknown;
        }
    >;

    gtag: (
      command: "js" | "config" | "event" | "consent",
      targetOrAction:
        | Date
        | string
        | "default"
        | "update",
      parameters?:
        | AnalyticsEventParameters
        | Record<string, ConsentValue>,
    ) => void;
  }
}

export {};
