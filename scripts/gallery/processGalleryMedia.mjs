import {
  mkdir,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const root = process.cwd();

const sourceRoot = path.join(root, ".gallery-source", "projects");

const outputRoot = path.join(root, "public", "gallery", "generated");

const manifestPath = path.join(
  root,
  "src",
  "content",
  "generated",
  "gallery-projects.ts",
);

const validCategories = new Set([
  "collision-repairs",
  "paint-refinishing",
  "dent-removal",
  "performance-upgrades",
  "complex-repairs",
]);

const validExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
  ".heif",
  ".tif",
  ".tiff",
]);

function requireString(value, field) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${field} must be a non-empty string.`);
  }

  return value.trim();
}

function validateImage(image, field, required) {
  if (!image) {
    if (required) {
      throw new Error(`${field} image is required.`);
    }

    return undefined;
  }

  const filename = requireString(image.filename, `${field}.filename`);

  const extension = path.extname(filename).toLowerCase();

  if (!validExtensions.has(extension)) {
    throw new Error(`${field} uses an unsupported extension: ${extension}`);
  }

  const alt = requireString(image.alt, `${field}.alt`);

  if (alt.length < 12) {
    throw new Error(`${field}.alt must be more descriptive.`);
  }

  return {
    filename,
    alt,
  };
}

function validateProject(raw, directory) {
  const id = requireString(raw.id, "id");

  const slug = requireString(raw.slug, "slug");

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid slug: ${slug}`);
  }

  const category = requireString(raw.category, "category");

  if (!validCategories.has(category)) {
    throw new Error(`Unsupported category: ${category}`);
  }

  if (!Array.isArray(raw.workCompleted) || raw.workCompleted.length === 0) {
    throw new Error("workCompleted must contain at least one item.");
  }

  const before = validateImage(raw.images?.before, "before", false);

  const after = validateImage(raw.images?.after, "after", false);

  if (Boolean(before) !== Boolean(after)) {
    throw new Error("Before and after images must be supplied together.");
  }

  return {
    directory,
    id,
    slug,
    title: requireString(raw.title, "title"),
    category,
    categoryLabel: requireString(raw.categoryLabel, "categoryLabel"),
    vehicle: requireString(raw.vehicle, "vehicle"),
    summary: requireString(raw.summary, "summary"),
    workCompleted: raw.workCompleted.map((item, index) =>
      requireString(item, `workCompleted[${index}]`),
    ),
    featured: Boolean(raw.featured),
    completedAt: raw.completedAt || undefined,
    images: {
      featured: validateImage(raw.images?.featured, "featured", true),
      before,
      after,
    },
  };
}

async function assertSourceImage(filePath) {
  const fileStats = await stat(filePath);

  if (!fileStats.isFile()) {
    throw new Error(`Not a file: ${filePath}`);
  }

  const metadata = await sharp(filePath).metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(`Unable to read image dimensions: ${filePath}`);
  }
}

async function createBlurDataUrl(sourcePath) {
  const buffer = await sharp(sourcePath)
    .rotate()
    .resize({
      width: 24,
      height: 18,
      fit: "inside",
    })
    .webp({
      quality: 32,
    })
    .toBuffer();

  return `data:image/webp;base64,${buffer.toString("base64")}`;
}

