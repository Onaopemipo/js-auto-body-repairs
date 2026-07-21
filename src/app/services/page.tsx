import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { PageCta } from "@/components/pages/page-cta";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Collision repairs, paint refinishing, dent removal, maintenance, complex repairs, performance upgrades and AC regas in Redland Bay.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Complete repair and refinishing support for your vehicle."
        description="From collision damage and dent removal to paint refinishing, maintenance and complex repairs, our workshop provides practical solutions completed with care."
      />
      <section className="section-spacing">
        <Container>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
            {siteContent.services.map((service, index) => (
              <article
                key={service.slug}
                id={service.slug}
                className="group bg-[var(--page-background-elevated)] p-8 sm:p-10"
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="text-xs font-bold tracking-[0.16em] text-[var(--brand-primary-hover)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 text-white/25 transition group-hover:text-white"
                  />
                </div>
                <h2 className="mt-10 text-3xl font-semibold">
                  {service.title}
                </h2>
                <p className="mt-4 font-medium text-white/72">
                  {service.summary}
                </p>
                <p className="body-copy mt-5 text-sm leading-7">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <PageCta
        title="Not sure which service you need?"
        description="Get in touch and we will help you understand the most appropriate next step."
      />
    </>
  );
}
