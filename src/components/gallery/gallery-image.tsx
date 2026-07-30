import Image from "next/image";

import type { CmsGalleryImage } from "@/lib/gallery/cms-gallery-types";
import {
  blurImage,
  galleryImage,
  galleryImage2x,
  galleryImageWidths,
  type SanityImageSource,
} from "@/sanity/lib/image";

export type GalleryImagePreset = keyof typeof galleryImageWidths;

interface GalleryImageProps {
  image: CmsGalleryImage;
  sizes: string;
  preset: GalleryImagePreset;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  quality?: number;
  retina?: boolean;
}

function getSanitySource(
  image: CmsGalleryImage,
): SanityImageSource | undefined {
  return image.source as SanityImageSource | undefined;
}

function getImageUrl({
  image,
  preset,
  quality,
  retina,
}: Pick<GalleryImageProps, "image" | "preset" | "quality" | "retina">): string {
  const source = getSanitySource(image);

  if (!source) {
    return image.url;
  }

  const targetWidth = galleryImageWidths[preset];

  const builder = retina
    ? galleryImage2x(source, targetWidth, quality)
    : galleryImage(source, targetWidth, quality);

  return builder.url();
}

function getBlurDataUrl(image: CmsGalleryImage): string | undefined {
  const source = getSanitySource(image);

  if (source) {
    return blurImage(source).url();
  }

  return image.blurDataUrl;
}

function getIntrinsicDimensions(
  image: CmsGalleryImage,
  preset: GalleryImagePreset,
) {
  const fallbackWidth = galleryImageWidths[preset];

  if (image.width && image.height) {
    return {
      width: image.width,
      height: image.height,
    };
  }

  if (image.aspectRatio && image.aspectRatio > 0) {
    return {
      width: fallbackWidth,
      height: Math.round(fallbackWidth / image.aspectRatio),
    };
  }

  return {
    width: fallbackWidth,
    height: Math.round(fallbackWidth * 0.625),
  };
}

export function GalleryImage({
  image,
  sizes,
  preset,
  priority = false,
  fill = false,
  className,
  quality = 80,
  retina = true,
}: GalleryImageProps) {
  const src = getImageUrl({
    image,
    preset,
    quality,
    retina,
  });

  const blurDataURL = getBlurDataUrl(image);

  const blurProps = blurDataURL
    ? {
        placeholder: "blur" as const,
        blurDataURL,
      }
    : {
        placeholder: "empty" as const,
      };

  if (fill) {
    return (
      <Image
        src={src}
        alt={image.alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={className}
        {...blurProps}
      />
    );
  }

  const dimensions = getIntrinsicDimensions(image, preset);

  return (
    <Image
      src={src}
      alt={image.alt}
      width={dimensions.width}
      height={dimensions.height}
      sizes={sizes}
      quality={quality}
      priority={priority}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
      {...blurProps}
    />
  );
}
