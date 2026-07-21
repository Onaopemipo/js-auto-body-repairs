import fs from "node:fs";

const requiredFiles = [
  "src/three/types/quality.ts",
  "src/three/config/quality-profiles.ts",
  "src/three/performance/detect-three-quality.ts",
  "src/three/performance/three-performance-provider.tsx",
  "src/three/canvas/adaptive-canvas.tsx",
  "src/three/components/scene-manager.tsx",
  "src/three/scenes/scene-registry.ts",
  "src/three/scenes/hero-scene.tsx",
  "src/three/camera/camera-rig.tsx",
  "src/three/lights/studio-lighting-rig.tsx",
  "src/three/environment/studio-environment.tsx",
  "src/three/models/procedural-vehicle.tsx",
  "src/three/timeline/three-timeline.ts",
  "src/components/hero3d/hero-experience.tsx",
  "src/components/hero3d/hero-experience-canvas.tsx",
  "src/components/hero3d/hero-experience-fallback.tsx",
  "docs/three/phase-4a-foundation.md",
];

const failures = requiredFiles.filter((file) => !fs.existsSync(file));

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

for (const dependency of [
  "three",
  "@react-three/fiber",
  "@react-three/drei",
  "gsap",
  "@gsap/react",
  "detect-gpu",
  "three-stdlib",
]) {
  if (!packageJson.dependencies?.[dependency]) {
    failures.push(`Missing dependency: ${dependency}`);
  }
}

const adaptiveCanvas = fs.readFileSync(
  "src/three/canvas/adaptive-canvas.tsx",
  "utf8",
);

const sceneRegistry = fs.readFileSync(
  "src/three/scenes/scene-registry.ts",
  "utf8",
);

const heroExperience = fs.readFileSync(
  "src/components/hero3d/hero-experience.tsx",
  "utf8",
);

const homepageHero = fs.readFileSync(
  "src/components/home/home-hero.tsx",
  "utf8",
);

const checks = [
  ["Canvas DPR profile", adaptiveCanvas, "dpr={profile.dpr}"],
  ["Canvas shadows profile", adaptiveCanvas, "shadows={profile.shadows}"],
  ["Lazy scene registry", sceneRegistry, "lazy(async"],
  ["Hero scene plugin", sceneRegistry, "hero:"],
  ["Client-only dynamic import", heroExperience, "ssr: false"],
  ["WebGL detection", heroExperience, 'getContext("webgl'],
  ["Reduced-motion fallback", heroExperience, "prefers-reduced-motion"],
];

for (const [label, source, needle] of checks) {
  if (!source.includes(needle)) {
    failures.push(`Missing check: ${label}`);
  }
}

const mountsThreeHero = homepageHero.includes("<HeroExperience");

const mountsPhotographicHero = homepageHero.includes("<HeroPhotographicMedia");

if (!mountsThreeHero && !mountsPhotographicHero) {
  failures.push(
    "Homepage does not mount either the Three.js hero or the photographic hero.",
  );
}

if (mountsThreeHero && mountsPhotographicHero) {
  failures.push("Homepage mounts both Three.js and photographic hero systems.");
}

if (failures.length) {
  console.error("Three.js foundation validation failed.\n");

  failures.forEach((failure) => console.error(`- ${failure}`));

  process.exit(1);
}

const runtimeMode = mountsThreeHero
  ? "active Three.js hero"
  : "dormant Three.js runtime with photographic hero";

console.log(
  `Three.js foundation validation passed: ${requiredFiles.length} files, ${checks.length} architecture checks, and ${runtimeMode}.`,
);
