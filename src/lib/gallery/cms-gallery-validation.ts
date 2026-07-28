import { z } from "zod";

const optionalString = z
  .string()
  .nullish()
  .transform((value) => value ?? undefined);

const optionalNumber = z
  .number()
  .nullish()
  .transform((value) => value ?? undefined);

const galleryImageSchema = z.object({
  assetId: z.string().min(1),
  url: z.string().url(),
  alt: z.string().min(1),

  caption: optionalString,

  width: optionalNumber.pipe(z.number().positive().optional()),

  height: optionalNumber.pipe(z.number().positive().optional()),

  aspectRatio: optionalNumber.pipe(z.number().positive().optional()),

  blurDataUrl: optionalString,
});

const galleryVehicleSchema = z
  .object({
    year: z
      .number()
      .int()
      .nullish()
      .transform((value) => value ?? undefined),

    make: optionalString,
    model: optionalString,
  })
  .nullish()
  .transform((value) => value ?? undefined);

export const cmsGalleryProjectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  serviceCategory: z.string().min(1),

  vehicle: galleryVehicleSchema,

  summary: z.string().min(1),

  repairDetails: z
    .array(z.unknown())
    .nullish()
    .transform((value) => value ?? undefined),

  completionDate: optionalString,

  coverImage: galleryImageSchema,

  beforeImages: z
    .array(galleryImageSchema)
    .nullish()
    .transform((value) => value ?? []),

  afterImages: z
    .array(galleryImageSchema)
    .nullish()
    .transform((value) => value ?? []),

  featured: z.boolean().default(false),
  displayOrder: z.number().default(100),

  publishedAt: z.string().min(1),

  seoTitle: optionalString,
  seoDescription: optionalString,
});

export const cmsGalleryProjectsSchema = z.array(cmsGalleryProjectSchema);
