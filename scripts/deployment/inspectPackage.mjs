import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const archivePath = path.resolve(
  ".deployment/js-auto-body-namecheap-preview.zip",
);

if (!fs.existsSync(archivePath)) {
  console.error(
    "Deployment archive does not exist. Run npm run deploy:package first.",
  );

  process.exit(1);
}

const listing = execFileSync("unzip", ["-Z1", archivePath], {
  encoding: "utf8",
})
  .split("\n")
  .filter(Boolean);

const failures = [];

for (const forbidden of [
  ".git/",
  "node_modules/",
  ".next/",
  ".local-data/",
  ".gallery-source/",
  ".env.local",
  ".env.production",
]) {
  if (
    listing.some((entry) => entry.startsWith(forbidden) || entry === forbidden)
  ) {
    failures.push(`Forbidden deployment content found: ${forbidden}`);
  }
}

for (const required of [
  "package.json",
  "package-lock.json",
  "server.js",
  "next.config.ts",
  "src/app/api/health/route.ts",
  "public/",
]) {
  if (
    !listing.some((entry) => entry === required || entry.startsWith(required))
  ) {
    failures.push(`Required deployment content missing: ${required}`);
  }
}

if (failures.length) {
  console.error("Deployment package inspection failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(`Deployment package inspection passed: ${listing.length} entries.`);
