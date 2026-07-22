import type { useReportWebVitals } from "next/web-vitals";
import { trackAnalyticsEvent } from "@/lib/analytics/events";

type ReportWebVitalsCallback = Parameters<typeof useReportWebVitals>[0];

type WebVitalMetric = Parameters<ReportWebVitalsCallback>[0];

const supportedMetrics = new Set(["CLS", "FCP", "FID", "INP", "LCP", "TTFB"]);

export const reportWebVital: ReportWebVitalsCallback = (
  metric: WebVitalMetric,
) => {
  if (!supportedMetrics.has(metric.name)) {
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.info(`[Web Vital] ${metric.name}`, {
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      navigationType: metric.navigationType,
    });
  }

  trackAnalyticsEvent("web_vital", {
    metric_name: metric.name,
    metric_value: Math.round(
      metric.name === "CLS" ? metric.value * 1000 : metric.value,
    ),
    metric_rating: metric.rating,
    metric_id: metric.id,
    navigation_type: metric.navigationType,
  });

  const endpoint = process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT;

  if (!endpoint || typeof window === "undefined") {
    return;
  }

  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
    pathname: window.location.pathname,
  });

  if (typeof navigator.sendBeacon === "function") {
    navigator.sendBeacon(endpoint, body);

    return;
  }

  void fetch(endpoint, {
    method: "POST",
    body,
    keepalive: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
