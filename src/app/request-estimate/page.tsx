import type { Metadata } from "next";

import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Request a Free Quote",
  description:
    "Request a free vehicle repair quote from JS Auto Body Repairs in Redland Bay.",
};

export default function RequestEstimatePage() {
  return (
    <>
      <PageHero
        eyebrow="Free quote"
        title={siteContent.quote.title}
        description={siteContent.quote.description}
      />
      <section className="section-spacing">
        <Container>
          <div className="mx-auto max-w-3xl border border-white/10 bg-[var(--page-background-elevated)] p-8 sm:p-10">
            <p className="eyebrow">Quote form coming next</p>
            <h2 className="mt-5 text-3xl font-semibold">
              Tell us about your vehicle.
            </h2>
            <p className="body-copy mt-5">
              The next phase will add the complete quote form, including contact
              details, vehicle information, repair description and photo
              uploads.
            </p>
            <a
              href={siteContent.business.phoneHref}
              className="mt-8 inline-flex min-h-12 items-center justify-center bg-[var(--brand-primary)] px-5 text-xs font-bold uppercase tracking-[0.075em] text-white"
            >
              Call {siteContent.business.phoneDisplay}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
