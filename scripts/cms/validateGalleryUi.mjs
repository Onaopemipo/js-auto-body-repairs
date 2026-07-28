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
  "src/lib/gallery/gallery-labels.ts",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    failures.push(`Missing Gallery UI file: ${file}`);
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
]) {
  if (!galleryPage.includes(requirement)) {
    failures.push(`Gallery page is missing: ${requirement}`);
  }
}

const projectPage = read("src/app/gallery/[slug]/page.tsx");

for (const requirement of [
  "getGalleryProjectBySlug",
  "generateStaticParams",
  "generateMetadata",
  "notFound",
  "GalleryProjectDetail",
]) {
  if (!projectPage.includes(requirement)) {
    failures.push(`Gallery project route is missing: ${requirement}`);
  }
}

const projectCard = read("src/components/gallery/gallery-project-card.tsx");

for (const requirement of [
  "GalleryImage",
  "gallery_project_open",
  "`/gallery/${project.slug}`",
]) {
  if (!projectCard.includes(requirement)) {
    failures.push(`Gallery project card is missing: ${requirement}`);
  }
}

const projectGrid = read("src/components/gallery/gallery-project-grid.tsx");

for (const requirement of [
  "GalleryProjectCard",
  "projects.length === 0",
  "gallery_empty_state",
]) {
  if (!projectGrid.includes(requirement)) {
    failures.push(`Gallery project grid is missing: ${requirement}`);
  }
}

const projectDetail = read("src/components/gallery/gallery-project-detail.tsx");

for (const requirement of [
  "PortableText",
  "ProjectImageCollection",
  "gallery_project_detail",
]) {
  if (!projectDetail.includes(requirement)) {
    failures.push(`Gallery project detail is missing: ${requirement}`);
  }
}

const featuredWork = read("src/components/home/sanity-featured-work.tsx");

for (const requirement of [
  "getFeaturedGalleryProjects",
  "GalleryProjectCard",
  "homepage_featured_work",
]) {
  if (!featuredWork.includes(requirement)) {
    failures.push(`Homepage featured work is missing: ${requirement}`);
  }
}

const homepageCandidates = [
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

const homepageUsesFeaturedWork = homepageCandidates.some((file) =>
  read(file).includes("<SanityFeaturedWork"),
);

if (!homepageUsesFeaturedWork) {
  failures.push("Homepage does not render SanityFeaturedWork.");
}

if (failures.length > 0) {
  console.error("Gallery UI validation failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `Gallery UI validation passed: ${requiredFiles.length} required files and the Sanity homepage integration.`,
);
