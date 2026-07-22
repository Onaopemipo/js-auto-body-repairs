import { ArrowUpRight, Navigation, Phone } from "lucide-react";

import { CopyAddress } from "@/components/contact/copy-address";
import { ButtonLink } from "@/components/ui/button-link";
import { contactConfig } from "@/config/contact";

export function ContactActions() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <ButtonLink
        href="/request-estimate"
        className="group"
        data-analytics-event="quote_cta_click"
        data-analytics-label="contact_page_request_quote"
        data-analytics-location="contact_page"
      >
        Request quote
        <ArrowUpRight
          aria-hidden="true"
          className="ml-2 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </ButtonLink>

      <a
        href={contactConfig.phone.href}
        data-analytics-event="phone_click"
        data-analytics-label="contact_page_phone"
        data-analytics-location="contact_page"
        className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/20 bg-white/[0.03] px-5 text-xs font-bold uppercase tracking-[0.075em] text-white transition hover:border-white/45 hover:bg-white/[0.06]"
      >
        <Phone aria-hidden="true" className="size-4" />
        Call now
      </a>

      <a
        href={contactConfig.maps.directionsUrl}
        data-analytics-event="directions_click"
        data-analytics-label="contact_page_directions"
        data-analytics-location="contact_page"
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/20 bg-white/[0.03] px-5 text-xs font-bold uppercase tracking-[0.075em] text-white transition hover:border-white/45 hover:bg-white/[0.06]"
      >
        <Navigation aria-hidden="true" className="size-4" />
        Get directions
      </a>

      <CopyAddress />
    </div>
  );
}
