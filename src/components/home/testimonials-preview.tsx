import { Quote } from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";
import { Container } from "@/components/ui/container";
import { homepageTestimonials } from "@/data/homepage";

export function TestimonialsPreview() {
  return (
    <section className="section-spacing border-y border-white/10 bg-[var(--page-background-elevated)]">
      <Container>
        <SectionHeading
          eyebrow="Customer perspective"
          title="Professional work is remembered in the details."
          description="These are temporary testimonial placeholders until verified customer reviews are supplied."
          align="center"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {homepageTestimonials.map(({ quote, name, service }) => (
            <figure
              key={quote}
              className="border border-white/10 bg-black/20 p-7"
            >
              <Quote
                aria-hidden="true"
                className="size-6 text-[var(--brand-primary-hover)]"
              />

              <blockquote className="mt-7 text-lg leading-8 text-white/84">
                “{quote}”
              </blockquote>

              <figcaption className="mt-8 border-t border-white/10 pt-5">
                <p className="font-semibold">{name}</p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {service}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
