import fs from "node:fs";

const failures = [];

const requiredFiles = [
  "next.config.ts",
  "scripts/deployment/buildLinuxStandalone.mjs",
  "scripts/deployment/inspectLinuxStandalone.mjs",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    failures.push(`Missing Linux deployment file: ${file}`);
  }
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

const nextConfig = read("next.config.ts");
const packageJson = JSON.parse(read("package.json"));
const builder = read("scripts/deployment/buildLinuxStandalone.mjs");

const checks = [
  ["standalone output", nextConfig, 'output: "standalone"'],
  ["Linux AMD64 platform", builder, '"linux/amd64"'],
  ["Node 22 Linux image", builder, '"node:22-bookworm-slim"'],
  ["production site URL", builder, "https://jsautobodyrepairs.com.au"],
  ["standalone server copy", builder, ".next/standalone"],
  ["static asset copy", builder, ".next/static"],
];

for (const [label, source, value] of checks) {
  if (!source.includes(value)) {
    failures.push(`Missing Linux deployment requirement: ${label}`);
  }
}

for (const script of [
  "validate:linux-deployment",
  "deploy:linux",
  "deploy:linux:inspect",
]) {
  if (!packageJson.scripts?.[script]) {
    failures.push(`Missing package script: ${script}`);
  }
}

if (failures.length > 0) {
  console.error("Linux deployment validation failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `Linux deployment validation passed: ${requiredFiles.length} files and ${checks.length} implementation checks.`,
);
