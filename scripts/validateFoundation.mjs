import fs from "node:fs";
import path from "node:path";

const requiredFiles = [
  ".env.example",
  "src/app/globals.css",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/robots.ts",
  "src/app/sitemap.ts",
  "src/config/site.ts",
  "src/lib/cn.ts",
  "src/components/layout/site-header.tsx",
  "src/components/layout/site-footer.tsx",
  "src/components/navigation/mobile-navigation.tsx",
  "src/components/ui/brand-placeholder.tsx",
  "src/components/ui/button-link.tsx",
  "src/components/ui/container.tsx",
  "docs/architecture/foundation.md",
];

const requiredDependencies = [
  "clsx",
  "tailwind-merge",
  "lucide-react",
  "motion",
];

const failures = [];

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.resolve(relativePath))) {
    failures.push(`Missing required file: ${relativePath}`);
  }
}

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve("package.json"), "utf8"),
);

for (const dependency of requiredDependencies) {
  if (
    !packageJson.dependencies?.[dependency] &&
    !packageJson.devDependencies?.[dependency]
  ) {
    failures.push(`Missing dependency: ${dependency}`);
  }
}

const layout = fs.readFileSync(path.resolve("src/app/layout.tsx"), "utf8");

const mobileNavigation = fs.readFileSync(
  path.resolve("src/components/navigation/mobile-navigation.tsx"),
  "utf8",
);

const globals = fs.readFileSync(path.resolve("src/app/globals.css"), "utf8");

if (!layout.includes('href="#main-content"')) {
  failures.push("Root layout does not include a skip link.");
}

if (!layout.includes('id="main-content"')) {
  failures.push("Root layout does not expose the main-content target.");
}

const usesCustomMobileMenu =
  mobileNavigation.includes("aria-expanded") &&
  mobileNavigation.includes("aria-controls");

const usesHeadlessDialog =
  mobileNavigation.includes("@headlessui/react") &&
  mobileNavigation.includes("<Dialog") &&
  mobileNavigation.includes("<DialogPanel") &&
  mobileNavigation.includes("<DialogTitle") &&
  mobileNavigation.includes("aria-expanded");

if (!usesCustomMobileMenu && !usesHeadlessDialog) {
  failures.push(
    "Mobile navigation accessibility implementation is incomplete.",
  );
}

if (usesHeadlessDialog && !packageJson.dependencies?.["@headlessui/react"]) {
  failures.push(
    "Headless UI mobile navigation is present but @headlessui/react is not installed.",
  );
}

if (!globals.includes("prefers-reduced-motion")) {
  failures.push("Reduced-motion handling is missing.");
}

if (failures.length > 0) {
  console.error("Foundation validation failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

const navigationMode = usesHeadlessDialog
  ? "Headless UI Dialog"
  : "custom accessible overlay";

console.log(
  `Foundation validation passed: ${requiredFiles.length} files, ${requiredDependencies.length} dependencies, and ${navigationMode} navigation.`,
);
