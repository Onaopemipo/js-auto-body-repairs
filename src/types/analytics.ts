export type AnalyticsConsent = "unknown" | "granted" | "denied";

export interface StoredAnalyticsConsent {
  status: Exclude<AnalyticsConsent, "unknown">;
  version: number;
  updatedAt: string;
}

export interface AnalyticsEventParameters {
  [key: string]: string | number | boolean | null | undefined;
}
