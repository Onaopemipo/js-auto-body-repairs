# Phase 7A — Premium SEO and Search Presence

Implemented:

- canonical SEO configuration
- reusable page metadata builder
- canonical URLs
- Open Graph metadata and images
- Twitter large-image cards
- Google preview directives
- WebSite structured data
- Organization structured data
- ContactPoint structured data
- breadcrumb structured data
- service structured data
- visible service FAQ content
- matching FAQPage structured data
- improved robots rules
- sitemap containing only implemented routes
- SEO validation

## Deliberately excluded

- SearchAction because no website search exists
- geographic coordinates because none were supplied
- social profile links because none were supplied
- review aggregate schema
- invented ratings
- unsupported service-area claims
- unsupported certifications

## Social image

Phase 7A uses the current photographic hero:

````text
/media/hero/hero-desktop.webp

---

# 22. Add the SEO validator to `package.json`

```bash
cd "$HOME/Workspace/js-auto-body-repairs"

node <<'EOF'
const fs = require("node:fs");

const file = "package.json";

const packageJson = JSON.parse(
  fs.readFileSync(
    file,
    "utf8",
  ),
);

packageJson.scripts[
  "validate:seo"
] =
  "node scripts/validateSeo.mjs";

if (
  !packageJson.scripts.validate.includes(
    "validate:seo",
  )
) {
  packageJson.scripts.validate =
    packageJson.scripts.validate.replace(
      " && npm run typecheck",
      " && npm run validate:seo && npm run typecheck",
    );
}

fs.writeFileSync(
  file,
  `${JSON.stringify(
    packageJson,
    null,
    2,
  )}\n`,
);
````
