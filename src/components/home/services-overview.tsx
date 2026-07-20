import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/home/section-heading";
import { Container } from "@/components/ui/container";
import { homepageServices } from "@/data/homepage";

export function ServicesOverview() {
  return (
    <section id="services" className="section-spacing border-b border-white/10">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <SectionHeading
            eyebrow="Core services"
            title="Repair expertise built around the complete vehicle."
            description="The strongest repair result comes from treating assessment, bodywork and refinishing as one connected process."
          />

          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {homepageServices.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="group bg-[var(--page-background-elevated)] p-7 transition duration-300 hover:bg-[var(--surface)] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center border border-white/10 bg-white/[0.035] text-[var(--brand-primary-hover)]">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>

                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 text-white/25 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </div>

                <h3 className="mt-8 text-xl font-semibold">{title}</h3>

                <p className="body-copy mt-4 text-sm">{description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-[var(--brand-primary-hover)]"
          >
            Explore all services
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
