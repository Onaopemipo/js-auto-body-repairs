import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export function PageCta({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="border-t border-white/10 bg-[var(--brand-primary)]">
      <Container className="grid gap-8 py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:py-16">
        <div>
          <h2 className="display-heading text-4xl leading-[1.05] text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-white/75">{description}</p>
        </div>
        <ButtonLink
          href="/request-estimate"
          variant="secondary"
          size="large"
          className="group border-white/40 bg-black/15"
        >
          Get a free quote
          <ArrowUpRight
            aria-hidden="true"
            className="ml-2 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </ButtonLink>
      </Container>
    </section>
  );
}
