import fs from "node:fs";
import path from "node:path";

const requiredFiles = [
  "src/components/navigation/desktop-navigation.tsx",
  "src/components/navigation/mobile-navigation.tsx",
  "src/components/layout/site-header.tsx",
  "src/components/layout/site-footer.tsx",
  "src/components/layout/floating-contact-actions.tsx",
  "docs/navigation/phase-2c-navigation.md",
];

const failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.resolve(file))) {
    failures.push(`Missing file: ${file}`);
  }
}

const header = fs.readFileSync("src/components/layout/site-header.tsx", "utf8");

const mobile = fs.readFileSync(
  "src/components/navigation/mobile-navigation.tsx",
  "utf8",
);

const layout = fs.readFileSync("src/app/layout.tsx", "utf8");

const footer = fs.readFileSync("src/components/layout/site-footer.tsx", "utf8");

for (const [needle, source] of [
  ["BrandLogo", header],
  ["DesktopNavigation", header],
  ["MobileNavigation", header],
  ["data-scroll-state", header],
  ["aria-expanded", mobile],
  ["aria-controls", mobile],
  ["Escape", mobile],
  ["FloatingContactActions", layout],
  ["BrandLogo", footer],
]) {
  if (!source.includes(needle)) {
    failures.push(`Missing navigation requirement: ${needle}`);
  }
}

if (failures.length) {
  console.error("Navigation validation failed.\n");

  failures.forEach((failure) => {
    console.error(`- ${failure}`);
  });

  process.exit(1);
}

console.log(`Navigation validation passed: ${requiredFiles.length} files.`);
