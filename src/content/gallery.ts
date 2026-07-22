import { generatedGalleryProjects } from "@/content/generated/gallery-projects";
import type {
  GalleryCategory,
  GalleryProject,
} from "@/types/gallery";

export const galleryCategories: Array<{
  value: GalleryCategory;
  label: string;
}> = [
  {
    value: "all",
    label: "All Work",
  },
  {
    value: "collision-repairs",
    label: "Collision Repairs",
  },
  {
    value: "paint-refinishing",
    label: "Paint Refinishing",
  },
  {
    value: "dent-removal",
    label: "Dent Removal",
  },
  {
    value: "performance-upgrades",
    label: "Performance Upgrades",
  },
  {
    value: "complex-repairs",
    label: "Complex Repairs",
  },
];

/**
 * This collection is generated from authentic project metadata and
 * locally supplied workshop photography.
 *
 * Do not add stock photography directly to this array.
 */
export const galleryProjects: GalleryProject[] =
  generatedGalleryProjects;
