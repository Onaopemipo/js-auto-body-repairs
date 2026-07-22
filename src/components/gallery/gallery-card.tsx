import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import type { GalleryProject } from "@/types/gallery";

interface GalleryCardProps {
  project: GalleryProject;
  priority?: boolean;
  onOpen: (project: GalleryProject) => void;
}

export function GalleryCard({
  project,
  priority = false,
  onOpen,
}: GalleryCardProps) {
  return (
    <article className="group mb-6 break-inside-avoid overflow-hidden border border-white/10 bg-[var(--page-background-elevated)]">
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`View ${project.title}`}
        className="block w-full text-left"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-black">
          <Image
            src={
              project.image.thumbnailSrc ||
              project.image.src
            }
            alt={project.image.alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder={project.image.blurDataUrl ? "blur" : "empty"}
            blurDataURL={project.image.blurDataUrl}
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-70 transition group-hover:opacity-90"
          />

          {project.featured ? (
            <span className="absolute left-4 top-4 bg-[var(--brand-primary)] px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white">
              Featured
            </span>
          ) : null}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--brand-primary-hover)]">
                {project.categoryLabel}
              </p>

              <h2 className="mt-3 text-xl font-semibold">{project.title}</h2>
            </div>

            <ArrowUpRight
              aria-hidden="true"
              className="mt-1 size-4 shrink-0 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
            />
          </div>

          <p className="mt-3 text-sm font-medium text-white/55">
            {project.vehicle}
          </p>

          <p className="body-copy mt-4 text-sm leading-6">{project.summary}</p>
        </div>
      </button>
    </article>
  );
}
