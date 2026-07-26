"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { analyticsConfig } from "@/config/analytics";
import {
  trackAnalyticsEvent,
  trackPageView,
} from "@/lib/analytics/events";
import {
  useAnalyticsConsent,
} from "@/lib/analytics/use-analytics-consent";
import type {
  AnalyticsConsent,
} from "@/types/analytics";

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

  const analyticsStorage =
    consent === "granted" ? "granted" : "denied";

  window.gtag("consent", "update", {
    analytics_storage: analyticsStorage,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  window.dataLayer.push({
    event:
      consent === "granted"
        ? "analytics_consent_granted"
        : "analytics_consent_denied",
    analytics_consent: consent,
  });
}

function createGtmLoader(containerId: string) {
  return `
    (function(w,d,s,l,i){
      w[l]=w[l]||[];
      w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });

      var firstScript=d.getElementsByTagName(s)[0];
      var script=d.createElement(s);
      var layer=l!='dataLayer'?'&l='+l:'';

      script.async=true;
      script.src=
        'https://www.googletagmanager.com/gtm.js?id='+
        i+layer;

      firstScript.parentNode.insertBefore(
        script,
        firstScript
      );
    })(
      window,
      document,
      'script',
      'dataLayer',
      '${containerId}'
    );
  `;
}

export function AnalyticsProvider() {
  const pathname = usePathname();
  const consent = useAnalyticsConsent();

  const shouldLoadAnalytics =
    analyticsConfig.enabled &&
    consent === "granted";

  useEffect(() => {
    initialiseDataLayer();
  }, []);

  useEffect(() => {
    updateConsent(consent);
  }, [consent]);

  useEffect(() => {
    if (consent === "granted") {
      trackPageView(pathname);
    }
  }, [consent, pathname]);

  useEffect(() => {
    function handleTrackedClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const trackedElement =
        target.closest<HTMLElement>(
          "[data-analytics-event]",
        );

      if (!trackedElement) {
        return;
      }

      const eventName =
        trackedElement.dataset.analyticsEvent;

      if (!eventName) {
        return;
      }

      trackAnalyticsEvent(eventName, {
        event_label:
          trackedElement.dataset.analyticsLabel,
        event_location:
          trackedElement.dataset.analyticsLocation,
        link_url:
          trackedElement instanceof HTMLAnchorElement
            ? trackedElement.href
            : undefined,
      });
    }

    document.addEventListener(
      "click",
      handleTrackedClick,
    );

    return () => {
      document.removeEventListener(
        "click",
        handleTrackedClick,
      );
    };
  }, []);

  if (!shouldLoadAnalytics) {
    return null;
  }

  return (
    <Script
      id="google-tag-manager"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: createGtmLoader(
          analyticsConfig.containerId,
        ),
      }}
    />
  );
}
