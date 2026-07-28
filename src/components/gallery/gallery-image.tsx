import Image from "next/image";

import type { CmsGalleryImage } from "@/lib/gallery/cms-gallery-types";

interface GalleryImageProps {
  image: CmsGalleryImage;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  className?: string;
}

export function GalleryImage({
  image,
  sizes,
  priority = false,
  fill = false,
  className,
}: GalleryImageProps) {
  const blurProps = image.blurDataUrl
    ? {
        placeholder: "blur" as const,
        blurDataURL: image.blurDataUrl,
      }
    : {
        placeholder: "empty" as const,
      };

  if (fill) {
    return (
      <Image
        src={image.url}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        {...blurProps}
      />
    );
  }

  return (
    <Image
      src={image.url}
      alt={image.alt}
      width={image.width ?? 1600}
      height={image.height ?? 1000}
      sizes={sizes}
      priority={priority}
      className={className}
      {...blurProps}
    />
  );
}
