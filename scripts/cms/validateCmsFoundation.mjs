import fs from "node:fs";

const failures = [];

const requiredFiles = [
  "sanity.config.ts",
  "sanity.cli.ts",
  "src/app/studio/[[...tool]]/page.tsx",
  "src/sanity/env.ts",
  "src/sanity/lib/client.ts",
  "src/sanity/lib/fresh-client.ts",
  "src/sanity/lib/image.ts",
  "src/sanity/lib/health.ts",
  "src/sanity/schemaTypes/galleryProject.ts",
  "src/sanity/schemaTypes/testimonial.ts",
  "src/sanity/schemaTypes/siteSettings.ts",
  "src/sanity/schemaTypes/index.ts",
  "src/sanity/structure.ts",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    failures.push(`Missing CMS foundation file: ${file}`);
  }
}

const read = (file) =>
  fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

const dependencies = {
  ...(packageJson.dependencies ?? {}),
  ...(packageJson.devDependencies ?? {}),
};

for (const dependency of [
  "next-sanity",
  "sanity",
  "@sanity/vision",
  "@sanity/image-url",
  "styled-components",
]) {
  if (!dependencies[dependency]) {
    failures.push(`Missing CMS dependency: ${dependency}`);
  }
}

const envExample = read(".env.example");

for (const variable of [
  "NEXT_PUBLIC_SANITY_PROJECT_ID=",
  "NEXT_PUBLIC_SANITY_DATASET=",
  "NEXT_PUBLIC_SANITY_API_VERSION=",
]) {
  if (!envExample.includes(variable)) {
    failures.push(`.env.example is missing ${variable}`);
  }
}

if (/NEXT_PUBLIC_SANITY_PROJECT_ID=[a-z0-9-]{5,}/.test(envExample)) {
  failures.push(
    "A real Sanity project ID appears to be committed in .env.example.",
  );
}

const studioRoute = read("src/app/studio/[[...tool]]/page.tsx");

for (const requirement of [
  "NextStudio",
  'dynamic = "force-static"',
  "next-sanity/studio",
]) {
  if (!studioRoute.includes(requirement)) {
    failures.push(`Studio route is missing requirement: ${requirement}`);
  }
}

const config = read("sanity.config.ts");

for (const requirement of [
  'basePath: "/studio"',
  "structureTool",
  "visionTool",
  "schemaTypes",
  "singletonDocumentTypes",
]) {
  if (!config.includes(requirement)) {
    failures.push(
      `Sanity configuration is missing requirement: ${requirement}`,
    );
  }
}

const gallerySchema = read("src/sanity/schemaTypes/galleryProject.ts");

for (const requirement of [
  'name: "galleryProject"',
  'name: "coverImage"',
  'name: "beforeImages"',
  'name: "afterImages"',
  'name: "featured"',
  'name: "displayOrder"',
  'name: "seoTitle"',
  'name: "seoDescription"',
]) {
  if (!gallerySchema.includes(requirement)) {
    failures.push(`Gallery schema is missing requirement: ${requirement}`);
  }
}

const testimonialSchema = read("src/sanity/schemaTypes/testimonial.ts");

for (const requirement of [
  'name: "testimonial"',
  'name: "customerName"',
  'name: "review"',
  'name: "rating"',
  'name: "featured"',
  'name: "published"',
]) {
  if (!testimonialSchema.includes(requirement)) {
    failures.push(`Testimonial schema is missing requirement: ${requirement}`);
  }
}

const settingsSchema = read("src/sanity/schemaTypes/siteSettings.ts");

for (const requirement of [
  'name: "siteSettings"',
  'name: "phone"',
  'name: "email"',
  'name: "address"',
  'name: "weekdayHours"',
  'name: "weekendHours"',
]) {
  if (!settingsSchema.includes(requirement)) {
    failures.push(
      `Site settings schema is missing requirement: ${requirement}`,
    );
  }
}

const sanityConfig = read("sanity.config.ts");

if (sanityConfig.includes('from "@/sanity')) {
  failures.push(
    "sanity.config.ts must use relative imports so the Sanity Vite build can resolve them.",
  );
}

if (!sanityConfig.includes('from "./src/sanity/schemaTypes"')) {
  failures.push(
    "sanity.config.ts does not import schemas through the Vite-compatible relative path.",
  );
}

if (!studioRoute.includes('from "../../../../sanity.config"')) {
  failures.push(
    "Studio route does not use the correct four-level path to sanity.config.ts.",
  );
}

const sanityClient = read("src/sanity/lib/client.ts");

for (const clientExport of [
  "export const client",
  "export const sanityClient",
]) {
  if (!sanityClient.includes(clientExport)) {
    failures.push(`Sanity client is missing: ${clientExport}`);
  }
}

const sanityImage = read("src/sanity/lib/image.ts");

if (sanityImage.includes("@sanity/image-url/lib/")) {
  failures.push("Sanity image helper imports a private package path.");
}

if (
  !sanityConfig.trimStart().startsWith('"use client";') &&
  !sanityConfig.trimStart().startsWith("'use client';")
) {
  failures.push(
    'sanity.config.ts must begin with "use client" for the embedded Next.js Studio.',
  );
}

if (failures.length) {
  console.error("CMS foundation validation failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `CMS foundation validation passed: ${requiredFiles.length} files, 5 dependencies and 3 schema types.`,
);
