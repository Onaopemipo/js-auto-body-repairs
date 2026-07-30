import fs from "node:fs";

const failures = [];

const requiredFiles = [
  "src/sanity/lib/image.ts",
  "src/sanity/queries/gallery.ts",
  "src/lib/gallery/cms-gallery-types.ts",
  "src/lib/gallery/cms-gallery-validation.ts",
  "src/components/gallery/gallery-image.tsx",
  "src/components/gallery/gallery-project-card.tsx",
  "src/components/gallery/gallery-project-detail.tsx",
  "src/components/gallery/project-image-collection.tsx",
  "next.config.ts",
];

function read(file) {
  if (!fs.existsSync(file)) {
    failures.push(`Missing file: ${file}`);
    return "";
  }

  return fs.readFileSync(file, "utf8");
}

for (const file of requiredFiles) {
  read(file);
}

const imageUtility = read("src/sanity/lib/image.ts");

for (const requirement of [
  "galleryImageWidths",
  "galleryImage2x",
  "blurImage",
  'auto("format")',
]) {
  if (!imageUtility.includes(requirement)) {
    failures.push(`Sanity image utility is missing: ${requirement}`);
  }
}

const nextConfig = read("next.config.ts");

for (const requirement of [
  '"image/avif"',
  '"image/webp"',
  "deviceSizes",
  "imageSizes",
  "minimumCacheTTL",
  '"cdn.sanity.io"',
]) {
  if (!nextConfig.includes(requirement)) {
    failures.push(`Next image configuration is missing: ${requirement}`);
  }
}

const query = read("src/sanity/queries/gallery.ts");

for (const requirement of [
  '"source": {',
  '"_type": "image"',
  '"_type": "reference"',
  '"_ref": asset._ref',
  "crop",
  "hotspot",
  '"blurDataUrl": asset->metadata.lqip',
]) {
  if (!query.includes(requirement)) {
    failures.push(`Gallery query projection is missing: ${requirement}`);
  }
}

const types = read("src/lib/gallery/cms-gallery-types.ts");

for (const requirement of [
  "CmsSanityImageSource",
  "CmsSanityImageCrop",
  "CmsSanityImageHotspot",
  "source?: CmsSanityImageSource",
]) {
  if (!types.includes(requirement)) {
    failures.push(`CMS gallery types are missing: ${requirement}`);
  }
}

const validation = read("src/lib/gallery/cms-gallery-validation.ts");

for (const requirement of [
  "galleryImageSourceSchema",
  'z.literal("image")',
  'z.literal("reference")',
  "galleryImageCropSchema",
  "galleryImageHotspotSchema",
]) {
  if (!validation.includes(requirement)) {
    failures.push(`Gallery validation is missing: ${requirement}`);
  }
}

const component = read("src/components/gallery/gallery-image.tsx");

for (const requirement of [
  "GalleryImagePreset",
  "galleryImageWidths",
  "galleryImage2x",
  "galleryImage(",
  "blurImage(",
  "getIntrinsicDimensions",
  "preset:",
  "quality={quality}",
  "sizes={sizes}",
]) {
  if (!component.includes(requirement)) {
    failures.push(`GalleryImage is missing: ${requirement}`);
  }
}

const card = read("src/components/gallery/gallery-project-card.tsx");

for (const requirement of [
  'preset="card"',
  "quality={78}",
  "priority={priority}",
]) {
  if (!card.includes(requirement)) {
    failures.push(`Gallery project card is missing: ${requirement}`);
  }
}

const detail = read("src/components/gallery/gallery-project-detail.tsx");

for (const requirement of [
  'preset="hero"',
  "quality={82}",
  "retina={false}",
  "priority",
]) {
  if (!detail.includes(requirement)) {
    failures.push(`Gallery project detail is missing: ${requirement}`);
  }
}

const collection = read("src/components/gallery/project-image-collection.tsx");

for (const requirement of ['preset="grid"', "quality={78}", "fill"]) {
  if (!collection.includes(requirement)) {
    failures.push(`Project image collection is missing: ${requirement}`);
  }
}

if (failures.length > 0) {
  console.error("\nGallery image optimisation validation failed:\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Gallery image optimisation validation passed.");
