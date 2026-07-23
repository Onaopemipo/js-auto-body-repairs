const preview = process.env.NEXT_PUBLIC_SITE_INDEXABLE !== "true";

const requiredForApplication = ["NODE_ENV", "NEXT_PUBLIC_SITE_URL"];

const requiredForQuoteDelivery = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "SMTP_FROM_EMAIL",
  "QUOTE_TO_EMAIL",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SECRET_KEY",
];

const failures = [];
const warnings = [];

for (const name of requiredForApplication) {
  if (!process.env[name]?.trim()) {
    failures.push(`Missing required variable: ${name}`);
  }
}

for (const name of requiredForQuoteDelivery) {
  if (!process.env[name]?.trim()) {
    warnings.push(`Quote delivery is not production-ready: ${name} is missing`);
  }
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

if (
  preview &&
  siteUrl &&
  siteUrl !== "https://delightful-fuchsia-horse.jsautobodyrepairs.com.au"
) {
  warnings.push(
    "Preview mode is enabled, but NEXT_PUBLIC_SITE_URL does not use the preview hostname.",
  );
}

if (!preview && siteUrl !== "https://jsautobodyrepairs.com.au") {
  failures.push(
    "Indexable production deployments must use https://jsautobodyrepairs.com.au.",
  );
}

const smtpPort = process.env.SMTP_PORT;

if (smtpPort && !Number.isInteger(Number(smtpPort))) {
  failures.push("SMTP_PORT must be an integer.");
}

for (const warning of warnings) {
  console.warn(`WARNING: ${warning}`);
}

if (failures.length) {
  console.error("\nEnvironment verification failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exitCode = 1;
} else {
  console.log("Environment verification passed.");
}
