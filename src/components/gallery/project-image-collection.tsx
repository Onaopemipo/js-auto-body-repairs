import { GalleryImage } from "@/components/gallery/gallery-image";
import type { CmsGalleryImage } from "@/lib/gallery/cms-gallery-types";

interface ProjectImageCollectionProps {
  title: string;
  description: string;
  images: CmsGalleryImage[];
}

export function ProjectImageCollection({
  title,
  description,
  images,
}: ProjectImageCollectionProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-white/10 pt-12">
      <div className="max-w-2xl">
        <p className="eyebrow">{title}</p>

        <p className="body-copy mt-4">{description}</p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {images.map((image, index) => (
          <figure
            key={`${image.assetId}-${index}`}
            className="overflow-hidden border border-white/10 bg-white/[0.03]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <GalleryImage
                image={image}
                sizes="(min-width: 640px) 50vw, 100vw"
                fill
                className="object-cover"
              />
            </div>

            {image.caption ? (
              <figcaption className="border-t border-white/10 px-5 py-4 text-sm leading-6 text-white/58">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </section>
  );
}
