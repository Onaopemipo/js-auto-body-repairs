import { analyticsConfig } from "@/config/analytics";
import type {
  AnalyticsConsent,
  StoredAnalyticsConsent,
} from "@/types/analytics";

function isBrowser() {
  return typeof window !== "undefined";
}

export function readAnalyticsConsent(): AnalyticsConsent {
  if (!isBrowser()) {
    return "unknown";
  }

  try {
    const rawValue = window.localStorage.getItem(
      analyticsConfig.consentStorageKey,
    );

    if (!rawValue) {
      return "unknown";
    }

    const stored = JSON.parse(rawValue) as Partial<StoredAnalyticsConsent>;

    if (
      stored.version !== analyticsConfig.consentVersion ||
      (stored.status !== "granted" && stored.status !== "denied")
    ) {
      return "unknown";
    }

    return stored.status;
  } catch {
    return "unknown";
  }
}

export function subscribeAnalyticsConsent(callback: () => void) {
  if (!isBrowser()) {
    return () => {};
  }

  function handleConsentChange() {
    callback();
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === analyticsConfig.consentStorageKey) {
      callback();
    }
  }

  window.addEventListener(
    analyticsConfig.consentChangedEvent,
    handleConsentChange,
  );

  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(
      analyticsConfig.consentChangedEvent,
      handleConsentChange,
    );

    window.removeEventListener("storage", handleStorage);
  };
}

export function saveAnalyticsConsent(
  status: Exclude<AnalyticsConsent, "unknown">,
) {
  if (!isBrowser()) {
    return;
  }

  const stored: StoredAnalyticsConsent = {
    status,
    version: analyticsConfig.consentVersion,
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(
    analyticsConfig.consentStorageKey,
    JSON.stringify(stored),
  );

  window.dispatchEvent(
    new CustomEvent(analyticsConfig.consentChangedEvent, {
      detail: {
        status,
      },
    }),
  );
}

export function openAnalyticsPreferences() {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(new Event(analyticsConfig.manageConsentEvent));
}
