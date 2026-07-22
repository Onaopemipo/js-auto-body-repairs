import { analyticsConfig } from "@/config/analytics";
import { readAnalyticsConsent } from "@/lib/analytics/consent";
import type { AnalyticsEventParameters } from "@/types/analytics";

function analyticsAvailable() {
  return (
    typeof window !== "undefined" &&
    typeof window.gtag === "function" &&
    readAnalyticsConsent() === "granted"
  );
}

export function trackAnalyticsEvent(
  name: string,
  parameters: AnalyticsEventParameters = {},
) {
  if (analyticsConfig.debug) {
    console.info(`[Analytics] ${name}`, parameters);
  }

  if (!analyticsAvailable()) {
    return;
  }

  window.gtag("event", name, parameters);
}

export function trackPageView(pathname: string) {
  trackAnalyticsEvent("page_view", {
    page_path: pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackGenerateLead(
  parameters: {
    service?: string;
    preferredContact?: string;
    hasPhotos?: boolean;
  } = {},
) {
  trackAnalyticsEvent("generate_lead", {
    currency: "AUD",
    value: 1,
    lead_source: "website_quote_form",
    service: parameters.service,
    preferred_contact: parameters.preferredContact,
    has_photos: parameters.hasPhotos,
  });
}
