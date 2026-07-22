import { CircleHelp } from "lucide-react";

import { Container } from "@/components/ui/container";
import { serviceFaqs } from "@/content/seo/service-faqs";

export function ServiceFaqSection() {
  return (
    <section className="section-spacing border-t border-white/10 bg-white/[0.02]">
      <Container>
        <div className="max-w-3xl">
          <p className="eyebrow">Common questions</p>

          <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">
            Before you book your repair.
          </h2>

          <p className="body-copy mt-5">
            Straightforward information about the workshop, services and quote
            process.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-2">
          {serviceFaqs.map((faq) => (
            <article
              key={faq.question}
              className="bg-[var(--page-background-elevated)] p-7 sm:p-9"
            >
              <CircleHelp
                aria-hidden="true"
                className="size-5 text-[var(--brand-primary-hover)]"
              />

              <h3 className="mt-5 text-xl font-semibold">{faq.question}</h3>

              <p className="body-copy mt-4 text-sm leading-7">{faq.answer}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
