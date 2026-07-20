import { ArrowRight, ShieldCheck, Wrench } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function HomePage() {
  return (
    <section className="section-spacing">
      <Container>
        <div className="grid min-h-[62svh] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow">Foundation preview</p>
            <h1 className="display-heading mt-6 max-w-4xl text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
              JS Auto Body Repairs
            </h1>
            <p className="body-copy mt-7 max-w-2xl text-base sm:text-lg">
              The production foundation is now in place. The final homepage
              design, photography and scroll-driven 3D experience will be
              introduced in later phases.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/request-estimate" size="large">
                Request an estimate
                <ArrowRight aria-hidden="true" className="ml-2 size-4" />
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary" size="large">
                Explore services
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-[var(--radius-large)] border border-[var(--border-subtle)] bg-[var(--surface)] p-7 shadow-[var(--shadow-elevated)] sm:p-10">
            <p className="eyebrow">System status</p>
            <div className="mt-7 space-y-5">
              <div className="flex gap-4 border-b border-[var(--border-subtle)] pb-5">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-[var(--brand-primary-hover)]"
                />
                <div>
                  <h2 className="font-semibold">Accessible site shell</h2>
                  <p className="body-copy mt-2 text-sm">
                    Responsive navigation, keyboard support and reduced-motion
                    handling.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Wrench
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-[var(--brand-primary-hover)]"
                />
                <div>
                  <h2 className="font-semibold">Reusable architecture</h2>
                  <p className="body-copy mt-2 text-sm">
                    Shared tokens, layout primitives and configuration are ready
                    for the full branded design.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
