"use client";

import { useReportWebVitals } from "next/web-vitals";

import { reportWebVital } from "@/lib/performance/report-web-vital";

export function WebVitalsReporter() {
  useReportWebVitals(reportWebVital);

  return null;
}
