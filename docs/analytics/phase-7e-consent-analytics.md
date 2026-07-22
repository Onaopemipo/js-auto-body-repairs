# Phase 7E — Consent-Controlled Analytics

Implemented:

- Google Analytics 4 configuration
- analytics disabled when no Measurement ID is configured
- basic consent behaviour
- analytics denied by default
- advertising consent always denied
- accept, reject and manage-preference controls
- consent persistence in local storage
- App Router page-view tracking
- delegated click tracking
- quote-form start tracking
- quote-form validation tracking
- successful lead tracking using `generate_lead`
- phone-click tracking
- directions-click tracking
- quote CTA tracking
- gallery-project tracking
- Core Web Vitals analytics events
- footer privacy-preferences control
- Privacy Policy updates
- Cookie Policy updates
- analytics validation

## Production configuration

Add the GA4 web-stream Measurement ID to the production environment:

````text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

---

## 24. Add analytics validation to `package.json`

```bash
cd "$HOME/Workspace/js-auto-body-repairs"

node <<'EOF'
const fs = require("node:fs");

const file = "package.json";

const pkg = JSON.parse(
  fs.readFileSync(
    file,
    "utf8",
  ),
);

pkg.scripts[
  "validate:analytics"
] =
  "node scripts/validateAnalytics.mjs";

const validationOrder = [
  "validate:foundation",
  "validate:brand-core",
  "validate:navigation",
  "validate:homepage",
  "validate:motion",
  "validate:three",
  "validate:hero-media",
  "validate:content-pages",
  "validate:quote-form",
  "validate:contact",
  "validate:gallery",
  "validate:gallery-media",
  "validate:seo",
  "validate:performance",
  "validate:production",
  "validate:analytics",
  "typecheck",
  "lint",
  "build",
];

pkg.scripts.validate =
  validationOrder
    .map(
      (script) =>
        `npm run ${script}`,
    )
    .join(" && ");

fs.writeFileSync(
  file,
  `${JSON.stringify(
    pkg,
    null,
    2,
  )}\n`,
);
````
