import { ArrowUpRight } from "lucide-react";

import { GalleryProjectCard } from "@/components/gallery/gallery-project-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { getFeaturedGalleryProjects } from "@/lib/gallery/gallery-content";

export async function SanityFeaturedWork() {
  const result = await getFeaturedGalleryProjects();

  if (result.projects.length === 0) {
    return null;
  }

  return (
    <section className="section-spacing border-t border-white/10">
      <Container>
        <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">Featured repairs</p>

            <h2 className="display-heading mt-5 text-4xl leading-[1.05] sm:text-5xl">
              Professional results from our workshop.
            </h2>

            <p className="body-copy mt-6 max-w-2xl">
              Explore selected collision repair, panel restoration and
              refinishing projects completed by our team.
            </p>
          </div>

          <ButtonLink
            href="/gallery"
            variant="secondary"
            className="group w-fit shrink-0"
            data-analytics-event="gallery_cta_click"
            data-analytics-label="View all projects"
            data-analytics-location="homepage_featured_work"
          >
            View all projects
            <ArrowUpRight
              aria-hidden="true"
              className="ml-2 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {result.projects.map((project, index) => (
            <GalleryProjectCard
              key={project.id}
              project={project}
              priority={index < 2}
              analyticsLocation="homepage_featured_work"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
