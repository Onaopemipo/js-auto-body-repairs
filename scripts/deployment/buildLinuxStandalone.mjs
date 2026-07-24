import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = process.cwd();

const deploymentDirectory = path.join(root, ".deployment");
const stagingDirectory = path.join(deploymentDirectory, "namecheap-production");

const archiveName = "js-auto-body-namecheap-production.zip";

const archivePath = path.join(deploymentDirectory, archiveName);

const checksumPath = `${archivePath}.sha256`;

const hostUid = typeof process.getuid === "function" ? process.getuid() : 1000;

const hostGid = typeof process.getgid === "function" ? process.getgid() : 1000;

function run(command, args, options = {}) {
  execFileSync(command, args, {
    cwd: root,
    stdio: "inherit",
    ...options,
  });
}

function requirePath(relativePath) {
  const absolutePath = path.join(stagingDirectory, relativePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Linux deployment is missing: ${relativePath}`);
  }
}

fs.rmSync(deploymentDirectory, {
  recursive: true,
  force: true,
});

fs.mkdirSync(deploymentDirectory, {
  recursive: true,
});

console.log("Building Next.js for Linux AMD64 inside Docker...");

const containerScript = [
  "set -eu",
  "rm -rf /tmp/js-auto-build",
  "mkdir -p /tmp/js-auto-build",
  [
    "tar -C /workspace",
    "--exclude=.git",
    "--exclude=node_modules",
    "--exclude=.next",
    "--exclude=.deployment",
    "--exclude=.local-data",
    "--exclude=.gallery-source",
    "--exclude=.implementation-backups",
    "--exclude=cpanel-build.log",
    "-cf - .",
    "| tar -C /tmp/js-auto-build -xf -",
  ].join(" "),
  "cd /tmp/js-auto-build",
  "npm ci --include=dev --no-audit --no-fund",
  "npm run build",
  "rm -rf /workspace/.deployment/namecheap-production",
  "mkdir -p /workspace/.deployment/namecheap-production",
  [
    "cp -a .next/standalone/.",
    "/workspace/.deployment/namecheap-production/",
  ].join(" "),
  ["mkdir -p", "/workspace/.deployment/namecheap-production/.next"].join(" "),
  [
    "cp -a .next/static",
    "/workspace/.deployment/namecheap-production/.next/static",
  ].join(" "),
  ["cp -a public", "/workspace/.deployment/namecheap-production/public"].join(
    " ",
  ),
  [`chown -R ${hostUid}:${hostGid}`, "/workspace/.deployment"].join(" "),
].join("\n");

run("docker", [
  "run",
  "--rm",
  "--platform",
  "linux/amd64",
  "--env-file",
  path.join(root, ".env.production.local"),
  "--volume",
  `${root}:/workspace`,
  "--workdir",
  "/workspace",
  "--env",
  "NODE_ENV=production",
  "--env",
  "NEXT_PUBLIC_SITE_URL=https://jsautobodyrepairs.com.au",
  "--env",
  "NEXT_PUBLIC_SITE_INDEXABLE=true",
  "--env",
  "NEXT_PUBLIC_BUSINESS_EMAIL=info@jsautobodyrepairs.com.au",
  "--env",
  "NEXT_TELEMETRY_DISABLED=1",
  "node:22-bookworm-slim",
  "sh",
  "-lc",
  containerScript,
]);

for (const required of [
  "server.js",
  "package.json",
  "node_modules",
  ".next",
  ".next/BUILD_ID",
  ".next/static",
  "public",
]) {
  requirePath(required);
}

run("zip", ["-qry", archivePath, "."], {
  cwd: stagingDirectory,
});

const archive = fs.readFileSync(archivePath);

const checksum = createHash("sha256").update(archive).digest("hex");

fs.writeFileSync(checksumPath, `${checksum}  ${archiveName}${os.EOL}`);

const sizeMb = (archive.byteLength / 1024 / 1024).toFixed(2);

console.log("");
console.log("Linux standalone deployment created.");
console.log(`Archive: ${archivePath}`);
console.log(`Size: ${sizeMb} MB`);
console.log(`Checksum: ${checksumPath}`);
