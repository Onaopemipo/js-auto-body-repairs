#!/usr/bin/env zsh
set -Eeuo pipefail

PROJECT_ROOT="${PROJECT_ROOT:-$HOME/Workspace/js-auto-body-repairs}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="$HOME/.js-auto-body-external-backups/phase-4b-photographic-hero-$TIMESTAMP"

trap 'code=$?; echo; echo "PHASE 4B FAILED"; echo "Exit code: $code"; echo "Line: $LINENO"; exit $code' ERR

cd "$PROJECT_ROOT"

test -f package.json || { echo "ERROR: package.json not found."; exit 1; }
test -f src/components/home/home-hero.tsx || { echo "ERROR: hero not found."; exit 1; }

echo "=== Baseline validation ==="
npm run validate

mkdir -p "$BACKUP_DIR"
rsync -a --exclude=node_modules --exclude=.next --exclude=.git "$PROJECT_ROOT/" "$BACKUP_DIR/"
echo "Backup: $BACKUP_DIR"

mkdir -p public/media/hero src/components/hero-media src/config docs/media scripts

cat > public/media/hero/README.md <<'EOF'
Add licensed or business-owned hero images here:

- hero-desktop.webp — recommended 2400×1600
- hero-mobile.webp — recommended 1200×1600
- optional JPEG fallbacks with matching names

Avoid watermarks, screenshots, low-resolution images, and unlicensed manufacturer imagery.
EOF

cat > src/config/hero-media.ts <<'EOF'
export const heroMediaConfig = {
  desktop: {
    webp: "/media/hero/hero-desktop.webp",
    fallback: "/media/hero/hero-desktop.jpg",
  },
  mobile: {
    webp: "/media/hero/hero-mobile.webp",
    fallback: "/media/hero/hero-mobile.jpg",
  },
  alt:
    "Professionally restored vehicle inside an automotive body repair workshop",
  focalPoint: "72% 50%",
} as const;
EOF

cat > src/components/hero-media/hero-media-fallback.tsx <<'EOF'
export function HeroMediaFallback() {
  return (
    <div
      role="img"
      aria-label="Dark automotive workshop atmosphere"
      className="absolute inset-0 overflow-hidden bg-[linear-gradient(145deg,#1b1b1e_0%,#0b0b0c_48%,#080809_100%)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(231,7,11,0.18),transparent_30%)]"
      />
    </div>
  );
}
EOF

cat > src/components/hero-media/hero-photographic-media.tsx <<'EOF'
"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import {
  useRef,
  useState,
} from "react";

import { HeroMediaFallback } from "@/components/hero-media/hero-media-fallback";
import { heroMediaConfig } from "@/config/hero-media";

export function HeroPhotographicMedia() {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["0%", "10%"],
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [1.03, 1.1],
  );

  if (failed) {
    return (
      <div ref={ref} className="absolute inset-0">
        <HeroMediaFallback />
      </div>
    );
  }

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={heroMediaConfig.mobile.webp}
            type="image/webp"
          />
          <source
            media="(min-width: 768px)"
            srcSet={heroMediaConfig.desktop.webp}
            type="image/webp"
          />
          <Image
            src={heroMediaConfig.desktop.fallback}
            alt={heroMediaConfig.alt}
            fill
            priority
            sizes="100vw"
            quality={92}
            onError={() => setFailed(true)}
            className="object-cover"
            style={{
              objectPosition:
                heroMediaConfig.focalPoint,
            }}
          />
        </picture>
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,9,0.98)_0%,rgba(8,8,9,0.88)_42%,rgba(8,8,9,0.28)_72%,rgba(8,8,9,0.62)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,9,0.52)_0%,transparent_28%,rgba(8,8,9,0.68)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(231,7,11,0.18),transparent_30%)]"
      />
    </div>
  );
}
EOF

python3 <<'PY'
from pathlib import Path

path = Path("src/components/home/home-hero.tsx")
text = path.read_text()

for old in [
    'import { HeroExperience } from "@/components/hero3d/hero-experience";\n',
    'import { HeroExperienceFallback } from "@/components/hero3d/hero-experience-fallback";\n',
]:
    text = text.replace(old, "")

import_line = (
    'import { HeroPhotographicMedia } '
    'from "@/components/hero-media/hero-photographic-media";\n'
)

if import_line not in text:
    text = import_line + text

start = text.find('      <div\n        aria-hidden="true"\n        className="absolute inset-0')
container = text.find("      <Container ", start)

if start == -1 or container == -1:
    raise SystemExit("Could not locate the old hero media block.")

text = (
    text[:start]
    + "      <HeroPhotographicMedia />\n\n"
    + text[container:]
)

text = text.replace("<HeroExperience />", "<HeroPhotographicMedia />")
text = text.replace("<HeroExperienceFallback />", "<HeroPhotographicMedia />")

path.write_text(text)
PY

cat > docs/media/phase-4b-photographic-hero.md <<'EOF'
# Phase 4B — Photographic Hero

The procedural vehicle is no longer mounted in the homepage hero.

The hero now supports:

- desktop and mobile photography
- WebP-first delivery
- JPEG fallback
- subtle parallax
- reduced-motion fallback
- cinematic overlays
- graceful missing-image fallback

The Three.js runtime remains dormant until a professional GLB model is available.
EOF

cat > scripts/validatePhotographicHero.mjs <<'EOF'
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

const hero = fs.readFileSync(
  "src/components/home/home-hero.tsx",
  "utf8",
);

if (!hero.includes("<HeroPhotographicMedia")) {
  failures.push("HeroPhotographicMedia is not mounted.");
}

if (hero.includes("<HeroExperience")) {
  failures.push("Three.js hero is still mounted.");
}

if (failures.length) {
  console.error("Photographic hero validation failed.\n");
  failures.forEach((failure) =>
    console.error(`- ${failure}`),
  );
  process.exit(1);
}

console.log(
  `Photographic hero validation passed: ${files.length} files.`,
);
EOF

node <<'EOF'
const fs = require("node:fs");
const file = "package.json";
const pkg = JSON.parse(fs.readFileSync(file, "utf8"));

pkg.scripts = {
  ...pkg.scripts,
  "validate:hero-media":
    "node scripts/validatePhotographicHero.mjs",
  validate:
    "npm run validate:foundation && npm run validate:brand-core && npm run validate:navigation && npm run validate:homepage && npm run validate:motion && npm run validate:three && npm run validate:hero-media && npm run typecheck && npm run lint && npm run build",
};

fs.writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`);
EOF

npx prettier --write   src/config/hero-media.ts   "src/components/hero-media/**/*.{ts,tsx}"   src/components/home/home-hero.tsx   scripts/validatePhotographicHero.mjs   docs/media/phase-4b-photographic-hero.md   public/media/hero/README.md   package.json

npm run validate:hero-media
npm run typecheck
npm run lint
rm -rf .next
npm run build
npm run validate

git add   package.json   src/config/hero-media.ts   src/components/hero-media   src/components/home/home-hero.tsx   public/media/hero/README.md   scripts/validatePhotographicHero.mjs   docs/media/phase-4b-photographic-hero.md

if git diff --cached --quiet; then
  echo "No staged Phase 4B changes."
else
  git commit -m "feat: add photographic hero media system"
fi

echo
echo "PHASE 4B COMPLETE"
echo "Project: $PROJECT_ROOT"
echo "Backup: $BACKUP_DIR"
