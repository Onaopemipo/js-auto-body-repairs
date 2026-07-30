import { GalleryProjectCard } from "@/components/gallery/gallery-project-card";
import { ButtonLink } from "@/components/ui/button-link";
import type { CmsGalleryProject } from "@/lib/gallery/cms-gallery-types";

interface GalleryProjectGridProps {
  projects: CmsGalleryProject[];
}

export function GalleryProjectGrid({ projects }: GalleryProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="border border-white/10 bg-white/[0.025] px-6 py-16 text-center sm:px-10">
        <p className="eyebrow">Projects coming soon</p>

        <h2 className="display-heading mx-auto mt-5 max-w-2xl text-3xl sm:text-4xl">
          Completed repair projects will appear here soon.
        </h2>

        <p className="body-copy mx-auto mt-5 max-w-xl">
          Have a damaged vehicle that needs professional attention? Send us the
          details and request an obligation-free assessment.
        </p>

        <ButtonLink
          href="/request-estimate"
          size="large"
          className="mt-8"
          data-analytics-event="quote_cta_click"
          data-analytics-label="Request a free quote"
          data-analytics-location="gallery_empty_state"
        >
          Request a free quote
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => (
        <GalleryProjectCard
          key={project.id}
          project={project}
          priority={index === 0}
          analyticsLocation="gallery_page"
        />
      ))}
    </div>
  );
}
