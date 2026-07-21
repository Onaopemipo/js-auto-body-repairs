import type { Metadata } from "next";

import { PageCta } from "@/components/pages/page-cta";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View collision repair, paint refinishing and dent removal work completed by JS Auto Body Repairs.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={siteContent.gallery.title}
        description={siteContent.gallery.description}
      />
      <section className="section-spacing">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {siteContent.gallery.categories.map((category, index) => (
              <article
                key={category}
                className="relative min-h-[28rem] overflow-hidden border border-white/10 bg-[linear-gradient(145deg,#222226_0%,#09090a_52%,#a50303_100%)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent p-7 pt-28">
                  <span className="text-xs font-bold tracking-[0.16em] text-[var(--brand-primary-hover)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-4 text-2xl font-semibold">{category}</h2>
                  <p className="body-copy mt-3 text-sm">
                    Project photography will be added here as completed repair
                    images are supplied.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <PageCta
        title="Want your vehicle restored to the same standard?"
        description="Send us the details and photos of the damage to begin your quote."
      />
    </>
  );
}
