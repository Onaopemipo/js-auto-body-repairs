import { ArrowUpRight, CalendarDays } from "lucide-react";
import Link from "next/link";

import { GalleryImage } from "@/components/gallery/gallery-image";
import {
  getGalleryCategoryLabel,
  getVehicleLabel,
} from "@/lib/gallery/gallery-labels";
import type { CmsGalleryProject } from "@/lib/gallery/cms-gallery-types";

interface GalleryProjectCardProps {
  project: CmsGalleryProject;
  priority?: boolean;
  analyticsLocation: "gallery_page" | "homepage_featured_work";
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
    month: "short",
    year: "numeric",
  }).format(parsed);
}

export function GalleryProjectCard({
  project,
  priority = false,
  analyticsLocation,
}: GalleryProjectCardProps) {
  const vehicleLabel = getVehicleLabel(project.vehicle);

  const projectDate = formatProjectDate(
    project.completionDate ?? project.publishedAt,
  );

  return (
    <article className="group overflow-hidden border border-white/10 bg-white/[0.035]">
      <Link
        href={`/gallery/${project.slug}`}
        data-analytics-event="gallery_project_open"
        data-analytics-label={project.title}
        data-analytics-location={analyticsLocation}
        className="block h-full"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-black/30">
          <GalleryImage
            image={project.coverImage}
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            priority={priority}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.035]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
            <span className="border border-white/15 bg-black/65 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white/80 backdrop-blur-md">
              {getGalleryCategoryLabel(project.serviceCategory)}
            </span>

            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/20 bg-black/65 text-white transition group-hover:border-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)]">
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </span>
          </div>
        </div>

        <div className="p-6">
          {vehicleLabel ? (
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-primary-hover)]">
              {vehicleLabel}
            </p>
          ) : null}

          <h2 className="mt-3 text-xl font-semibold leading-tight text-white">
            {project.title}
          </h2>

          <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/62">
            {project.summary}
          </p>

          {projectDate ? (
            <div className="mt-5 flex items-center gap-2 text-xs text-white/45">
              <CalendarDays aria-hidden="true" className="size-3.5" />
              <span>{projectDate}</span>
            </div>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
