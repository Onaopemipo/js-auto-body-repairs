import fs from "node:fs";

const requiredFiles = [
  "src/types/gallery.ts",
  "src/content/gallery.ts",
  "src/components/gallery/gallery-filter.tsx",
  "src/components/gallery/gallery-empty.tsx",
  "src/components/gallery/before-after-slider.tsx",
  "src/components/gallery/gallery-card.tsx",
  "src/components/gallery/gallery-grid.tsx",
  "src/components/gallery/gallery-lightbox.tsx",
  "src/components/gallery/gallery-image-schema.tsx",
  "src/components/gallery/gallery-experience.tsx",
  "src/app/gallery/page.tsx",
  "docs/gallery/phase-6a-premium-gallery.md",
];

const failures = requiredFiles.filter((file) => !fs.existsSync(file));

const experience = fs.readFileSync(
  "src/components/gallery/gallery-experience.tsx",
  "utf8",
);

const lightbox = fs.readFileSync(
  "src/components/gallery/gallery-lightbox.tsx",
  "utf8",
);

const slider = fs.readFileSync(
  "src/components/gallery/before-after-slider.tsx",
  "utf8",
);

const card = fs.readFileSync("src/components/gallery/gallery-card.tsx", "utf8");

const schema = fs.readFileSync(
  "src/components/gallery/gallery-image-schema.tsx",
  "utf8",
);

const page = fs.readFileSync("src/app/gallery/page.tsx", "utf8");

const galleryContent = fs.readFileSync("src/content/gallery.ts", "utf8");

const checks = [
  ["category filtering", experience, "activeCategory"],
  ["project URL deep linking", experience, 'searchParams.get("project")'],
  ["lightbox dialog", lightbox, "<Dialog"],
  ["keyboard navigation", lightbox, '"ArrowLeft"'],
  ["touch navigation", lightbox, "onPointerDown"],
  ["before-after range", slider, 'type="range"'],
  ["Next Image optimisation", card, "<Image"],
  ["optional blur placeholder", card, "blurDataURL"],
  ["ImageGallery schema", schema, '"@type": "ImageGallery"'],
  ["ImageObject schema", schema, '"@type": "ImageObject"'],
  ["gallery page experience", page, "<GalleryExperience"],
  ["gallery page suspense", page, "<Suspense"],
  ["honest source warning", galleryContent, "Do not add stock photography"],
];

for (const [label, source, needle] of checks) {
  if (!source.includes(needle)) {
    failures.push(`Missing gallery requirement: ${label}`);
  }
}

if (failures.length > 0) {
  console.error("Gallery validation failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `Gallery validation passed: ${requiredFiles.length} files and ${checks.length} implementation checks.`,
);
