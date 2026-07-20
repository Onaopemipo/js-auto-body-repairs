import fs from "node:fs";
import path from "node:path";

const requiredFiles = [
  "src/config/brand.ts",
  "src/components/brand/brand-logo.tsx",
  "docs/brand/brand-system.md",
  "public/brand/generated/js-auto-body-logo.png",
  "public/brand/generated/js-auto-body-logo.webp",
  "public/brand/generated/js-auto-body-logo-header.png",
  "public/brand/generated/js-auto-body-mark.png",
  "public/brand/generated/apple-touch-icon.png",
  "public/brand/generated/favicon-64.png",
];

const failures = [];

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.resolve(relativePath))) {
    failures.push(`Missing required file: ${relativePath}`);
  }
}

const globals = fs.readFileSync(path.resolve("src/app/globals.css"), "utf8");

const layout = fs.readFileSync(path.resolve("src/app/layout.tsx"), "utf8");

const siteConfig = fs.readFileSync(path.resolve("src/config/site.ts"), "utf8");

const requiredTokens = [
  "--brand-primary: #e7070b",
  "--brand-primary-hover: #ff171b",
  "--brand-primary-dark: #a50303",
  "--metallic-silver: #8a8a8f",
  "--graphite: #38383b",
];

for (const token of requiredTokens) {
  if (!globals.includes(token)) {
    failures.push(`Missing brand token: ${token}`);
  }
}

if (!layout.includes("brandConfig.logo.favicon")) {
  failures.push("Metadata does not use the configured favicon.");
}

if (!siteConfig.includes("brandConfig.name")) {
  failures.push("Site configuration is not connected to brandConfig.");
}

if (failures.length > 0) {
  console.error("Brand core validation failed.\n");

  failures.forEach((failure) => {
    console.error(`- ${failure}`);
  });

  process.exit(1);
}

console.log(
  `Brand core validation passed: ${requiredFiles.length} files and ${requiredTokens.length} tokens.`,
);
