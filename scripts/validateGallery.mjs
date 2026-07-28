import fs from "node:fs";

const failures = [];

const requiredFiles = [
  "src/app/gallery/page.tsx",
  "src/app/gallery/[slug]/page.tsx",
  "src/components/gallery/gallery-image.tsx",
  "src/components/gallery/gallery-project-card.tsx",
  "src/components/gallery/gallery-project-detail.tsx",
  "src/components/gallery/gallery-project-grid.tsx",
  "src/components/gallery/project-image-collection.tsx",
  "src/components/home/sanity-featured-work.tsx",
  "src/lib/gallery/gallery-content.ts",
  "src/lib/gallery/gallery-labels.ts",
  "src/lib/gallery/cms-gallery-types.ts",
  "src/lib/gallery/cms-gallery-validation.ts",
  "src/sanity/queries/gallery.ts",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    failures.push(`Missing gallery file: ${file}`);
  }
}

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

const galleryPage = read("src/app/gallery/page.tsx");

for (const requirement of [
  "getGalleryProjects",
  "GalleryProjectGrid",
  "revalidate = 300",
  'title: "Our Work"',
]) {
  if (!galleryPage.includes(requirement)) {
    failures.push(`Gallery page is missing requirement: ${requirement}`);
  }
}

const projectPage = read("src/app/gallery/[slug]/page.tsx");

for (const requirement of [
  "getGalleryProjectBySlug",
  "generateStaticParams",
  "generateMetadata",
  "notFound",
  "GalleryProjectDetail",
  "dynamicParams = true",
]) {
  if (!projectPage.includes(requirement)) {
    failures.push(
      `Gallery detail route is missing requirement: ${requirement}`,
    );
  }
}

const galleryService = read("src/lib/gallery/gallery-content.ts");

for (const requirement of [
  "getGalleryProjects",
  "getFeaturedGalleryProjects",
  "getGalleryProjectBySlug",
  "localGalleryFallback",
  "galleryProjectsQuery",
  "featuredGalleryProjectsQuery",
  "galleryProjectBySlugQuery",
]) {
  if (!galleryService.includes(requirement)) {
    failures.push(`Gallery service is missing requirement: ${requirement}`);
  }
}

const galleryCard = read("src/components/gallery/gallery-project-card.tsx");

for (const requirement of [
  "GalleryImage",
  "gallery_project_open",
  "`/gallery/${project.slug}`",
  "getGalleryCategoryLabel",
]) {
  if (!galleryCard.includes(requirement)) {
    failures.push(`Gallery card is missing requirement: ${requirement}`);
  }
}

const galleryGrid = read("src/components/gallery/gallery-project-grid.tsx");

for (const requirement of [
  "GalleryProjectCard",
  "projects.length === 0",
  "gallery_empty_state",
]) {
  if (!galleryGrid.includes(requirement)) {
    failures.push(`Gallery grid is missing requirement: ${requirement}`);
  }
}

const projectDetail = read("src/components/gallery/gallery-project-detail.tsx");

for (const requirement of [
  "PortableText",
  "ProjectImageCollection",
  "gallery_project_detail",
  "project.beforeImages",
  "project.afterImages",
]) {
  if (!projectDetail.includes(requirement)) {
    failures.push(
      `Gallery detail component is missing requirement: ${requirement}`,
    );
  }
}

const featuredWork = read("src/components/home/sanity-featured-work.tsx");

for (const requirement of [
  "getFeaturedGalleryProjects",
  "GalleryProjectCard",
  "homepage_featured_work",
]) {
  if (!featuredWork.includes(requirement)) {
    failures.push(
      `Featured work section is missing requirement: ${requirement}`,
    );
  }
}

const homepageFiles = [
  "src/app/page.tsx",
  ...(fs.existsSync("src/components/home")
    ? fs
        .readdirSync("src/components/home", {
          withFileTypes: true,
        })
        .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
        .map((entry) => `src/components/home/${entry.name}`)
    : []),
];

const homepageUsesFeaturedWork = homepageFiles.some((file) =>
  read(file).includes("<SanityFeaturedWork"),
);

if (!homepageUsesFeaturedWork) {
  failures.push("Homepage does not render SanityFeaturedWork.");
}

const galleryQueries = read("src/sanity/queries/gallery.ts");

for (const requirement of [
  "galleryProjectsQuery",
  "featuredGalleryProjectsQuery",
  "galleryProjectBySlugQuery",
  "defined(coverImage.asset)",
]) {
  if (!galleryQueries.includes(requirement)) {
    failures.push(
      `Gallery GROQ queries are missing requirement: ${requirement}`,
    );
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
  `Gallery validation passed: ${requiredFiles.length} required files and Sanity-powered gallery UI.`,
);
