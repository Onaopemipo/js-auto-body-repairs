import { ArrowUpRight, Clock3, MapPin } from "lucide-react";

import { ContactMap } from "@/components/contact/contact-map";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { contactConfig } from "@/config/contact";

export function LocationPreview() {
  return (
    <section className="section-spacing border-t border-white/10">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
          <div className="flex flex-col justify-center">
            <p className="eyebrow">Workshop location</p>

            <h2 className="display-heading mt-5 text-4xl leading-[1.06] sm:text-5xl">
              Bring your vehicle to our Redland Bay workshop for a professional
              assessment.
            </h2>

            <p className="body-copy mt-6 text-base">
              We inspect collision damage, discuss the repair process and
              provide honest advice with an obligation-free quote. Conveniently
              located in Redland Bay, we serve customers throughout the Redlands
              and South East Queensland.
            </p>

            <div className="mt-8 space-y-4 text-sm text-white/72">
              <div className="flex items-start gap-3">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-[var(--brand-primary-hover)]"
                />

                <span>{contactConfig.address.formatted}</span>
              </div>

              <div className="flex items-start gap-3">
                <Clock3
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-[var(--brand-primary-hover)]"
                />

                <span>
                  {contactConfig.hoursSummary.weekdays}
                  <br />
                  {contactConfig.hoursSummary.weekends}
                </span>
              </div>
            </div>

            <ButtonLink
              href="/contact"
              variant="secondary"
              size="large"
              className="group mt-8 w-fit"
              data-analytics-event="quote_cta_click"
              data-analytics-label="Contact the workshop"
              data-analytics-location="homepage_location"
            >
              Contact the workshop
              <ArrowUpRight
                aria-hidden="true"
                className="ml-2 size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </ButtonLink>
          </div>

          <div className="min-h-[32rem]">
            <ContactMap />
          </div>
        </div>
      </Container>
    </section>
  );
}
