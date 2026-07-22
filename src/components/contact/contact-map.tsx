"use client";

import { ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";

import { contactConfig } from "@/config/contact";

export function ContactMap() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="relative min-h-[32rem] overflow-hidden border border-white/10 bg-[linear-gradient(145deg,#202024,#0b0b0c)]">
      {!loaded ? (
        <div className="absolute inset-0 z-10 grid place-items-center bg-[linear-gradient(145deg,#202024,#0b0b0c)]">
          <div className="text-center">
            <MapPin
              aria-hidden="true"
              className="mx-auto size-8 animate-pulse text-[var(--brand-primary-hover)]"
            />

            <p className="mt-4 text-sm text-white/55">Loading workshop map…</p>
          </div>
        </div>
      ) : null}

      <iframe
        title="JS Auto Body Repairs workshop location"
        src={contactConfig.maps.embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        onLoad={() => {
          setLoaded(true);
        }}
        className="absolute inset-0 h-full w-full border-0 grayscale-[0.25] contrast-[1.05]"
      />

      <div className="absolute inset-x-4 bottom-4 z-20 border border-white/10 bg-black/80 p-5 backdrop-blur-xl sm:inset-x-6 sm:bottom-6">
        <p className="text-sm font-semibold">
          {contactConfig.address.formatted}
        </p>

        <div className="mt-3 flex flex-wrap gap-4">
          <a
            href={contactConfig.maps.directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.075em] text-[var(--brand-primary-hover)] hover:text-white"
          >
            Get directions
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>

          <a
            href={contactConfig.maps.searchUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.075em] text-white/55 hover:text-white"
          >
            Open in Google Maps
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>
        </div>

        <noscript>
          <p className="mt-3 text-sm text-white/55">
            The interactive map requires JavaScript. Use the directions link to
            open this address in Google Maps.
          </p>
        </noscript>
      </div>
    </section>
  );
}
