import { Camera, Clock3, Phone, ShieldCheck } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

import { QuoteRequestForm } from "@/components/forms/quote-request-form";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site-content";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

export const metadata = buildPageMetadata({
  title: "Request a Free Repair Quote",
  description:
    "Request a free vehicle repair quote from JS Auto Body Repairs in Redland Bay and upload photos of the required work.",
  path: "/request-estimate",
});

export default function RequestEstimatePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Request a Free Quote", path: "/request-estimate" },
        ]}
      />

      <PageHero
        eyebrow="Free quote"
        title={siteContent.quote.title}
        description={siteContent.quote.description}
      />

      <section className="section-spacing">
        <Container className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <aside>
            <p className="eyebrow">Before you start</p>

            <h2 className="mt-5 text-3xl font-semibold">
              Clear details help us assess the next step.
            </h2>

            <div className="mt-8 space-y-7">
              <div className="flex gap-4">
                <Camera
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-[var(--brand-primary-hover)]"
                />

                <div>
                  <h3 className="font-semibold">Include useful photos</h3>

                  <p className="body-copy mt-2 text-sm">
                    Add a wide image of the vehicle and closer photos of the
                    affected area.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-[var(--brand-primary-hover)]"
                />

                <div>
                  <h3 className="font-semibold">Be specific</h3>

                  <p className="body-copy mt-2 text-sm">
                    Explain where the damage is, how it happened and whether the
                    vehicle is driveable.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock3
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-[var(--brand-primary-hover)]"
                />

                <div>
                  <h3 className="font-semibold">Initial assessment</h3>

                  <p className="body-copy mt-2 text-sm">
                    A website request helps us understand the job, but a
                    workshop inspection may still be required before a final
                    price is confirmed.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 border-l-2 border-[var(--brand-primary)] pl-5">
              <p className="text-sm text-white/60">
                Prefer to speak with the workshop?
              </p>

              <a
                href={siteContent.business.phoneHref}
                className="mt-2 inline-flex items-center gap-2 font-semibold"
              >
                <Phone
                  aria-hidden="true"
                  className="size-4 text-[var(--brand-primary-hover)]"
                />

                {siteContent.business.phoneDisplay}
              </a>
            </div>
          </aside>

          <div className="border border-white/10 bg-[var(--page-background-elevated)] p-6 sm:p-9">
            <QuoteRequestForm />
          </div>
        </Container>
      </section>
    </>
  );
}
