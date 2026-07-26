import fs from "node:fs";
import path from "node:path";

const requiredFiles = [
  "src/content/legal/legal-content.ts",
  "src/components/legal/legal-document.tsx",
  "src/components/legal/legal-contact.tsx",
  "src/app/privacy/page.tsx",
  "src/app/terms/page.tsx",
  "src/app/cookies/page.tsx",
  "docs/production/phase-7d-site-polish.md",
];

const failures = requiredFiles.filter((file) => !fs.existsSync(file));

function read(file) {
  return fs.readFileSync(file, "utf8");
}

const footer = read("src/components/layout/site-footer.tsx");

const header = read("src/components/layout/site-header.tsx");

const sitemap = read("src/app/sitemap.ts");

const quoteForm = read("src/components/forms/quote-request-form.tsx");

const checks = [
  ["privacy footer link", footer, 'href: "/privacy"'],
  ["terms footer link", footer, 'href: "/terms"'],
  ["cookies footer link", footer, 'href: "/cookies"'],
  ["canonical footer phone", footer, "contactConfig.phone"],
  ["canonical footer address", footer, "contactConfig.address.formatted"],
  ["canonical header phone", header, "contactConfig.phone.href"],
  ["privacy sitemap route", sitemap, 'path: "/privacy"'],
  ["terms sitemap route", sitemap, 'path: "/terms"'],
  ["cookies sitemap route", sitemap, 'path: "/cookies"'],
  ["quote fallback phone spacing", quoteForm, "Please call 0481 214 187"],
];

for (const [label, source, needle] of checks) {
  if (!source.includes(needle)) {
    failures.push(`Missing production-readiness requirement: ${label}`);
  }
}

const sourceFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, {
    withFileTypes: true,
  })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      sourceFiles.push(fullPath);
    }
  }
}

walk("src");

const malformedPatterns = [
  {
    label: "concatenated grid classes",
    pattern: /\bgridgrid-/,
  },
  {
    label: "concatenated transition class",
    pattern: /\btext-centertransition\b/,
  },
  {
    label: "concatenated responsive utility",
    pattern: /\bpy-\d+(?:\.\d+)?(?:sm|md|lg|xl|2xl):/,
  },
  {
    label: "concatenated tracking and text class",
    pattern: /tracking-\[[^\]]+\]text-/,
  },
  {
    label: "concatenated spacing and text class",
    pattern: /\bpy-\d+(?:\.\d+)?text-/,
  },
  {
    label: "missing JSX attribute spacing",
    pattern: /\{false\}\/>/,
  },
];

for (const file of sourceFiles) {
  const source = read(file);

  for (const { label, pattern } of malformedPatterns) {
    if (pattern.test(source)) {
      failures.push(`${label} found in ${file}`);
    }
  }
}

const appRoutes = new Set(["/"]);

function discoverRoutes(directory, segments = []) {
  for (const entry of fs.readdirSync(directory, {
    withFileTypes: true,
  })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      discoverRoutes(fullPath, [...segments, entry.name]);

      continue;
    }

    if (entry.name === "page.tsx") {
      const route =
        `/${segments.join("/")}`.replace(/\/+/g, "/").replace(/\/$/, "") || "/";

      appRoutes.add(route);
    }
  }
}

discoverRoutes("src/app");

const internalLinkPattern =
  /(?:href|path):?\s*=\s*["'](\/[^"'?#]*)["']|href:\s*["'](\/[^"'?#]*)["']/g;

for (const file of sourceFiles) {
  const source = read(file);

  for (const match of source.matchAll(internalLinkPattern)) {
    const href = match[1] || match[2];

    if (!href || href.startsWith("/api/") || href.includes("[")) {
      continue;
    }

    const normalised = href.length > 1 ? href.replace(/\/$/, "") : href;

    if (!appRoutes.has(normalised)) {
      failures.push(
        `Internal link references missing route ${normalised} in ${file}`,
      );
    }
  }
}

for (const route of ["privacy", "terms", "cookies"]) {
  const page = `src/app/${route}/page.tsx`;

  const source = read(page);

  if (!source.includes("buildPageMetadata")) {
    failures.push(`Legal route lacks metadata: /${route}`);
  }

  if (!source.includes("<BreadcrumbSchema")) {
    failures.push(`Legal route lacks breadcrumb schema: /${route}`);
  }
}

for (const placeholder of [
  "Phone details pending",
  "Workshop location pending",
  "Lorem ipsum",
  "replace-with-",
]) {
  for (const file of sourceFiles) {
    if (read(file).includes(placeholder)) {
      failures.push(`Placeholder "${placeholder}" remains in ${file}`);
    }
  }
}

if (failures.length) {
  console.error("Production readiness validation failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `Production readiness validation passed: ${requiredFiles.length} required files, ${checks.length} implementation checks, ${sourceFiles.length} source files and ${appRoutes.size} routes inspected.`,
);
