import type { PortableTextBlock } from "@portabletext/types";

export interface CmsSanityImageCrop {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface CmsSanityImageHotspot {
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface CmsSanityImageSource {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
  crop?: CmsSanityImageCrop;
  hotspot?: CmsSanityImageHotspot;
}

export interface CmsGalleryImage {
  source?: CmsSanityImageSource;
  assetId: string;
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  blurDataUrl?: string;
}

export interface CmsGalleryVehicle {
  year?: number;
  make?: string;
  model?: string;
}

export interface CmsGalleryProject {
  id: string;
  title: string;
  slug: string;
  serviceCategory: string;
  vehicle?: CmsGalleryVehicle;
  summary: string;
  repairDetails?: PortableTextBlock[];
  completionDate?: string;
  coverImage: CmsGalleryImage;
  beforeImages: CmsGalleryImage[];
  afterImages: CmsGalleryImage[];
  featured: boolean;
  displayOrder: number;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface GalleryContentResult {
  projects: CmsGalleryProject[];
  source: "sanity" | "local-fallback";
  fallbackReason?: string;
}
