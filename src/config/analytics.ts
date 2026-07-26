const rawContainerId =
  process.env.NEXT_PUBLIC_GTM_ID?.trim().toUpperCase() ?? "";

const validContainerId = /^GTM-[A-Z0-9]+$/.test(rawContainerId)
  ? rawContainerId
  : "";

export const analyticsConfig = {
  containerId: validContainerId,

  enabled:
    process.env.NODE_ENV === "production" &&
    validContainerId.length > 0,

  consentStorageKey: "js-auto-body-analytics-consent-v1",

  consentVersion: 1,

  manageConsentEvent:
    "js-auto-body-manage-analytics-consent",

  consentChangedEvent:
    "js-auto-body-analytics-consent-changed",

  debug: process.env.NODE_ENV === "development",
} as const;
