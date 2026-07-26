import fs from "node:fs";

const requiredFiles = [
  "src/content/site-content.ts",
  "src/config/contact.ts",
  "src/components/pages/page-hero.tsx",
  "src/components/pages/page-cta.tsx",
  "src/app/about/page.tsx",
  "src/app/services/page.tsx",
  "src/app/gallery/page.tsx",
  "src/app/testimonials/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/request-estimate/page.tsx",
  "docs/content/phase-5a-content-and-pages.md",
];

const failures = requiredFiles.filter((file) => !fs.existsSync(file));

const siteContent = fs.readFileSync("src/content/site-content.ts", "utf8");

const contactConfig = fs.readFileSync("src/config/contact.ts", "utf8");

const canonicalContactChecks = [
  ["business name", /JS Auto Body Repairs/],
  ["street address", /816 German Church Road/],
  ["suburb", /Redland Bay/],
  ["postcode", /4165/],
  ["phone display", /0481 214 187/],
  ["phone link", /tel:0481214187/],
  ["weekday opening time", /opens:\s*"08:30"/],
  ["weekday closing time", /closes:\s*"16:30"/],
];

for (const [label, pattern] of canonicalContactChecks) {
  if (!pattern.test(contactConfig)) {
    failures.push(`Missing canonical contact content: ${label}`);
  }
}

const siteContentChecks = [
  [
    "contact configuration import",
    /import\s*{\s*contactConfig\s*}\s*from\s*"@\/config\/contact";/,
  ],
  ["canonical business name", /name:\s*contactConfig\.businessName/],
  ["canonical address", /contactConfig\.address\s*\.\s*formatted/],
  ["canonical phone display", /contactConfig\.phone\s*\.\s*display/],
  ["canonical phone link", /contactConfig\.phone\s*\.\s*href/],
  ["homepage headline", /Panel Beating & Auto Refinishing/],
  ["featured review", /Jill Greenway/],
];

for (const [label, pattern] of siteContentChecks) {
  if (!pattern.test(siteContent)) {
    failures.push(`Missing site content requirement: ${label}`);
  }
}

const unsupportedClaims = [
  "lifetime warranty",
  "insurance approved",
  "OEM certified",
  "award winning",
];

for (const claim of unsupportedClaims) {
  if (siteContent.toLowerCase().includes(claim)) {
    failures.push(`Unsupported claim detected: ${claim}`);
  }
}

if (failures.length) {
  console.error("Content page validation failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `Content page validation passed: ${requiredFiles.length} files, ${canonicalContactChecks.length} canonical contact checks, and ${siteContentChecks.length} site content checks.`,
);
