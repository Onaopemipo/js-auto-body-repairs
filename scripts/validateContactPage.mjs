import fs from "node:fs";

const requiredFiles = [
  "src/config/contact.ts",
  "src/lib/business-open-status.ts",
  "src/components/contact/open-status.tsx",
  "src/components/contact/business-hours.tsx",
  "src/components/contact/copy-address.tsx",
  "src/components/contact/contact-actions.tsx",
  "src/components/contact/contact-map.tsx",
  "src/components/contact/local-business-schema.tsx",
  "src/app/contact/page.tsx",
];

const failures = requiredFiles.filter((file) => !fs.existsSync(file));

const contactConfig = fs.readFileSync("src/config/contact.ts", "utf8");

const contactPage = fs.readFileSync("src/app/contact/page.tsx", "utf8");

const contactMap = fs.readFileSync(
  "src/components/contact/contact-map.tsx",
  "utf8",
);

const contactActions = fs.readFileSync(
  "src/components/contact/contact-actions.tsx",
  "utf8",
);

const schema = fs.readFileSync(
  "src/components/contact/local-business-schema.tsx",
  "utf8",
);

const businessHours = fs.readFileSync(
  "src/components/contact/business-hours.tsx",
  "utf8",
);

const siteContent = fs.readFileSync("src/content/site-content.ts", "utf8");

const floatingActions = fs.readFileSync(
  "src/components/layout/floating-contact-actions.tsx",
  "utf8",
);

const checks = [
  ["canonical address", contactConfig, "816 German Church Road"],
  ["canonical phone", contactConfig, "0410 466 916"],
  ["Brisbane timezone", contactConfig, "Australia/Brisbane"],
  ["Google Maps embed", contactConfig, "output=embed"],
  ["directions URL", contactConfig, "/maps/dir/?api=1"],
  ["contact map iframe", contactMap, "<iframe"],
  ["lazy map loading", contactMap, 'loading="lazy"'],
  ["map fallback link", contactMap, "Open in Google Maps"],
  ["click-to-call", contactActions, "contactConfig.phone.href"],
  ["copy address", contactActions, "<CopyAddress"],
  ["business hours", businessHours, "contactConfig.hours"],
  ["AutoBodyShop schema", schema, '"@type": "AutoBodyShop"'],
  ["structured address", schema, "PostalAddress"],
  ["contact page schema mount", contactPage, "<LocalBusinessSchema"],
  ["contact page map mount", contactPage, "<ContactMap"],
  ["canonical site content", siteContent, "contactConfig.address.formatted"],
  ["canonical floating phone", floatingActions, "contactConfig.phone.href"],
];

for (const [label, source, value] of checks) {
  if (!source.includes(value)) {
    failures.push(`Missing contact requirement: ${label}`);
  }
}

if (failures.length > 0) {
  console.error("Contact page validation failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `Contact page validation passed: ${requiredFiles.length} files and ${checks.length} implementation checks.`,
);
