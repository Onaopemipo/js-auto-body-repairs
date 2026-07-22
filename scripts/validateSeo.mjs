import fs from "node:fs";

const requiredFiles = [
  "src/config/seo.ts",
  "src/lib/seo/build-page-metadata.ts",
  "src/components/seo/json-ld.tsx",
  "src/components/seo/website-schema.tsx",
  "src/components/seo/organization-schema.tsx",
  "src/components/seo/global-seo-schemas.tsx",
  "src/components/seo/breadcrumb-schema.tsx",
  "src/components/seo/services-schema.tsx",
  "src/components/seo/service-faq-schema.tsx",
  "src/components/seo/service-faq-section.tsx",
  "src/content/seo/service-faqs.ts",
  "docs/seo/phase-7a-premium-seo.md",
];

const failures = requiredFiles.filter((file) => !fs.existsSync(file));

const layout = fs.readFileSync("src/app/layout.tsx", "utf8");

const robots = fs.readFileSync("src/app/robots.ts", "utf8");

const sitemap = fs.readFileSync("src/app/sitemap.ts", "utf8");

const metadataBuilder = fs.readFileSync(
  "src/lib/seo/build-page-metadata.ts",
  "utf8",
);

const organizationSchema = fs.readFileSync(
  "src/components/seo/organization-schema.tsx",
  "utf8",
);

const websiteSchema = fs.readFileSync(
  "src/components/seo/website-schema.tsx",
  "utf8",
);

const servicePage = fs.readFileSync("src/app/services/page.tsx", "utf8");

const contactConfig = fs.readFileSync("src/config/contact.ts", "utf8");

const seoConfig = fs.readFileSync("src/config/seo.ts", "utf8");

const checks = [
  ["global schema mount", layout, "<GlobalSeoSchemas"],
  ["metadata base", layout, "metadataBase"],
  ["Open Graph image", layout, "seoConfig.socialImage"],
  ["Twitter image", layout, 'card: "summary_large_image"'],
  ["API robots exclusion", robots, '"/api/"'],
  ["sitemap reference", robots, "sitemap.xml"],
  ["canonical builder", metadataBuilder, "alternates"],
  [
    "Google preview directives",
    metadataBuilder,
    '"max-image-preview": "large"',
  ],
  ["Website schema", websiteSchema, '"@type": "WebSite"'],
  ["Organization schema", organizationSchema, '"@type": "Organization"'],
  ["ContactPoint schema", organizationSchema, "ContactPoint"],
  ["service schema mount", servicePage, "<ServicesSchema"],
  ["visible FAQ", servicePage, "<ServiceFaqSection"],
  ["FAQ schema mount", servicePage, "<ServiceFaqSchema"],
  ["canonical address", contactConfig, "816 German Church Road"],
  ["canonical telephone", contactConfig, "0410 466 916"],
  ["social image", seoConfig, "/media/hero/hero-desktop.webp"],
];

for (const [label, source, needle] of checks) {
  if (!source.includes(needle)) {
    failures.push(`Missing SEO requirement: ${label}`);
  }
}

const requiredSitemapRoutes = [
  'path: ""',
  'path: "/services"',
  'path: "/gallery"',
  'path: "/about"',
  'path: "/testimonials"',
  'path: "/contact"',
  'path: "/request-estimate"',
];

for (const route of requiredSitemapRoutes) {
  if (!sitemap.includes(route)) {
    failures.push(`Missing sitemap route: ${route}`);
  }
}

for (const invalidRoute of ["/privacy", "/terms"]) {
  if (sitemap.includes(invalidRoute)) {
    failures.push(`Sitemap includes a missing route: ${invalidRoute}`);
  }
}

const metadataPages = [
  "src/app/page.tsx",
  "src/app/about/page.tsx",
  "src/app/services/page.tsx",
  "src/app/gallery/page.tsx",
  "src/app/testimonials/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/request-estimate/page.tsx",
];

for (const page of metadataPages) {
  const source = fs.readFileSync(page, "utf8");

  if (!source.includes("buildPageMetadata")) {
    failures.push(`Page does not use canonical metadata builder: ${page}`);
  }
}

const breadcrumbPages = metadataPages.filter(
  (page) => page !== "src/app/page.tsx",
);

for (const page of breadcrumbPages) {
  const source = fs.readFileSync(page, "utf8");

  if (!source.includes("<BreadcrumbSchema")) {
    failures.push(`Page does not mount breadcrumb schema: ${page}`);
  }
}

if (failures.length > 0) {
  console.error("SEO validation failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `SEO validation passed: ${requiredFiles.length} files, ${checks.length} implementation checks, ${metadataPages.length} metadata pages and ${breadcrumbPages.length} breadcrumb pages.`,
);
