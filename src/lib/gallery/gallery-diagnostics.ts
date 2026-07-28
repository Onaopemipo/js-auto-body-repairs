import type { GalleryContentResult } from "@/lib/gallery/cms-gallery-types";

export function reportGallerySource(result: GalleryContentResult) {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  console.info("[Gallery content]", {
    source: result.source,
    count: result.projects.length,
    fallbackReason: result.fallbackReason ?? null,
  });
}
