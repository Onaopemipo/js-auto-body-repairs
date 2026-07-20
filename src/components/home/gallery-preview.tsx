import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/home/section-heading";
import { Container } from "@/components/ui/container";

const projects = [
  {
    label: "Front-end collision",
    className:
      "bg-[linear-gradient(145deg,#202024_0%,#080809_46%,#e7070b_47%,#650407_64%,#151517_65%)]",
  },
  {
    label: "Panel restoration",
    className:
      "bg-[linear-gradient(135deg,#3a3a3e_0%,#101012_38%,#77777d_39%,#1d1d20_64%,#09090a_65%)]",
  },
  {
    label: "Paint refinishing",
    className:
      "bg-[linear-gradient(155deg,#111113_0%,#a50303_38%,#ff171b_50%,#4b0305_65%,#080809_66%)]",
  },
] as const;

export function GalleryPreview() {
  return (
    <section className="section-spacing">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Repairs that show the difference between covering damage and restoring a vehicle."
            description="These placeholders define the gallery composition. Final photography and before-and-after media will replace them later."
          />

          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-[var(--brand-primary-hover)]"
          >
            View full gallery
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <article className="group relative min-h-[31rem] overflow-hidden border border-white/10 bg-[linear-gradient(145deg,#222226_0%,#09090a_42%,#e7070b_43%,#690407_61%,#151517_62%)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_58%_38%,rgba(255,255,255,0.14),transparent_26%)]"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-8 pt-28">
              <div className="flex items-center gap-2 text-[var(--brand-primary-hover)]">
                <Sparkles aria-hidden="true" className="size-4" />
                <span className="text-xs font-bold uppercase tracking-[0.14em]">
                  Featured repair
                </span>
              </div>

              <h3 className="mt-4 text-3xl font-semibold">
                Collision restoration
              </h3>
            </div>
          </article>

          <div className="grid gap-5">
            {projects.slice(1).map(({ label, className }) => (
              <article
                key={label}
                className={`relative min-h-60 overflow-hidden border border-white/10 ${className}`}
              >
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-6 pt-20">
                  <h3 className="text-xl font-semibold">{label}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
