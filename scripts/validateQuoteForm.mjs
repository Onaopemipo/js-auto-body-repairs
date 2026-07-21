import fs from "node:fs";

const requiredFiles = [
  "src/app/api/quote/route.ts",
  "src/app/request-estimate/page.tsx",
  "src/components/forms/quote-request-form.tsx",
  "src/lib/quote/quote-schema.ts",
  "src/lib/quote/file-validation.ts",
  "src/lib/quote/email.ts",
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

for (const [label, source, value] of [
  ["Node runtime", route, 'runtime = "nodejs"'],
  ["multipart parsing", route, "request.formData()"],
  ["Turnstile validation", route, "siteverify"],
  ["rate limiting", route, "checkRateLimit"],
  ["SMTP delivery", route, "sendQuoteEmail"],
  ["photo input", form, 'name="photos"'],
  ["honeypot", form, 'name="website"'],
  ["consent", form, 'name="consent"'],
]) {
  if (!source.includes(value)) {
    failures.push(`Missing requirement: ${label}`);
  }
}

if (failures.length > 0) {
  console.error("Quote form validation failed.\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(`Quote form validation passed: ${requiredFiles.length} files.`);
