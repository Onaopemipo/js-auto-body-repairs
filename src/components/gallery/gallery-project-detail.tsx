import { PortableText } from "@portabletext/react";
import { ArrowLeft, CalendarDays, CarFront } from "lucide-react";
import Link from "next/link";

import { GalleryImage } from "@/components/gallery/gallery-image";
import { ProjectImageCollection } from "@/components/gallery/project-image-collection";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import {
  getGalleryCategoryLabel,
  getVehicleLabel,
} from "@/lib/gallery/gallery-labels";
import type { CmsGalleryProject } from "@/lib/gallery/cms-gallery-types";

interface GalleryProjectDetailProps {
  project: CmsGalleryProject;
}

function formatProjectDate(date?: string) {
  if (!date) {
    return null;
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

export function GalleryProjectDetail({ project }: GalleryProjectDetailProps) {
  const vehicleLabel = getVehicleLabel(project.vehicle);

  const completionDate = formatProjectDate(
    project.completionDate ?? project.publishedAt,
  );

  return (
    <>
      <section className="border-b border-white/10 pb-16 pt-12 sm:pb-20 sm:pt-16">
        <Container>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-white"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to our work
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="eyebrow">
                {getGalleryCategoryLabel(project.serviceCategory)}
              </p>

              <h1 className="display-heading mt-5 text-4xl leading-[1.04] sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>

              <p className="body-copy mt-6 text-base">{project.summary}</p>

              <div className="mt-8 space-y-3 text-sm text-white/58">
                {vehicleLabel ? (
                  <div className="flex items-center gap-3">
                    <CarFront
                      aria-hidden="true"
                      className="size-4 text-[var(--brand-primary-hover)]"
                    />

                    <span>{vehicleLabel}</span>
                  </div>
                ) : null}

                {completionDate ? (
                  <div className="flex items-center gap-3">
                    <CalendarDays
                      aria-hidden="true"
                      className="size-4 text-[var(--brand-primary-hover)]"
                    />

                    <span>Completed {completionDate}</span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-black/30">
              <GalleryImage
                image={project.coverImage}
                preset="hero"
                sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 56vw, calc(100vw - 2rem)"
                quality={82}
                retina={false}
                priority
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          {project.repairDetails?.length ? (
            <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr]">
              <div>
                <p className="eyebrow">Repair details</p>

                <h2 className="display-heading mt-5 text-3xl sm:text-4xl">
                  Work completed with precision.
                </h2>
              </div>

              <div className="max-w-none space-y-5 text-base leading-8 text-white/68">
                <PortableText value={project.repairDetails} />
              </div>
            </div>
          ) : null}

          <ProjectImageCollection
            title="Before repairs"
            description="Images documenting the vehicle condition before repair work began."
            images={project.beforeImages}
          />

          <ProjectImageCollection
            title="Completed repairs"
            description="The vehicle after panel repair, preparation, refinishing and final quality inspection."
            images={project.afterImages}
          />

          <div className="mt-20 border border-white/10 bg-white/[0.03] px-6 py-10 sm:px-10 sm:py-12">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="eyebrow">Need a professional assessment?</p>

                <h2 className="display-heading mt-4 text-3xl sm:text-4xl">
                  Let us assess your vehicle and explain the next step.
                </h2>
              </div>

              <ButtonLink
                href="/request-estimate"
                size="large"
                data-analytics-event="quote_cta_click"
                data-analytics-label="Request a free quote"
                data-analytics-location="gallery_project_detail"
              >
                Request a free quote
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
