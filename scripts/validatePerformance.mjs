import fs from "node:fs";
import path from "node:path";

const requiredFiles = [
  "src/config/performance.ts",
  "src/components/performance/web-vitals-reporter.tsx",
  "src/lib/performance/report-web-vital.ts",
  "docs/performance/phase-7c-performance-foundation.md",
];

const failures = requiredFiles.filter((file) => !fs.existsSync(file));

function read(file) {
  return fs.readFileSync(file, "utf8");
}

const packageJson = JSON.parse(read("package.json"));

const layout = read("src/app/layout.tsx");

const reporter = read("src/components/performance/web-vitals-reporter.tsx");

const reportFunction = read("src/lib/performance/report-web-vital.ts");

const performanceConfig = read("src/config/performance.ts");

const nextConfig = read("next.config.ts");

const checks = [
  ["Web Vitals mount", layout, "<WebVitalsReporter"],
  ["Web Vitals hook", reporter, "useReportWebVitals"],
  ["stable callback", reporter, "reportWebVital"],
  ["callback type inference", reportFunction, "Parameters<"],
  ["development reporting", reportFunction, "process.env.NODE_ENV"],
  ["Beacon reporting", reportFunction, "navigator.sendBeacon"],
  ["fetch fallback", reportFunction, "keepalive: true"],
  ["image budget", performanceConfig, "publicImageMaximumBytes"],
  ["hero image budget", performanceConfig, "heroImageMaximumBytes"],
  ["AVIF support", nextConfig, '"image/avif"'],
  ["WebP support", nextConfig, '"image/webp"'],
  ["experimental attribution", nextConfig, "webVitalsAttribution"],
];

for (const [label, source, needle] of checks) {
  if (!source.includes(needle)) {
    failures.push(`Missing performance requirement: ${label}`);
  }
}

if (packageJson.scripts?.["validate:social-images"]) {
  failures.push("Obsolete social-image validator remains in package.json.");
}

for (const obsolete of [
  "src/config/social-images.ts",
  "scripts/validateSocialImages.mjs",
  "src/components/seo/social-image",
]) {
  if (fs.existsSync(obsolete)) {
    failures.push(
      `Obsolete dynamic social-image resource remains: ${obsolete}`,
    );
  }
}

const publicImages = [];

function walkImages(directory) {
  if (!fs.existsSync(directory)) {
    return;
  }

  for (const entry of fs.readdirSync(directory, {
    withFileTypes: true,
  })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walkImages(fullPath);
      continue;
    }

    if (/\.(png|jpe?g|webp|avif)$/i.test(entry.name)) {
      publicImages.push(fullPath);
    }
  }
}

walkImages("public");

for (const file of publicImages) {
  const bytes = fs.statSync(file).size;

  let maximum = 2_500_000;

  if (file.includes(`${path.sep}media${path.sep}hero${path.sep}`)) {
    maximum = 900_000;
  }

  if (
    file.includes(`${path.sep}gallery${path.sep}`) &&
    file.includes("thumbnail")
  ) {
    maximum = 400_000;
  }

  if (bytes > maximum) {
    failures.push(
      `Image exceeds budget: ${file} (${bytes} > ${maximum} bytes)`,
    );
  }
}

if (failures.length) {
  console.error("Performance validation failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `Performance validation passed: ${requiredFiles.length} files, ${checks.length} implementation checks and ${publicImages.length} public images inspected.`,
);
