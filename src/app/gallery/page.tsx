import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { GalleryProjectGrid } from "@/components/gallery/gallery-project-grid";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { getGalleryProjects } from "@/lib/gallery/gallery-content";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

export const metadata = buildPageMetadata({
  title: "Our Work",
  description:
    "Explore completed collision repairs, dent removal, panel restoration and paint refinishing projects by JS Auto Body Repairs.",
  path: "/gallery",
});

export const revalidate = 300;

export default async function GalleryPage() {
  const result = await getGalleryProjects();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Our Work", path: "/gallery" },
        ]}
      />

      <section className="border-b border-white/10 pb-16 pt-14 sm:pb-20 sm:pt-20">
        <Container>
          <p className="eyebrow">Our work</p>

          <h1 className="display-heading mt-5 max-w-4xl text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
            Repair quality you can see.
          </h1>

          <p className="body-copy mt-7 max-w-2xl text-base sm:text-lg">
            Browse completed vehicle repairs from {siteConfig.name}. Each
            project reflects our focus on accurate panel alignment, careful
            preparation and professional refinishing.
          </p>
        </Container>
      </section>

      <section className="section-spacing">
        <Container>
          <GalleryProjectGrid projects={result.projects} />
        </Container>
      </section>
    </>
  );
}
