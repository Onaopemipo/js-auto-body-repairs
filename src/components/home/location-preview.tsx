import { ArrowUpRight, Clock3, MapPin } from "lucide-react";

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
              We inspect collision damage, discuss the repair process, and
              provide honest advice with an obligation-free quote. Conveniently
              located in Redland Bay, we serve customers throughout the Redlands
              and South East Queensland.
            </p>

            <div className="mt-8 space-y-4 text-sm text-white/72">
              <div className="flex items-center gap-3">
                <MapPin
                  aria-hidden="true"
                  className="size-4 text-[var(--brand-primary-hover)]"
                />
                <span>{contactConfig.address.formatted}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock3
                  aria-hidden="true"
                  className="size-4 text-[var(--brand-primary-hover)]"
                />
                <span>{`${contactConfig.hoursSummary.weekdays} • ${contactConfig.hoursSummary.weekends}`}</span>
              </div>
            </div>

            <ButtonLink
              href="/contact"
              variant="secondary"
              size="large"
              className="group mt-8 w-fit"
            >
              Contact the workshop
              <ArrowUpRight
                aria-hidden="true"
                className="ml-2 size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </ButtonLink>
          </div>

          <div className="relative min-h-[26rem] overflow-hidden border border-white/10 bg-[linear-gradient(145deg,#202024,#0b0b0c)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px]"
            />

            <div
              aria-hidden="true"
              className="absolute left-[44%] top-[38%] size-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brand-primary)]/18 blur-2xl"
            />

            <div className="absolute left-[44%] top-[38%] -translate-x-1/2 -translate-y-1/2">
              <div className="grid size-16 place-items-center rounded-full border-8 border-white/10 bg-[var(--brand-primary)] shadow-[0_18px_45px_rgba(231,7,11,0.34)]">
                <MapPin aria-hidden="true" className="size-6 text-white" />
              </div>
            </div>

            <div className="absolute inset-x-6 bottom-6 border border-white/10 bg-black/60 p-5 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-primary-hover)]">
                Google Maps placeholder
              </p>

              <p className="mt-2 text-sm text-white/68">
                Live map, route planning and location finder integration will be
                added in the contact phase.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
