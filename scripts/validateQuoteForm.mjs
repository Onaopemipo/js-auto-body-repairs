import fs from "node:fs";

const requiredFiles = [
  "src/app/api/quote/route.ts",
  "src/app/request-estimate/page.tsx",
  "src/components/forms/quote-request-form.tsx",
  "src/lib/quote/quote-schema.ts",
  "src/lib/quote/file-validation.ts",
  "src/lib/quote/email.ts",
  "src/lib/quote/delivery-config.ts",
  "src/lib/quote/deliver-quote.ts",
  "src/lib/quote/local-quote-store.ts",
];

const failures = requiredFiles.filter((file) => !fs.existsSync(file));

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

for (const dependency of ["nodemailer", "zod"]) {
  if (!packageJson.dependencies?.[dependency]) {
    failures.push(`Missing dependency: ${dependency}`);
  }
}

const route = fs.readFileSync("src/app/api/quote/route.ts", "utf8");

const form = fs.readFileSync(
  "src/components/forms/quote-request-form.tsx",
  "utf8",
);

const delivery = fs.readFileSync("src/lib/quote/deliver-quote.ts", "utf8");

const localStore = fs.readFileSync(
  "src/lib/quote/local-quote-store.ts",
  "utf8",
);

for (const [label, source, value] of [
  ["Node runtime", route, 'runtime = "nodejs"'],
  ["multipart parsing", route, "request.formData()"],
  ["Turnstile validation", route, "siteverify"],
  ["rate limiting", route, "checkRateLimit"],
  ["delivery adapter", route, "deliverQuote"],
  ["photo input", form, 'name="photos"'],
  ["honeypot", form, 'name="website"'],
  ["consent", form, 'name="consent"'],
  ["SMTP mode", delivery, 'mode: "smtp"'],
  ["development fallback", delivery, "storeQuoteLocally"],
  [
    "production guard",
    localStore,
    "Local quote storage is disabled in production.",
  ],
  ["local submission record", localStore, "submission.json"],
]) {
  if (!source.includes(value)) {
    failures.push(`Missing requirement: ${label}`);
  }
}

const gitignore = fs.readFileSync(".gitignore", "utf8");

if (!gitignore.includes(".local-data/")) {
  failures.push("Local quote data is not excluded from Git.");
}

if (failures.length > 0) {
  console.error("Quote form validation failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(
  `Quote form validation passed: ${requiredFiles.length} files and local development delivery protection.`,
);
