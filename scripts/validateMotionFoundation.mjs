import fs from "node:fs";

const required = [
  "src/providers/smooth-scroll-provider.tsx",
  "src/components/motion/reveal.tsx",
  "src/components/motion/scroll-progress.tsx",
  "src/components/motion/motion-shell.tsx",
  "docs/motion/phase-3b-motion-foundation.md",
];

const failures = required.filter((file) => !fs.existsSync(file));

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

if (!packageJson.dependencies?.lenis) {
  failures.push("Missing dependency: lenis");
}

const provider = fs.readFileSync(
  "src/providers/smooth-scroll-provider.tsx",
  "utf8",
);

const reveal = fs.readFileSync("src/components/motion/reveal.tsx", "utf8");

const layout = fs.readFileSync("src/app/layout.tsx", "utf8");

for (const [label, source, needle] of [
  ["Lenis", provider, "new Lenis"],
  ["autoRaf", provider, "autoRaf: true"],
  ["reduced motion", provider, "prefers-reduced-motion"],
  ["native touch", provider, "syncTouch: false"],
  ["useInView", reveal, "useInView"],
  ["MotionShell", layout, "<MotionShell>"],
]) {
  if (!source.includes(needle)) {
    failures.push(`Missing check: ${label}`);
  }
}

if (failures.length) {
  console.error("Motion validation failed.\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Motion validation passed: ${required.length} files.`);
