import { cmsGalleryProjectsSchema } from "@/lib/gallery/cms-gallery-validation";
import type {
  CmsGalleryProject,
  GalleryContentResult,
} from "@/lib/gallery/cms-gallery-types";
import { localGalleryFallback } from "@/lib/gallery/local-gallery-fallback";
import { client } from "@/sanity/lib/client";
import {
  featuredGalleryProjectsQuery,
  galleryProjectBySlugQuery,
  galleryProjectsQuery,
} from "@/sanity/queries/gallery";

const galleryRevalidateSeconds = 300;

function fallbackResult(reason: string): GalleryContentResult {
  return {
    projects: localGalleryFallback,
    source: "local-fallback",
    fallbackReason: reason,
  };
}

export async function getGalleryProjects(): Promise<GalleryContentResult> {
  try {
    const response = await client.fetch(
      galleryProjectsQuery,
      {},
      {
        next: {
          revalidate: galleryRevalidateSeconds,
          tags: ["gallery-projects"],
        },
      },
    );

    const validation = cmsGalleryProjectsSchema.safeParse(response);

    if (!validation.success) {
      console.error(
        "Sanity gallery response validation failed:",
        validation.error.flatten(),
      );

      return fallbackResult("invalid-sanity-response");
    }

    if (validation.data.length === 0) {
      return fallbackResult("empty-sanity-gallery");
    }

    return {
      projects: validation.data as CmsGalleryProject[],
      source: "sanity",
    };
  } catch (error) {
    console.error(
      "Sanity gallery query failed:",
      error instanceof Error ? error.message : error,
    );

    return fallbackResult("sanity-query-failed");
  }
}

export async function getFeaturedGalleryProjects(): Promise<GalleryContentResult> {
  try {
    const response = await client.fetch(
      featuredGalleryProjectsQuery,
      {},
      {
        next: {
          revalidate: galleryRevalidateSeconds,
          tags: ["gallery-projects"],
        },
      },
    );

    const validation = cmsGalleryProjectsSchema.safeParse(response);

    if (!validation.success || validation.data.length === 0) {
      return {
        projects: localGalleryFallback
          .filter((project) => project.featured)
          .slice(0, 6),
        source: "local-fallback",
        fallbackReason: validation.success
          ? "empty-featured-gallery"
          : "invalid-featured-response",
      };
    }

    return {
      projects: validation.data as CmsGalleryProject[],
      source: "sanity",
    };
  } catch (error) {
    console.error(
      "Featured Sanity gallery query failed:",
      error instanceof Error ? error.message : error,
    );

    return {
      projects: localGalleryFallback
        .filter((project) => project.featured)
        .slice(0, 6),
      source: "local-fallback",
      fallbackReason: "featured-query-failed",
    };
  }
}

export async function getGalleryProjectBySlug(
  slug: string,
): Promise<CmsGalleryProject | null> {
  try {
    const response = await client.fetch(
      galleryProjectBySlugQuery,
      {
        slug,
      },
      {
        next: {
          revalidate: galleryRevalidateSeconds,
          tags: ["gallery-projects", `gallery-project:${slug}`],
        },
      },
    );

    const validation = cmsGalleryProjectsSchema.element
      .nullable()
      .safeParse(response);

    if (validation.success && validation.data) {
      return validation.data as CmsGalleryProject;
    }
  } catch (error) {
    console.error(
      `Sanity gallery project query failed for ${slug}:`,
      error instanceof Error ? error.message : error,
    );
  }

  return localGalleryFallback.find((project) => project.slug === slug) ?? null;
}
