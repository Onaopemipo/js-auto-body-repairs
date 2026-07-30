import fs from "node:fs";

const failures = [];

const requiredFiles = [
  "src/app/gallery/loading.tsx",
  "src/app/gallery/[slug]/loading.tsx",
  "src/components/gallery/gallery-loading-skeleton.tsx",
  "src/components/gallery/gallery-image.tsx",
  "src/components/gallery/gallery-project-grid.tsx",
  "src/components/home/sanity-featured-work.tsx",
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

const skeleton = read("src/components/gallery/gallery-loading-skeleton.tsx");

for (const requirement of [
  "GalleryLoadingSkeleton",
  'variant?: "index" | "detail"',
  "GalleryIndexSkeleton",
  "GalleryDetailSkeleton",
  'aria-busy="true"',
  "animate-pulse",
  "aspect-[4/3]",
]) {
  if (!skeleton.includes(requirement)) {
    failures.push(`Gallery loading skeleton is missing: ${requirement}`);
  }
}

const galleryLoading = read("src/app/gallery/loading.tsx");

for (const requirement of ["GalleryLoadingSkeleton", "page-main"]) {
  if (!galleryLoading.includes(requirement)) {
    failures.push(`Gallery loading route is missing: ${requirement}`);
  }
}

const detailLoading = read("src/app/gallery/[slug]/loading.tsx");

for (const requirement of ["GalleryLoadingSkeleton", 'variant="detail"']) {
  if (!detailLoading.includes(requirement)) {
    failures.push(`Gallery detail loading route is missing: ${requirement}`);
  }
}

const galleryImage = read("src/components/gallery/gallery-image.tsx");

for (const requirement of [
  'fetchPriority={priority ? "high" : "auto"}',
  'decoding="async"',
  "priority={priority}",
  "sizes={sizes}",
]) {
  if (!galleryImage.includes(requirement)) {
    failures.push(`GalleryImage scheduling is missing: ${requirement}`);
  }
}

const projectGrid = read("src/components/gallery/gallery-project-grid.tsx");

if (!projectGrid.includes("priority={index === 0}")) {
  failures.push("Gallery project grid must prioritise only the first card.");
}

for (const obsolete of ["priority={index < 2}", "priority={index < 3}"]) {
  if (projectGrid.includes(obsolete)) {
    failures.push(
      `Gallery project grid retains excessive priority: ${obsolete}`,
    );
  }
}

const featuredWork = read("src/components/home/sanity-featured-work.tsx");

if (!featuredWork.includes("priority={index === 0}")) {
  failures.push("Homepage featured work must prioritise only its first card.");
}

for (const obsolete of ["priority={index < 2}", "priority={index < 3}"]) {
  if (featuredWork.includes(obsolete)) {
    failures.push(
      `Homepage featured work retains excessive priority: ${obsolete}`,
    );
  }
}

if (failures.length > 0) {
  console.error("\nGallery perceived-performance validation failed:\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `Gallery perceived-performance validation passed: ${requiredFiles.length} files inspected.`,
);
