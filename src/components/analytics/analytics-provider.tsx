"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { analyticsConfig } from "@/config/analytics";
import { readAnalyticsConsent } from "@/lib/analytics/consent";
import { trackAnalyticsEvent, trackPageView } from "@/lib/analytics/events";
import type { AnalyticsConsent } from "@/types/analytics";

function initialiseDataLayer() {
  window.dataLayer = window.dataLayer || [];

  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function updateConsent(consent: AnalyticsConsent) {
  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("consent", "update", {
    analytics_storage: consent === "granted" ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function AnalyticsProvider() {
  const pathname = usePathname();

  const [consent, setConsent] = useState<AnalyticsConsent>(() =>
    readAnalyticsConsent(),
  );

  const [analyticsReady, setAnalyticsReady] = useState(false);

  useEffect(() => {
    initialiseDataLayer();

    updateConsent(consent);

    function handleConsentChange(event: Event) {
      const customEvent = event as CustomEvent<{
        status: AnalyticsConsent;
      }>;

      const status = customEvent.detail?.status ?? readAnalyticsConsent();

      setConsent(status);
      updateConsent(status);

      if (status !== "granted") {
        setAnalyticsReady(false);
      }
    }

    window.addEventListener(
      analyticsConfig.consentChangedEvent,
      handleConsentChange,
    );

    return () => {
      window.removeEventListener(
        analyticsConfig.consentChangedEvent,
        handleConsentChange,
      );
    };
  }, []);

  useEffect(() => {
    function handleTrackedClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const trackedElement = target.closest<HTMLElement>(
        "[data-analytics-event]",
      );

      if (!trackedElement) {
        return;
      }

      const eventName = trackedElement.dataset.analyticsEvent;

      if (!eventName) {
        return;
      }

      trackAnalyticsEvent(eventName, {
        event_label: trackedElement.dataset.analyticsLabel,
        event_location: trackedElement.dataset.analyticsLocation,
        link_url:
          trackedElement instanceof HTMLAnchorElement
            ? trackedElement.href
            : undefined,
      });
    }

    document.addEventListener("click", handleTrackedClick);

    return () => {
      document.removeEventListener("click", handleTrackedClick);
    };
  }, []);

  useEffect(() => {
    if (analyticsReady && consent === "granted") {
      trackPageView(pathname);
    }
  }, [analyticsReady, consent, pathname]);

  const shouldLoadAnalytics = analyticsConfig.enabled && consent === "granted";

  return (
    <>
      {shouldLoadAnalytics ? (
        <>
          <Script
            id="google-analytics-script"
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.measurementId}`}
            strategy="afterInteractive"
            onLoad={() => {
              window.gtag("js", new Date());

              window.gtag("config", analyticsConfig.measurementId, {
                send_page_view: false,
                anonymize_ip: true,
              });

              setAnalyticsReady(true);
            }}
          />
        </>
      ) : null}
    </>
  );
}
