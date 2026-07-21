import nodemailer from "nodemailer";

import type { ValidatedQuoteFile } from "@/lib/quote/file-validation";
import type { QuoteRequest } from "@/lib/quote/quote-schema";

const serviceLabels = {
  "collision-repairs": "Collision Repairs",
  "paint-refinishing": "Paint Refinishing",
  "dent-removal": "Dent Removal",
  "performance-upgrades": "Performance Upgrades",
  "routine-maintenance": "Routine Maintenance",
  "complex-repairs": "Complex Repairs",
  "car-ac-regas": "Car AC Regas",
  "not-sure": "Not Sure",
} as const;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getRequiredEnvironmentVariable(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export async function sendQuoteEmail({
  quote,
  files,
  requestId,
}: {
  quote: QuoteRequest;
  files: ValidatedQuoteFile[];
  requestId: string;
}) {
  const smtpHost = getRequiredEnvironmentVariable("SMTP_HOST");

  const smtpPort = Number(getRequiredEnvironmentVariable("SMTP_PORT"));

  const smtpUser = getRequiredEnvironmentVariable("SMTP_USER");

  const smtpPassword = getRequiredEnvironmentVariable("SMTP_PASSWORD");

  const fromEmail = getRequiredEnvironmentVariable("SMTP_FROM_EMAIL");

  const destinationEmail = getRequiredEnvironmentVariable("QUOTE_TO_EMAIL");

  if (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535) {
    throw new Error("SMTP_PORT is invalid.");
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  const vehicle =
    `${quote.vehicleYear} ` + `${quote.vehicleMake} ` + `${quote.vehicleModel}`;

  const subject = `Website quote request — ${vehicle}`;

  const text = [
    `Request reference: ${requestId}`,
    "",
    "CUSTOMER",
    `Name: ${quote.fullName}`,
    `Email: ${quote.email}`,
    `Phone: ${quote.phone}`,
    `Preferred contact: ${quote.preferredContact}`,
    "",
    "VEHICLE",
    `Vehicle: ${vehicle}`,
    `Registration: ${quote.registration || "Not supplied"}`,
    `Service: ${serviceLabels[quote.service]}`,
    "",
    "DESCRIPTION",
    quote.description,
    "",
    `Photos attached: ${files.length}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#171719">
      <h1 style="margin:0 0 20px;font-size:23px">
        New website quote request
      </h1>

      <p>
        <strong>Request reference:</strong>
        ${escapeHtml(requestId)}
      </p>

      <h2 style="margin:26px 0 8px;font-size:17px">
        Customer
      </h2>

      <p>
        <strong>Name:</strong>
        ${escapeHtml(quote.fullName)}<br>

        <strong>Email:</strong>
        ${escapeHtml(quote.email)}<br>

        <strong>Phone:</strong>
        ${escapeHtml(quote.phone)}<br>

        <strong>Preferred contact:</strong>
        ${escapeHtml(quote.preferredContact)}
      </p>

      <h2 style="margin:26px 0 8px;font-size:17px">
        Vehicle
      </h2>

      <p>
        <strong>Vehicle:</strong>
        ${escapeHtml(vehicle)}<br>

        <strong>Registration:</strong>
        ${escapeHtml(quote.registration || "Not supplied")}<br>

        <strong>Service:</strong>
        ${escapeHtml(serviceLabels[quote.service])}
      </p>

      <h2 style="margin:26px 0 8px;font-size:17px">
        Work required
      </h2>

      <p style="white-space:pre-wrap">
        ${escapeHtml(quote.description)}
      </p>

      <p>
        <strong>Photos attached:</strong>
        ${files.length}
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: {
      name: "JS Auto Body Repairs Website",
      address: fromEmail,
    },

    to: destinationEmail,

    replyTo: {
      name: quote.fullName,
      address: quote.email,
    },

    subject,
    text,
    html,

    attachments: files.map((file) => ({
      filename: file.filename,
      content: file.content,
      contentType: file.contentType,
    })),
  });
}
