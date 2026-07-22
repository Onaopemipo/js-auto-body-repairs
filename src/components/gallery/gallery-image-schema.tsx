import { siteConfig } from "@/config/site";
import type { GalleryProject } from "@/types/gallery";

export function GalleryImageSchema({
  projects,
}: {
  projects: GalleryProject[];
}) {
  if (projects.length === 0) {
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "JS Auto Body Repairs Project Gallery",
    url: `${siteConfig.url}/gallery`,
    associatedMedia: projects.map((project) => ({
      "@type": "ImageObject",
      name: project.title,
      caption: project.summary,
      contentUrl: `${siteConfig.url}${project.image.src}`,
      width: project.image.width,
      height: project.image.height,
      representativeOfPage: Boolean(project.featured),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
