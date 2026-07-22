import fs from "node:fs";

const requiredFiles = [
  "scripts/gallery/processGalleryMedia.mjs",
  "src/content/generated/gallery-projects.ts",
  "src/content/gallery.ts",
  "src/types/gallery.ts",
];

const failures = requiredFiles.filter((file) => !fs.existsSync(file));

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

for (const scriptName of [
  "gallery:process",
  "gallery:rebuild",
  "validate:gallery-media",
]) {
  if (!packageJson.scripts?.[scriptName]) {
    failures.push(`Missing package script: ${scriptName}`);
  }
}

const processor = fs.readFileSync(
  "scripts/gallery/processGalleryMedia.mjs",
  "utf8",
);

const manifest = fs.readFileSync(
  "src/content/generated/gallery-projects.ts",
  "utf8",
);

const content = fs.readFileSync("src/content/gallery.ts", "utf8");

const types = fs.readFileSync("src/types/gallery.ts", "utf8");

const checks = [
  ["EXIF rotation", processor, ".rotate()"],
  ["WebP processing", processor, ".webp("],
  ["AVIF processing", processor, ".avif("],
  ["thumbnail processing", processor, "thumbnail.webp"],
  ["blur placeholder", processor, "data:image/webp;base64"],
  ["project validation", processor, "validateProject"],
  ["duplicate project guard", processor, "Duplicate project id"],
  ["generated manifest", manifest, "generatedGalleryProjects"],
  ["manifest integration", content, "generatedGalleryProjects"],
  ["AVIF type", types, "avifSrc?: string"],
  ["thumbnail type", types, "thumbnailSrc?: string"],
];

for (const [label, source, needle] of checks) {
  if (!source.includes(needle)) {
    failures.push(`Missing gallery media requirement: ${label}`);
  }
}

if (failures.length > 0) {
  console.error("Gallery media validation failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `Gallery media validation passed: ${requiredFiles.length} files and ${checks.length} implementation checks.`,
);
