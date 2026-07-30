import { createImageUrlBuilder } from "@sanity/image-url";

import { client } from "./client";

const builder = createImageUrlBuilder(client);

export type SanityImageSource = Parameters<typeof builder.image>[0];

export const galleryImageWidths = {
  thumbnail: 480,
  card: 720,
  grid: 900,
  detail: 1400,
  lightbox: 2000,
  hero: 2400,
} as const;

export type GalleryImageWidth =
  (typeof galleryImageWidths)[keyof typeof galleryImageWidths];

const DEFAULT_GALLERY_IMAGE_QUALITY = 80;
const DEFAULT_BLUR_IMAGE_QUALITY = 20;
const DEFAULT_BLUR_IMAGE_WIDTH = 24;
const DEFAULT_BLUR_AMOUNT = 40;

function validateImageWidth(width: number): number {
  if (!Number.isFinite(width) || width <= 0) {
    throw new Error(
      `Gallery image width must be a positive finite number. Received: ${width}`,
    );
  }

  return Math.round(width);
}

function validateImageQuality(quality: number): number {
  if (!Number.isFinite(quality) || quality < 1 || quality > 100) {
    throw new Error(
      `Gallery image quality must be between 1 and 100. Received: ${quality}`,
    );
  }

  return Math.round(quality);
}

export function urlForSanityImage(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}

export function galleryImage(
  source: SanityImageSource,
  width: number,
  quality = DEFAULT_GALLERY_IMAGE_QUALITY,
) {
  return urlForSanityImage(source)
    .width(validateImageWidth(width))
    .quality(validateImageQuality(quality))
    .dpr(1);
}

export function galleryImage2x(
  source: SanityImageSource,
  width: number,
  quality = DEFAULT_GALLERY_IMAGE_QUALITY,
) {
  return urlForSanityImage(source)
    .width(validateImageWidth(width))
    .quality(validateImageQuality(quality))
    .dpr(2);
}

export function blurImage(source: SanityImageSource) {
  return urlForSanityImage(source)
    .width(DEFAULT_BLUR_IMAGE_WIDTH)
    .quality(DEFAULT_BLUR_IMAGE_QUALITY)
    .blur(DEFAULT_BLUR_AMOUNT);
}
