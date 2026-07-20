import fs from "node:fs";
import path from "node:path";

const requiredFiles = [
  "src/components/navigation/desktop-navigation.tsx",
  "src/components/navigation/mobile-navigation.tsx",
  "src/components/layout/site-header.tsx",
  "src/components/layout/site-footer.tsx",
  "src/components/layout/floating-contact-actions.tsx",
  "docs/navigation/phase-2c-navigation.md",
  "docs/navigation/headless-dialog-mobile-navigation.md",
];

const failures = [];

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.resolve(relativePath))) {
    failures.push(`Missing navigation file: ${relativePath}`);
  }
}

const header = fs.readFileSync(
  path.resolve("src/components/layout/site-header.tsx"),
  "utf8",
);

const desktopNavigation = fs.readFileSync(
  path.resolve("src/components/navigation/desktop-navigation.tsx"),
  "utf8",
);

const mobileNavigation = fs.readFileSync(
  path.resolve("src/components/navigation/mobile-navigation.tsx"),
  "utf8",
);

const layout = fs.readFileSync(path.resolve("src/app/layout.tsx"), "utf8");

const footer = fs.readFileSync(
  path.resolve("src/components/layout/site-footer.tsx"),
  "utf8",
);

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve("package.json"), "utf8"),
);

const sourceRequirements = [
  {
    label: "Header uses BrandLogo",
    source: header,
    value: "BrandLogo",
  },
  {
    label: "Header uses DesktopNavigation",
    source: header,
    value: "DesktopNavigation",
  },
  {
    label: "Header uses MobileNavigation",
    source: header,
    value: "MobileNavigation",
  },
  {
    label: "Header exposes scroll state",
    source: header,
    value: "data-scroll-state",
  },
  {
    label: "Desktop navigation uses active routes",
    source: desktopNavigation,
    value: "usePathname",
  },
  {
    label: "Mobile navigation imports Headless UI",
    source: mobileNavigation,
    value: "@headlessui/react",
  },
  {
    label: "Mobile navigation uses Dialog",
    source: mobileNavigation,
    value: "<Dialog",
  },
  {
    label: "Mobile navigation uses DialogBackdrop",
    source: mobileNavigation,
    value: "<DialogBackdrop",
  },
  {
    label: "Mobile navigation uses DialogPanel",
    source: mobileNavigation,
    value: "<DialogPanel",
  },
  {
    label: "Mobile navigation uses DialogTitle",
    source: mobileNavigation,
    value: "<DialogTitle",
  },
  {
    label: "Hamburger exposes expanded state",
    source: mobileNavigation,
    value: "aria-expanded",
  },
  {
    label: "Mobile navigation uses dynamic viewport height",
    source: mobileNavigation,
    value: "100dvh",
  },
  {
    label: "Layout renders floating actions",
    source: layout,
    value: "FloatingContactActions",
  },
  {
    label: "Footer uses BrandLogo",
    source: footer,
    value: "BrandLogo",
  },
];

for (const requirement of sourceRequirements) {
  if (!requirement.source.includes(requirement.value)) {
    failures.push(requirement.label);
  }
}

if (!packageJson.dependencies?.["@headlessui/react"]) {
  failures.push("Missing dependency: @headlessui/react");
}

const navigationLabels = [
  "Home",
  "Services",
  "Our Work",
  "About",
  "Reviews",
  "Contact",
];

const siteConfig = fs.readFileSync(path.resolve("src/config/site.ts"), "utf8");

for (const label of navigationLabels) {
  if (!siteConfig.includes(`label: "${label}"`)) {
    failures.push(`Missing navigation item: ${label}`);
  }
}

if (failures.length > 0) {
  console.error("Navigation validation failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `Navigation validation passed: ${requiredFiles.length} files, ${sourceRequirements.length} implementation checks, and ${navigationLabels.length} links.`,
);
