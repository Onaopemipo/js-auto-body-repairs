import { ArrowUpRight, ClipboardCheck, ShieldCheck } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export function InsuranceSupport() {
  return (
    <section className="section-spacing">
      <Container>
        <div className="relative overflow-hidden border border-white/10 bg-[linear-gradient(120deg,#111113_0%,#0b0b0c_56%,#430305_100%)] p-8 sm:p-12 lg:p-16">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 size-72 rounded-full bg-[var(--brand-primary)]/15 blur-3xl"
          />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="eyebrow">Accident and insurance support</p>

              <h2 className="display-heading mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Clear repair information when the process already feels
                complicated.
              </h2>

              <p className="body-copy mt-6 max-w-2xl text-base sm:text-lg">
                Damage documentation, repair scope and practical communication
                can make the approval process easier to understand.
              </p>

              <ButtonLink href="/contact" size="large" className="group mt-8">
                Discuss your repair
                <ArrowUpRight
                  aria-hidden="true"
                  className="ml-2 size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </ButtonLink>
            </div>

            <div className="grid gap-4">
              <div className="flex gap-4 border border-white/10 bg-black/20 p-5">
                <ClipboardCheck
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-[var(--brand-primary-hover)]"
                />
                <div>
                  <h3 className="font-semibold">Damage documentation</h3>
                  <p className="body-copy mt-2 text-sm">
                    A clearer record of the visible repair requirements.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border border-white/10 bg-black/20 p-5">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-[var(--brand-primary-hover)]"
                />
                <div>
                  <h3 className="font-semibold">Practical guidance</h3>
                  <p className="body-copy mt-2 text-sm">
                    Straightforward explanations about the next repair steps.
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
