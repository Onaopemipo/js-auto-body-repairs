import fs from "node:fs";
import path from "node:path";

const requiredFiles = [
  "src/app/page.tsx",
  "src/data/homepage.ts",
  "src/components/home/section-heading.tsx",
  "src/components/home/home-hero.tsx",
  "src/components/home/trust-strip.tsx",
  "src/components/home/services-overview.tsx",
  "src/components/home/repair-process.tsx",
  "src/components/home/why-choose-us.tsx",
  "src/components/home/gallery-preview.tsx",
  "src/components/home/testimonials-preview.tsx",
  "src/components/home/insurance-support.tsx",
  "src/components/home/location-preview.tsx",
  "src/components/home/final-cta.tsx",
  "docs/homepage/phase-3a-static-homepage.md",
];

const failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(file))) {
    failures.push(`Missing homepage file: ${file}`);
  }
}

const page = fs.readFileSync("src/app/page.tsx", "utf8");

const requiredComponents = [
  "HomeHero",
  "TrustStrip",
  "ServicesOverview",
  "RepairProcess",
  "WhyChooseUs",
  "GalleryPreview",
  "TestimonialsPreview",
  "InsuranceSupport",
  "LocationPreview",
  "FinalCta",
];

for (const component of requiredComponents) {
  if (!page.includes(`<${component}`)) {
    failures.push(`Homepage does not render ${component}.`);
  }
}

const hero = fs.readFileSync("src/components/home/home-hero.tsx", "utf8");

for (const requirement of [
  "Request an estimate",
  "View completed repairs",
  "brandConfig.strapline",
]) {
  if (!hero.includes(requirement)) {
    failures.push(`Hero is missing requirement: ${requirement}`);
  }
}

const location = fs.readFileSync(
  "src/components/home/location-preview.tsx",
  "utf8",
);

if (!location.includes("ContactMap") || !location.includes("<ContactMap />")) {
  failures.push(
    "Location preview must render the shared ContactMap component.",
  );
}

if (failures.length) {
  console.error("Homepage validation failed.\n");

  failures.forEach((failure) => {
    console.error(`- ${failure}`);
  });

  process.exit(1);
}

console.log(
  `Homepage validation passed: ${requiredFiles.length} files and ${requiredComponents.length} homepage sections.`,
);
