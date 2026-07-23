import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const buildDirectory = path.join(root, ".next");

const buildIdPath = path.join(buildDirectory, "BUILD_ID");

const logPath = path.join(root, "cpanel-build.log");

const nextCli = path.join(root, "node_modules", "next", "dist", "bin", "next");

function writeLine(stream, message = "") {
  const line = `${message}\n`;

  process.stdout.write(line);
  stream.write(line);
}

if (!fs.existsSync(nextCli)) {
  console.error(
    "Next.js is not installed. Run NPM Install before running cpanel:build.",
  );

  process.exit(1);
}

fs.rmSync(buildDirectory, {
  recursive: true,
  force: true,
});

fs.rmSync(logPath, {
  force: true,
});

const logStream = fs.createWriteStream(logPath, {
  flags: "a",
});

writeLine(
  logStream,
  "============================================================",
);

writeLine(logStream, "JS Auto Body Repairs — cPanel production build");

writeLine(logStream, `Started: ${new Date().toISOString()}`);

writeLine(logStream, `Node: ${process.version}`);

writeLine(logStream, `Directory: ${root}`);

writeLine(
  logStream,
  `NEXT_PUBLIC_SITE_URL: ${
    process.env.NEXT_PUBLIC_SITE_URL ?? "not configured"
  }`,
);

writeLine(
  logStream,
  `NEXT_PUBLIC_SITE_INDEXABLE: ${
    process.env.NEXT_PUBLIC_SITE_INDEXABLE ?? "not configured"
  }`,
);

writeLine(
  logStream,
  "============================================================",
);

const child = spawn(process.execPath, [nextCli, "build"], {
  cwd: root,
  env: {
    ...process.env,
    NODE_ENV: "production",
  },
  stdio: ["ignore", "pipe", "pipe"],
});

child.stdout.on("data", (chunk) => {
  process.stdout.write(chunk);

  logStream.write(chunk);
});

child.stderr.on("data", (chunk) => {
  process.stderr.write(chunk);

  logStream.write(chunk);
});

child.on("error", (error) => {
  writeLine(logStream, "");

  writeLine(logStream, `BUILD PROCESS ERROR: ${error.message}`);

  logStream.end();

  process.exitCode = 1;
});

child.on("close", (code, signal) => {
  const buildExists = fs.existsSync(buildIdPath);

  writeLine(logStream, "");

  writeLine(
    logStream,
    "============================================================",
  );

  writeLine(logStream, `Next.js exit code: ${String(code)}`);

  writeLine(logStream, `Termination signal: ${signal ?? "none"}`);

  writeLine(logStream, `BUILD_ID exists: ${buildExists ? "yes" : "no"}`);

  if (buildExists) {
    const buildId = fs.readFileSync(buildIdPath, "utf8").trim();

    writeLine(logStream, `Build ID: ${buildId}`);
  }

  const passed = code === 0 && buildExists;

  writeLine(
    logStream,
    passed ? "RESULT: BUILD PASSED" : "RESULT: BUILD FAILED",
  );

  writeLine(logStream, `Finished: ${new Date().toISOString()}`);

  writeLine(
    logStream,
    "============================================================",
  );

  logStream.end(() => {
    process.exitCode = passed ? 0 : 1;
  });
});
