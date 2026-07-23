import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();

const outputDirectory = path.join(root, ".deployment");

const stagingDirectory = path.join(outputDirectory, "namecheap-preview");

const archivePath = path.join(
  outputDirectory,
  "js-auto-body-namecheap-preview.zip",
);

const checksumPath = `${archivePath}.sha256`;

const exclusions = [
  ".git",
  ".next",
  "node_modules",
  ".deployment",
  ".local-data",
  ".gallery-source",
  ".implementation-backups",
  ".DS_Store",
  ".env",
  ".env.local",
  ".env.production",
  ".env.production.local",
  ".env.development.local",
  "*.log",
  "*.pem",
];

fs.rmSync(outputDirectory, {
  recursive: true,
  force: true,
});

fs.mkdirSync(stagingDirectory, {
  recursive: true,
});

const rsyncArguments = ["-a", "--delete"];

for (const exclusion of exclusions) {
  rsyncArguments.push(`--exclude=${exclusion}`);
}

rsyncArguments.push(`${root}/`, `${stagingDirectory}/`);

execFileSync("rsync", rsyncArguments, {
  stdio: "inherit",
});

for (const required of [
  "package.json",
  "package-lock.json",
  "server.js",
  "next.config.ts",
  "src",
  "public",
]) {
  const requiredPath = path.join(stagingDirectory, required);

  if (!fs.existsSync(requiredPath)) {
    throw new Error(`Deployment package is missing ${required}.`);
  }
}

execFileSync("zip", ["-qry", archivePath, "."], {
  cwd: stagingDirectory,
  stdio: "inherit",
});

const archive = fs.readFileSync(archivePath);

const checksum = createHash("sha256").update(archive).digest("hex");

fs.writeFileSync(checksumPath, `${checksum}  ${path.basename(archivePath)}\n`);

const sizeMb = (archive.byteLength / 1024 / 1024).toFixed(2);

console.log("\nNamecheap deployment package created.");

console.log(`Archive: ${archivePath}`);

console.log(`Size: ${sizeMb} MB`);

console.log(`Checksum: ${checksumPath}`);
