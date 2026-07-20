import { ArrowDown, ArrowUpRight, BadgeCheck, ShieldCheck } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { brandConfig } from "@/config/brand";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-var(--header-height))] overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,8,9,0.98)_0%,rgba(8,8,9,0.90)_44%,rgba(8,8,9,0.42)_72%,rgba(8,8,9,0.84)_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(231,7,11,0.22),transparent_28%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-[58%] opacity-85"
      >
        <div className="absolute left-[10%] top-[16%] h-[68%] w-[80%] rounded-[48%_52%_42%_58%/56%_44%_56%_44%] border border-white/10 bg-[linear-gradient(145deg,#242427_0%,#0e0e10_38%,#e7070b_39%,#7d0508_55%,#161618_56%,#080809_100%)] shadow-[0_50px_120px_rgba(0,0,0,0.65)]" />

        <div className="absolute left-[20%] top-[30%] h-[24%] w-[52%] skew-x-[-14deg] rounded-[45%] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.18),rgba(24,24,26,0.85))]" />

        <div className="absolute bottom-[15%] left-[14%] h-28 w-28 rounded-full border-[18px] border-[#111114] bg-[#55555a] shadow-[0_0_0_8px_rgba(255,255,255,0.06)] sm:h-36 sm:w-36" />

        <div className="absolute bottom-[15%] right-[13%] h-28 w-28 rounded-full border-[18px] border-[#111114] bg-[#55555a] shadow-[0_0_0_8px_rgba(255,255,255,0.06)] sm:h-36 sm:w-36" />

        <div className="absolute bottom-[12%] left-[8%] h-1 w-[78%] bg-[linear-gradient(90deg,transparent,rgba(231,7,11,0.7),transparent)] blur-sm" />
      </div>

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
