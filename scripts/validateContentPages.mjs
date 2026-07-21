import fs from "node:fs";

const files = [
  "src/content/site-content.ts",
  "src/components/pages/page-hero.tsx",
  "src/components/pages/page-cta.tsx",
  "src/app/about/page.tsx",
  "src/app/services/page.tsx",
  "src/app/gallery/page.tsx",
  "src/app/testimonials/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/request-estimate/page.tsx",
  "docs/content/phase-5a-content-and-pages.md",
];

const failures = files.filter((file) => !fs.existsSync(file));
const content = fs.readFileSync("src/content/site-content.ts", "utf8");

for (const value of [
  "816 German Church Road",
  "0410 466 916",
  "Monday – Friday: 8:30am – 4:30pm",
  "Panel Beating & Auto Refinishing",
  "Jill Greenway",
]) {
  if (!content.includes(value))
    failures.push(`Missing canonical content: ${value}`);
}

if (failures.length) {
  console.error("Content page validation failed.\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Content page validation passed: ${files.length} files.`);
