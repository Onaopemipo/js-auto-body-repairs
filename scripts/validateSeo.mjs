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

function read(file) {
  return fs.readFileSync(file, "utf8");
}

const layout = read("src/app/layout.tsx");

const robots = read("src/app/robots.ts");

const sitemap = read("src/app/sitemap.ts");

const metadataBuilder = read("src/lib/seo/build-page-metadata.ts");

const organizationSchema = read("src/components/seo/organization-schema.tsx");

const websiteSchema = read("src/components/seo/website-schema.tsx");

const servicePage = read("src/app/services/page.tsx");

const contactConfig = read("src/config/contact.ts");

const seoConfig = read("src/config/seo.ts");

const checks = [
  ["global schema mount", layout, "<GlobalSeoSchemas"],
  ["SEO configuration import", layout, 'from "@/config/seo"'],
  ["metadata base", layout, "metadataBase"],
  ["root Open Graph image", layout, "seoConfig.socialImage"],
  ["Twitter large image card", layout, 'card: "summary_large_image"'],
  ["API robots exclusion", robots, '"/api/"'],
  ["sitemap declaration", robots, "sitemap.xml"],
  ["canonical metadata builder", metadataBuilder, "alternates"],
  ["page Open Graph image", metadataBuilder, "seoConfig.socialImage"],
  [
    "Google preview directives",
    metadataBuilder,
    '"max-image-preview": "large"',
  ],
  ["Website schema", websiteSchema, '"@type": "WebSite"'],
  ["Organization schema", organizationSchema, '"@type": "Organization"'],
  ["ContactPoint schema", organizationSchema, "ContactPoint"],
  ["service schema mount", servicePage, "<ServicesSchema"],
  ["visible service FAQ", servicePage, "<ServiceFaqSection"],
  ["FAQ schema mount", servicePage, "<ServiceFaqSchema"],
  ["canonical address", contactConfig, "816 German Church Road"],
  ["canonical telephone", contactConfig, "0410 466 916"],
  ["static social photograph", seoConfig, "/media/hero/hero-desktop.webp"],
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
  'path: "/privacy"',
  'path: "/terms"',
  'path: "/cookies"',
];

for (const route of requiredSitemapRoutes) {
  if (!sitemap.includes(route)) {
    failures.push(`Missing sitemap route: ${route}`);
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
  "src/app/privacy/page.tsx",
  "src/app/terms/page.tsx",
  "src/app/cookies/page.tsx",
];

for (const page of metadataPages) {
  if (!read(page).includes("buildPageMetadata")) {
    failures.push(`Page does not use metadata builder: ${page}`);
  }
}

const breadcrumbPages = metadataPages.filter(
  (page) => page !== "src/app/page.tsx",
);

for (const page of breadcrumbPages) {
  if (!read(page).includes("<BreadcrumbSchema")) {
    failures.push(`Page does not mount breadcrumb schema: ${page}`);
  }
}

if (failures.length) {
  console.error("SEO validation failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `SEO validation passed: ${requiredFiles.length} files, ${checks.length} implementation checks, ${metadataPages.length} metadata pages and ${breadcrumbPages.length} breadcrumb pages.`,
);
