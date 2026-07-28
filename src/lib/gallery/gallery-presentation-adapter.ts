import type { CmsGalleryProject } from "@/lib/gallery/cms-gallery-types";

export function toGalleryPresentationProject(project: CmsGalleryProject) {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    category: project.serviceCategory,
    summary: project.summary,
    image: project.coverImage.url,
    imageAlt: project.coverImage.alt,
    beforeImages: project.beforeImages,
    afterImages: project.afterImages,
    featured: project.featured,
  };
}
