import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const archivePath = path.resolve(
  ".deployment/js-auto-body-namecheap-production.zip",
);

if (!fs.existsSync(archivePath)) {
  console.error(
    "Linux deployment archive is missing. Run npm run deploy:linux first.",
  );

  process.exit(1);
}

const entries = execFileSync("unzip", ["-Z1", archivePath], {
  encoding: "utf8",
})
  .split("\n")
  .filter(Boolean);

const failures = [];

function hasEntry(required) {
  return entries.some(
    (entry) => entry === required || entry.startsWith(required),
  );
}

const requiredEntries = [
  "server.js",
  "package.json",
  ".next/BUILD_ID",
  ".next/static/",
  ".next/server/",
  ".next/server/app-paths-manifest.json",
  ".next/server/middleware-manifest.json",
  "public/",
  "node_modules/",
  "node_modules/next/",
  "node_modules/react/",
  "node_modules/react-dom/",
];

for (const required of requiredEntries) {
  if (!hasEntry(required)) {
    failures.push(`Required runtime content missing: ${required}`);
  }
}

const forbiddenEntries = [
  "src/",
  "scripts/",
  "docs/",
  ".git/",
  ".local-data/",
  ".gallery-source/",
  ".env",
  ".env.local",
  ".env.production",
  "package-lock.json",
  "cpanel-build.log",
];

for (const forbidden of forbiddenEntries) {
  if (hasEntry(forbidden)) {
    failures.push(`Forbidden deployment content found: ${forbidden}`);
  }
}

const macNativeEntries = entries.filter(
  (entry) =>
    entry.includes("darwin-") ||
    entry.includes("darwin/") ||
    entry.includes("swc-darwin") ||
    entry.includes("sharp-darwin"),
);

if (macNativeEntries.length > 0) {
  failures.push(`macOS native runtime content found: ${macNativeEntries[0]}`);
}

const buildIdEntries = entries.filter((entry) => entry === ".next/BUILD_ID");

if (buildIdEntries.length !== 1) {
  failures.push(
    `Expected exactly one .next/BUILD_ID; found ${buildIdEntries.length}.`,
  );
}

if (failures.length > 0) {
  console.error("Linux standalone inspection failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `Linux standalone inspection passed: ${entries.length} archive entries and ${requiredEntries.length} runtime requirements.`,
);
