"use client";

import { BarChart3, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { analyticsConfig } from "@/config/analytics";
import {
  openAnalyticsPreferences,
  saveAnalyticsConsent,
} from "@/lib/analytics/consent";
import { useAnalyticsConsent } from "@/lib/analytics/use-analytics-consent";
import type { AnalyticsConsent } from "@/types/analytics";

export function AnalyticsConsentBanner() {
  const consent = useAnalyticsConsent();

  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const [managing, setManaging] = useState(false);

  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    function handleOpenPreferences() {
      setAnalyticsEnabled(consent === "granted");

      setManaging(true);
      setPreferencesOpen(true);
    }

    window.addEventListener(
      analyticsConfig.manageConsentEvent,
      handleOpenPreferences,
    );

    return () => {
      window.removeEventListener(
        analyticsConfig.manageConsentEvent,
        handleOpenPreferences,
      );
    };
  }, [consent]);

  function chooseConsent(status: Exclude<AnalyticsConsent, "unknown">) {
    saveAnalyticsConsent(status);

    setAnalyticsEnabled(status === "granted");

    setManaging(false);
    setPreferencesOpen(false);
  }

  const visible = consent === "unknown" || preferencesOpen;

  if (!visible) {
    return null;
  }

  return (
    <aside
      role="dialog"
      aria-modal="true"
      aria-labelledby="analytics-consent-title"
      aria-describedby="analytics-consent-description"
      className="fixed inset-x-4 bottom-20 z-[180] mx-auto max-w-3xl border border-white/15 bg-[#09090a]/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-7 lg:bottom-6"
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex gap-4">
          <div className="hidden size-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] sm:grid">
            <ShieldCheck
              aria-hidden="true"
              className="size-5 text-[var(--brand-primary-hover)]"
            />
          </div>

          <div>
            <h2 id="analytics-consent-title" className="text-xl font-semibold">
              Your privacy choices
            </h2>

            <p
              id="analytics-consent-description"
              className="body-copy mt-3 text-sm leading-6"
            >
              Essential website features always work. Optional analytics helps
              us understand website usage and quote enquiries. Google Analytics
              will not load unless you accept analytics.
            </p>

            <p className="mt-3 text-xs text-white/45">
              Read our{" "}
              <Link
                href="/cookies"
                className="underline underline-offset-4 transition hover:text-white"
              >
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 transition hover:text-white"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {managing ? (
          <button
            type="button"
            aria-label="Close privacy preferences"
            onClick={() => {
              setPreferencesOpen(false);
              setManaging(false);
            }}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 text-white/60 transition hover:border-white/30 hover:text-white"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        ) : null}
      </div>

      {managing ? (
        <div className="mt-6 border border-white/10 bg-white/[0.025] p-5">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="flex items-center gap-3">
                <BarChart3
                  aria-hidden="true"
                  className="size-4 text-[var(--brand-primary-hover)]"
                />

                <h3 className="font-semibold">Analytics</h3>
              </div>

              <p className="body-copy mt-2 text-sm">
                Allows anonymous website measurement, page-view reporting,
                conversion events and Core Web Vitals reporting.
              </p>
            </div>

            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                className="peer sr-only"
              />

              <span className="h-7 w-12 rounded-full bg-white/15 transition peer-checked:bg-[var(--brand-primary)]" />

              <span className="absolute left-1 size-5 rounded-full bg-white transition-transform peer-checked:translate-x-5" />

              <span className="sr-only">Allow analytics</span>
            </label>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                chooseConsent(analyticsEnabled ? "granted" : "denied")
              }
              className="inline-flex min-h-12 items-center justify-center bg-[var(--brand-primary)] px-5 text-xs font-bold uppercase tracking-[0.075em] text-white transition hover:bg-[var(--brand-primary-hover)]"
            >
              Save preferences
            </button>

            <button
              type="button"
              onClick={() => chooseConsent("denied")}
              className="inline-flex min-h-12 items-center justify-center border border-white/20 px-5 text-xs font-bold uppercase tracking-[0.075em] text-white transition hover:border-white/40"
            >
              Reject optional
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => chooseConsent("granted")}
            className="inline-flex min-h-12 items-center justify-center bg-[var(--brand-primary)] px-5 text-xs font-bold uppercase tracking-[0.075em] text-white transition hover:bg-[var(--brand-primary-hover)]"
          >
            Accept analytics
          </button>

          <button
            type="button"
            onClick={() => chooseConsent("denied")}
            className="inline-flex min-h-12 items-center justify-center border border-white/20 px-5 text-xs font-bold uppercase tracking-[0.075em] text-white transition hover:border-white/40"
          >
            Reject optional
          </button>

          <button
            type="button"
            onClick={openAnalyticsPreferences}
            className="inline-flex min-h-12 items-center justify-center px-5 text-xs font-bold uppercase tracking-[0.075em] text-white/65 transition hover:text-white"
          >
            Manage preferences
          </button>
        </div>
      )}
    </aside>
  );
}
