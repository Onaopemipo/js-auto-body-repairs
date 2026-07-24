import fs from "node:fs";

const requiredFiles = [
  ".nvmrc",
  ".node-version",
  ".cpanel.yml",
  "server.js",
  "src/config/deployment.ts",
  "src/app/api/health/route.ts",
  "scripts/deployment/buildPackage.mjs",
  "scripts/deployment/inspectPackage.mjs",
  "scripts/deployment/verifyEnvironment.mjs",
  "scripts/deployment/smokeTest.mjs",
  "docs/deployment/namecheap-preview-deployment.md",
  "docs/deployment/namecheap-cpanel-checklist.md",
];

const failures = requiredFiles.filter((file) => !fs.existsSync(file));

function read(file) {
  return fs.readFileSync(file, "utf8");
}

const server = read("server.js");

const nextConfig = read("next.config.ts");

const robots = read("src/app/robots.ts");

const health = read("src/app/api/health/route.ts");

const packageJson = JSON.parse(read("package.json"));

const envExample = read(".env.example");

const checks = [
  ["Passenger port", server, "process.env.PORT"],
  ["Next request handler", server, "getRequestHandler"],
  ["preview noindex header", nextConfig, "X-Robots-Tag"],
  ["preview robots protection", robots, 'disallow: "/"'],
  ["health response", health, "ok: true"],
  ["preview URL", envExample, "https://jsautobodyrepairs.com.au"],
  ["indexability variable", envExample, "NEXT_PUBLIC_SITE_INDEXABLE=true"],
  ["Turnstile secret", envExample, "TURNSTILE_SECRET="],
  ["SMTP password", envExample, "SMTP_PASSWORD="],
];

for (const [label, source, needle] of checks) {
  if (!source.includes(needle)) {
    failures.push(`Missing Namecheap deployment requirement: ${label}`);
  }
}

for (const script of [
  "validate:namecheap",
  "deploy:package",
  "deploy:inspect",
  "deploy:smoke",
  "deploy:verify-env",
]) {
  if (!packageJson.scripts?.[script]) {
    failures.push(`Missing package script: ${script}`);
  }
}

if (packageJson.engines?.node !== ">=22.0.0 <23") {
  failures.push("Node engine is not pinned to Node 22.");
}

if (failures.length) {
  console.error("Namecheap deployment validation failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `Namecheap deployment validation passed: ${requiredFiles.length} files and ${checks.length} implementation checks.`,
);
