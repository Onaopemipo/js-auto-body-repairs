import Image from "next/image";

import type { CmsGalleryImage } from "@/lib/gallery/cms-gallery-types";

interface GalleryImageProps {
  image: CmsGalleryImage;
  sizes: string;
  priority?: boolean;
  className?: string;
}

function isRemoteImage(url: string) {
  return /^https?:\/\//.test(url);
}

export function GalleryImage({
  image,
  sizes,
  priority = false,
  className,
}: GalleryImageProps) {
  const width = image.width ?? 1600;
  const height = image.height ?? 1000;

  return (
    <Image
      src={image.url}
      alt={image.alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      placeholder={image.blurDataUrl ? "blur" : "empty"}
      blurDataURL={image.blurDataUrl}
      unoptimized={!isRemoteImage(image.url)}
      className={className}
    />
  );
}
