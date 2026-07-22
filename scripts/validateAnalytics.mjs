import fs from "node:fs";

const requiredFiles = [
  "src/config/analytics.ts",
  "src/types/analytics.ts",
  "src/types/gtag.d.ts",
  "src/lib/analytics/consent.ts",
  "src/lib/analytics/events.ts",
  "src/components/analytics/analytics-provider.tsx",
  "src/components/analytics/analytics-consent-banner.tsx",
  "src/components/analytics/manage-analytics-preferences.tsx",
  "docs/analytics/phase-7e-consent-analytics.md",
];

const failures = requiredFiles.filter((file) => !fs.existsSync(file));

function read(file) {
  return fs.readFileSync(file, "utf8");
}

const layout = read("src/app/layout.tsx");

const provider = read("src/components/analytics/analytics-provider.tsx");

const banner = read("src/components/analytics/analytics-consent-banner.tsx");

const events = read("src/lib/analytics/events.ts");

const consent = read("src/lib/analytics/consent.ts");

const quoteForm = read("src/components/forms/quote-request-form.tsx");

const contactActions = read("src/components/contact/contact-actions.tsx");

const floatingActions = read(
  "src/components/layout/floating-contact-actions.tsx",
);

const header = read("src/components/layout/site-header.tsx");

const footer = read("src/components/layout/site-footer.tsx");

const galleryCard = read("src/components/gallery/gallery-card.tsx");

const privacy = read("src/app/privacy/page.tsx");

const cookies = read("src/app/cookies/page.tsx");

const envExample = read(".env.example");

const webVitals = read("src/lib/performance/report-web-vital.ts");

const checks = [
  ["analytics provider mount", layout, "<AnalyticsProvider"],
  ["consent banner mount", layout, "<AnalyticsConsentBanner"],
  ["conditional GA loading", provider, "shouldLoadAnalytics"],
  ["Google tag script", provider, "googletagmanager.com/gtag/js"],
  [
    "analytics consent denied by default",
    provider,
    'analytics_storage: "denied"',
  ],
  ["advertising consent denied", provider, 'ad_storage: "denied"'],
  ["ad user data denied", provider, 'ad_user_data: "denied"'],
  ["ad personalisation denied", provider, 'ad_personalization: "denied"'],
  ["manual page views", provider, "trackPageView"],
  ["delegated conversion tracking", provider, "[data-analytics-event]"],
  ["local consent storage", consent, "localStorage"],
  ["accept analytics", banner, "Accept analytics"],
  ["reject analytics", banner, "Reject optional"],
  ["manage preferences", banner, "Manage preferences"],
  ["recommended lead event", events, '"generate_lead"'],
  ["quote lead tracking", quoteForm, "trackGenerateLead"],
  ["quote start tracking", quoteForm, '"quote_form_start"'],
  ["quote validation tracking", quoteForm, '"quote_form_validation_error"'],
  [
    "contact phone tracking",
    contactActions,
    'data-analytics-event="phone_click"',
  ],
  [
    "directions tracking",
    contactActions,
    'data-analytics-event="directions_click"',
  ],
  [
    "floating quote tracking",
    floatingActions,
    'data-analytics-event="quote_cta_click"',
  ],
  ["header tracking", header, 'data-analytics-event="quote_cta_click"'],
  ["footer preference control", footer, "<ManageAnalyticsPreferences"],
  [
    "gallery engagement tracking",
    galleryCard,
    'data-analytics-event="gallery_project_open"',
  ],
  ["Web Vitals analytics event", webVitals, '"web_vital"'],
  [
    "measurement ID environment variable",
    envExample,
    "NEXT_PUBLIC_GA_MEASUREMENT_ID=",
  ],
  ["privacy analytics disclosure", privacy, "Google Analytics"],
  ["cookie analytics disclosure", cookies, "Google Analytics"],
];

for (const [label, source, needle] of checks) {
  if (!source.includes(needle)) {
    failures.push(`Missing analytics requirement: ${label}`);
  }
}

if (/G-[A-Z0-9]{6,}/.test(envExample.replace("G-XXXXXXXXXX", ""))) {
  failures.push(
    "A real Google Analytics Measurement ID appears to be committed in .env.example.",
  );
}

if (failures.length) {
  console.error("Analytics validation failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `Analytics validation passed: ${requiredFiles.length} files and ${checks.length} implementation checks.`,
);
