import type { Metadata } from "next";
import { Clock3, MapPin, Phone } from "lucide-react";

import { PageHero } from "@/components/pages/page-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact JS Auto Body Repairs at 816 German Church Road, Redland Bay QLD 4165.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={siteContent.contact.title}
        description={siteContent.contact.description}
      />
      <section className="section-spacing">
        <Container className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <div className="space-y-5">
              <div className="flex gap-4 border-b border-white/10 pb-5">
                <MapPin
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-[var(--brand-primary-hover)]"
                />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="body-copy mt-2 text-sm">
                    {siteContent.business.address}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 border-b border-white/10 pb-5">
                <Phone
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-[var(--brand-primary-hover)]"
                />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a
                    href={siteContent.business.phoneHref}
                    className="body-copy mt-2 block text-sm hover:text-white"
                  >
                    {siteContent.business.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock3
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-[var(--brand-primary-hover)]"
                />
                <div>
                  <p className="font-semibold">Opening hours</p>
                  <p className="body-copy mt-2 text-sm">
                    {siteContent.business.hours.weekdays}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/request-estimate">
                Request a free quote
              </ButtonLink>
              <a
                href={siteContent.business.phoneHref}
                className="inline-flex min-h-12 items-center justify-center border border-white/20 px-5 text-xs font-bold uppercase tracking-[0.075em] transition hover:border-white/40"
              >
                Call now
              </a>
            </div>
          </div>
          <div className="relative min-h-[30rem] overflow-hidden border border-white/10 bg-[linear-gradient(145deg,#202024,#0b0b0c)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px]"
            />
            <div className="absolute inset-x-6 bottom-6 border border-white/10 bg-black/65 p-6 backdrop-blur-xl">
              <p className="eyebrow">Google Maps</p>
              <p className="body-copy mt-3 text-sm">
                Live map and directions integration will be added in the next
                contact phase.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
