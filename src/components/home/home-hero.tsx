import { HeroPhotographicMedia } from "@/components/hero-media/hero-photographic-media";
import { ArrowDown, ArrowUpRight, BadgeCheck, ShieldCheck } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { brandConfig } from "@/config/brand";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-var(--header-height))] overflow-hidden">
      <HeroPhotographicMedia />

      <Container className="relative flex min-h-[calc(100svh-var(--header-height))] items-center py-16 sm:py-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 border border-white/12 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
            <BadgeCheck
              aria-hidden="true"
              className="size-4 text-[var(--brand-primary-hover)]"
            />

            <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/72">
              Professional auto body repair
            </span>
          </div>

          <p className="eyebrow mt-10">{brandConfig.strapline}</p>

          <h1 className="display-heading mt-6 max-w-4xl text-5xl leading-[0.98] sm:text-6xl lg:text-8xl">
            Collision damage repaired with precision.
          </h1>

          <p className="body-copy mt-7 max-w-2xl text-base sm:text-lg lg:text-xl">
            Clear assessment, disciplined body repair and refined paint
            finishing for vehicles that need more than a cosmetic fix.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/request-estimate" size="large" className="group">
              Request an estimate
              <ArrowUpRight
                aria-hidden="true"
                className="ml-2 size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </ButtonLink>

            <ButtonLink href="/gallery" variant="secondary" size="large">
              View completed repairs
            </ButtonLink>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-sm text-white/60">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck
                aria-hidden="true"
                className="size-4 text-[var(--brand-primary-hover)]"
              />
              Repair planning
            </span>

            <span className="inline-flex items-center gap-2">
              <BadgeCheck
                aria-hidden="true"
                className="size-4 text-[var(--brand-primary-hover)]"
              />
              Quality checks
            </span>
          </div>
        </div>
      </Container>

      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/45 transition hover:text-white md:flex"
      >
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em]">
          Explore
        </span>
        <ArrowDown aria-hidden="true" className="size-4 animate-bounce" />
      </a>
    </section>
  );
}
