# Namecheap Stellar Plus Preview Deployment

## cPanel Node.js application

Use:

````text
Node.js version: 22.23.0
Application mode: Production
Application root: js-auto-body-preview
Application URL: delightful-fuchsia-horse.jsautobodyrepairs.com.au
Startup file: server.js

---

# 17. Add deployment scripts to `package.json`

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
  "validate:namecheap"
] =
  "node scripts/validateNamecheapDeployment.mjs";

pkg.scripts[
  "deploy:package"
] =
  "npm run validate && node scripts/deployment/buildPackage.mjs && npm run deploy:inspect";

pkg.scripts[
  "deploy:inspect"
] =
  "node scripts/deployment/inspectPackage.mjs";

pkg.scripts[
  "deploy:verify-env"
] =
  "node scripts/deployment/verifyEnvironment.mjs";

pkg.scripts[
  "deploy:smoke"
] =
  "node scripts/deployment/smokeTest.mjs";

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
  "validate:namecheap",
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
