import type { Metadata } from "next";
import { Quote } from "lucide-react";

import { PageCta } from "@/components/pages/page-cta";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read customer experiences and Google reviews for JS Auto Body Repairs in Redland Bay.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Customer reviews"
        title="What our customers say"
        description="Our reputation has been built through workmanship, communication and repair results that customers are happy to recommend."
      />
      <section className="section-spacing">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {siteContent.testimonials.map((review) => (
              <figure
                key={`${review.author}-${review.quote}`}
                className="border border-white/10 bg-[var(--page-background-elevated)] p-8"
              >
                <Quote
                  aria-hidden="true"
                  className="size-6 text-[var(--brand-primary-hover)]"
                />
                <blockquote className="mt-7 text-lg leading-8 text-white/82">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-8 border-t border-white/10 pt-5 text-sm font-semibold">
                  {review.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
      <PageCta
        title="Ready to discuss your repair?"
        description="Contact JS Auto Body Repairs for honest advice and a free quote."
      />
    </>
  );
}