async function processImage({ project, image, role }) {
  const sourcePath = path.join(sourceRoot, project.directory, image.filename);

  await assertSourceImage(sourcePath);

  const outputDirectory = path.join(outputRoot, project.slug);

  await mkdir(outputDirectory, {
    recursive: true,
  });

  const webpPath = path.join(outputDirectory, `${role}.webp`);

  const avifPath = path.join(outputDirectory, `${role}.avif`);

  const thumbnailPath = path.join(outputDirectory, `${role}-thumbnail.webp`);

  const pipeline = sharp(sourcePath).rotate().resize({
    width: 2200,
    fit: "inside",
    withoutEnlargement: true,
  });

  await pipeline
    .clone()
    .webp({
      quality: 88,
      effort: 5,
    })
    .toFile(webpPath);

  await pipeline
    .clone()
    .avif({
      quality: 60,
      effort: 5,
    })
    .toFile(avifPath);

  await sharp(sourcePath)
    .rotate()
    .resize({
      width: 900,
      height: 675,
      fit: "cover",
      position: "attention",
    })
    .webp({
      quality: 82,
      effort: 5,
    })
    .toFile(thumbnailPath);

  const metadata = await sharp(webpPath).metadata();

  const publicRoot = `/gallery/generated/${project.slug}`;

  return {
    src: `${publicRoot}/${role}.webp`,
    avifSrc: `${publicRoot}/${role}.avif`,
    thumbnailSrc: `${publicRoot}/${role}-thumbnail.webp`,
    alt: image.alt,
    width: metadata.width,
    height: metadata.height,
    blurDataUrl: await createBlurDataUrl(sourcePath),
  };
}

async function loadProjects() {
  await mkdir(sourceRoot, {
    recursive: true,
  });

  const entries = await readdir(sourceRoot, {
    withFileTypes: true,
  });

  const directories = entries
    .filter((entry) => entry.isDirectory() && entry.name !== "example-project")
    .map((entry) => entry.name)
    .sort();

  const projects = [];

  for (const directory of directories) {
    const manifestFile = path.join(sourceRoot, directory, "project.json");

    const raw = JSON.parse(await readFile(manifestFile, "utf8"));

    projects.push(validateProject(raw, directory));
  }

  const ids = new Set();
  const slugs = new Set();

  for (const project of projects) {
    if (ids.has(project.id)) {
      throw new Error(`Duplicate project id: ${project.id}`);
    }

    if (slugs.has(project.slug)) {
      throw new Error(`Duplicate project slug: ${project.slug}`);
    }

    ids.add(project.id);
    slugs.add(project.slug);
  }

  return projects;
}

async function main() {
  const projects = await loadProjects();

  await rm(outputRoot, {
    recursive: true,
    force: true,
  });

  await mkdir(outputRoot, {
    recursive: true,
  });

  const generated = [];

  for (const project of projects) {
    console.log(`Processing ${project.slug}...`);

    const image = await processImage({
      project,
      image: project.images.featured,
      role: "featured",
    });

    const beforeImage = project.images.before
      ? await processImage({
          project,
          image: project.images.before,
          role: "before",
        })
      : undefined;

    const afterImage = project.images.after
      ? await processImage({
          project,
          image: project.images.after,
          role: "after",
        })
      : undefined;

    generated.push({
      id: project.id,
      slug: project.slug,
      title: project.title,
      category: project.category,
      categoryLabel: project.categoryLabel,
      vehicle: project.vehicle,
      summary: project.summary,
      workCompleted: project.workCompleted,
      featured: project.featured,
      ...(project.completedAt
        ? {
            completedAt: project.completedAt,
          }
        : {}),
      image,
      ...(beforeImage && afterImage
        ? {
            beforeImage,
            afterImage,
          }
        : {}),
    });
  }

  generated.sort(
    (first, second) =>
      Number(second.featured) - Number(first.featured) ||
      String(second.completedAt || "").localeCompare(
        String(first.completedAt || ""),
      ),
  );

  await mkdir(path.dirname(manifestPath), {
    recursive: true,
  });

  const source = `import type { GalleryProject } from "@/types/gallery";

export const generatedGalleryProjects: GalleryProject[] = ${JSON.stringify(
    generated,
    null,
    2,
  )};
`;

  await writeFile(manifestPath, source, "utf8");

  console.log("");
  console.log(`Gallery pipeline complete: ${generated.length} project(s).`);
}

main().catch((error) => {
  console.error("");
  console.error("Gallery media processing failed.");

  console.error(error instanceof Error ? error.message : error);

  process.exitCode = 1;
});
