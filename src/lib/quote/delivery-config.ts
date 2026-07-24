const smtpVariables = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "SMTP_FROM_EMAIL",
  "QUOTE_TO_EMAIL",
] as const;

export function isProductionEnvironment() {
  return process.env.NODE_ENV === "production";
}

export function isSmtpConfigured() {
  return smtpVariables.every((name) => Boolean(process.env[name]?.trim()));
}

export function isTurnstileConfigured() {
  return Boolean(process.env.TURNSTILE_SECRET?.trim());
}

export function getMissingSmtpVariables() {
  return smtpVariables.filter((name) => !process.env[name]?.trim());
}
