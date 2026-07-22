import type { Metadata } from "next";
import { Clock3, MapPin, Phone } from "lucide-react";

import { BusinessHours } from "@/components/contact/business-hours";
import { ContactActions } from "@/components/contact/contact-actions";
import { ContactMap } from "@/components/contact/contact-map";
import { LocalBusinessSchema } from "@/components/contact/local-business-schema";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${contactConfig.businessName} at ${contactConfig.address.formatted}. Call ${contactConfig.phone.display} for panel beating, collision repair and auto refinishing enquiries.`,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact ${contactConfig.businessName}`,
    description: `Visit the Redland Bay workshop at ${contactConfig.address.formatted}.`,
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <LocalBusinessSchema />

      <PageHero
        eyebrow="Contact"
        title={siteContent.contact.title}
        description={siteContent.contact.description}
      />

      <section className="section-spacing">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.74fr_1.26fr] lg:gap-14">
            <div className="space-y-8">
              <section className="border border-white/10 bg-[var(--page-background-elevated)] p-6 sm:p-8">
                <h2 className="text-2xl font-semibold">Workshop details</h2>

                <div className="mt-7 space-y-6">
                  <div className="flex gap-4 border-b border-white/10 pb-6">
                    <MapPin
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-[var(--brand-primary-hover)]"
                    />

                    <div>
                      <p className="font-semibold">Address</p>

                      <address className="body-copy mt-2 text-sm not-italic">
                        {contactConfig.address.formatted}
                      </address>
                    </div>
                  </div>

                  <div className="flex gap-4 border-b border-white/10 pb-6">
                    <Phone
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-[var(--brand-primary-hover)]"
                    />

                    <div>
                      <p className="font-semibold">Phone</p>

                      <a
                        href={contactConfig.phone.href}
                        className="body-copy mt-2 block text-sm hover:text-white"
                      >
                        {contactConfig.phone.display}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Clock3
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-[var(--brand-primary-hover)]"
                    />

                    <div>
                      <p className="font-semibold">Regular hours</p>

                      <p className="body-copy mt-2 text-sm">
                        Monday – Friday: 8:30 AM – 4:30 PM
                      </p>

                      <p className="body-copy mt-1 text-sm">
                        Saturday – Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <BusinessHours />
            </div>

            <ContactMap />
          </div>

          <div className="mt-8">
            <ContactActions />
          </div>
        </Container>
      </section>
    </>
  );
}
