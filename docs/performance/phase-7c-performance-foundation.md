# Phase 7C — Core Web Vitals and Performance Foundation

Implemented:

- removal of the abandoned dynamic social-image experiment
- restoration of static photographic social metadata
- Next.js 16 Image `preload` migration
- Core Web Vitals reporting
- optional beacon delivery
- development console reporting
- LCP and CLS attribution
- AVIF and WebP image output preferences
- image-size budgets
- raw image-element checks
- preload-count checks
- performance validation

## Web Vitals

The following metrics are reported:

- CLS
- FCP
- INP
- LCP
- TTFB

During development, metrics are logged to the browser console.

For production delivery, configure:

````text
NEXT_PUBLIC_WEB_VITALS_ENDPOINT=

## 13. Add the performance validator to `package.json`

```bash
cd "$HOME/Workspace/js-auto-body-repairs"

node <<'EOF'
const fs = require("node:fs");

const file = "package.json";
const pkg = JSON.parse(
  fs.readFileSync(file, "utf8"),
);

pkg.scripts[
  "validate:performance"
] =
  "node scripts/validatePerformance.mjs";

if (
  !pkg.scripts.validate.includes(
    "validate:performance",
  )
) {
  pkg.scripts.validate =
    pkg.scripts.validate.replace(
      " && npm run typecheck",
      " && npm run validate:performance && npm run typecheck",
    );
}

fs.writeFileSync(
  file,
  `${JSON.stringify(pkg, null, 2)}\n`,
);
````
