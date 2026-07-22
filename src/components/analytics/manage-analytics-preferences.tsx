"use client";

import { openAnalyticsPreferences } from "@/lib/analytics/consent";

export function ManageAnalyticsPreferences() {
  return (
    <button
      type="button"
      onClick={openAnalyticsPreferences}
      className="transition hover:text-white"
    >
      Privacy choices
    </button>
  );
}
