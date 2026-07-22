export type GalleryCategory =
  | "all"
  | "collision-repairs"
  | "paint-refinishing"
  | "dent-removal"
  | "performance-upgrades"
  | "complex-repairs";

export interface GalleryImage {
  src: string;
  avifSrc?: string;
  thumbnailSrc?: string;
  alt: string;
  width: number;
  height: number;
  blurDataUrl?: string;
}

export interface GalleryProject {
  id: string;
  slug: string;
  title: string;
  category: Exclude<
    GalleryCategory,
    "all"
  >;
  categoryLabel: string;
  vehicle: string;
  summary: string;
  workCompleted: string[];
  featured?: boolean;
  completedAt?: string;
  image: GalleryImage;
  beforeImage?: GalleryImage;
  afterImage?: GalleryImage;
}
