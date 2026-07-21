import fs from "node:fs";

const files = [
  "src/config/hero-media.ts",
  "src/components/hero-media/hero-media-fallback.tsx",
  "src/components/hero-media/hero-photographic-media.tsx",
  "src/components/home/home-hero.tsx",
  "public/media/hero/README.md",
  "docs/media/phase-4b-photographic-hero.md",
];

const failures = files.filter((file) => !fs.existsSync(file));

const hero = fs.readFileSync("src/components/home/home-hero.tsx", "utf8");

if (!hero.includes("<HeroPhotographicMedia")) {
  failures.push("HeroPhotographicMedia is not mounted.");
}

if (hero.includes("<HeroExperience")) {
  failures.push("Three.js hero is still mounted.");
}

if (failures.length) {
  console.error("Photographic hero validation failed.\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Photographic hero validation passed: ${files.length} files.`);
