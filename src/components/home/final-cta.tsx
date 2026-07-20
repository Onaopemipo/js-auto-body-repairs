import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export function FinalCta() {
  return (
    <section className="border-t border-white/10 bg-[var(--brand-primary)]">
      <Container className="grid gap-8 py-14 text-white lg:grid-cols-[1fr_auto] lg:items-center lg:py-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
            Ready for an assessment?
          </p>

          <h2 className="display-heading mt-4 max-w-4xl text-4xl leading-[1.05] sm:text-5xl">
            Start with clear information about the damage and the repair.
          </h2>
        </div>

        <ButtonLink
          href="/request-estimate"
          variant="secondary"
          size="large"
          className="group border-white/45 bg-black/18 hover:border-white"
        >
          Request estimate
          <ArrowUpRight
            aria-hidden="true"
            className="ml-2 size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </ButtonLink>
      </Container>
    </section>
  );
}
