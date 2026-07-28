import fs from "node:fs";

const failures = [];

const requiredFiles = [
  "src/lib/gallery/cms-gallery-types.ts",
  "src/lib/gallery/cms-gallery-validation.ts",
  "src/lib/gallery/local-gallery-fallback.ts",
  "src/lib/gallery/local-gallery-fallback.json",
  "src/lib/gallery/gallery-content.ts",
  "src/lib/gallery/gallery-diagnostics.ts",
  "src/sanity/queries/gallery.ts",
  "src/components/gallery/gallery-image.tsx",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    failures.push(`Missing gallery CMS file: ${file}`);
  }
}

const read = (file) =>
  fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";

const query = read("src/sanity/queries/gallery.ts");

for (const requirement of [
  "galleryProjectsQuery",
  "featuredGalleryProjectsQuery",
  "galleryProjectBySlugQuery",
  "asset->metadata.dimensions.width",
  "asset->metadata.lqip",
]) {
  if (!query.includes(requirement)) {
    failures.push(`Gallery query is missing: ${requirement}`);
  }
}

const contentService = read("src/lib/gallery/gallery-content.ts");

for (const requirement of [
  "localGalleryFallback",
  "empty-sanity-gallery",
  "sanity-query-failed",
  "revalidate",
  'tags: ["gallery-projects"]',
]) {
  if (!contentService.includes(requirement)) {
    failures.push(`Gallery service is missing: ${requirement}`);
  }
}

const migrationScript = read("scripts/cms/gallery/migrateGalleryToSanity.mjs");

for (const requirement of []) {
  if (!migrationScript.includes(requirement)) {
    failures.push(`Gallery migration is missing: ${requirement}`);
  }
}

if (/SANITY_MIGRATION_TOKEN\s*=\s*["'][^"']+/.test(migrationScript)) {
  failures.push("A migration token appears hardcoded.");
}

const fallback = JSON.parse(
  read("src/lib/gallery/local-gallery-fallback.json") || "[]",
);

if (!Array.isArray(fallback)) {
  failures.push("Local gallery fallback must be a JSON array.");
}

const nextConfig = read("next.config.ts");

if (!nextConfig.includes("cdn.sanity.io")) {
  failures.push("Next.js does not allow Sanity CDN images.");
}

if (failures.length) {
  console.error("Gallery CMS validation failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `Gallery CMS validation passed: ${requiredFiles.length} required files and ${fallback.length} fallback projects.`,
);
