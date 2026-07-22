const rawMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

const validMeasurementId = /^G-[A-Z0-9]+$/i.test(rawMeasurementId)
  ? rawMeasurementId
  : "";

export const analyticsConfig = {
  measurementId: validMeasurementId,

  enabled:
    process.env.NODE_ENV === "production" && validMeasurementId.length > 0,

  consentStorageKey: "js-auto-body-analytics-consent-v1",

  consentVersion: 1,

  manageConsentEvent: "js-auto-body-manage-analytics-consent",

  consentChangedEvent: "js-auto-body-analytics-consent-changed",

  debug: process.env.NODE_ENV === "development",
} as const;
