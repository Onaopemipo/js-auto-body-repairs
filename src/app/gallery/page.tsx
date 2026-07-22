import { Suspense } from "react";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

import { GalleryExperience } from "@/components/gallery/gallery-experience";
import { GalleryImageSchema } from "@/components/gallery/gallery-image-schema";
import { PageCta } from "@/components/pages/page-cta";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { galleryProjects } from "@/content/gallery";
import { siteContent } from "@/content/site-content";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

export const metadata = buildPageMetadata({
  title: "Repair Gallery",
  description:
    "View authentic collision repair, paint refinishing and dent removal projects completed by JS Auto Body Repairs in Redland Bay.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
      />

      <GalleryImageSchema projects={galleryProjects} />

      <PageHero
        eyebrow="Gallery"
        title={siteContent.gallery.title}
        description={siteContent.gallery.description}
      />

      <section className="section-spacing">
        <Container>
          <Suspense
            fallback={
              <div className="min-h-72 animate-pulse border border-white/10 bg-white/[0.025]" />
            }
          >
            <GalleryExperience />
          </Suspense>
        </Container>
      </section>

      <PageCta
        title="Want your vehicle restored to the same standard?"
        description="Send us the details and photos of the damage to begin your quote."
      />
    </>
  );
}
