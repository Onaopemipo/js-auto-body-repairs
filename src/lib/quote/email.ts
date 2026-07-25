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

  const telephoneHref = quote.phone.replace(/[^+\d]/g, "");

  const attachmentSummary =
    files.length === 0
      ? "No vehicle photos were attached."
      : files.length === 1
        ? "1 vehicle photo is attached to this email."
        : `${files.length} vehicle photos are attached to this email.`;

  const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="color-scheme" content="light">
        <title>New website quote request</title>
      </head>

      <body
        style="
          margin:0;
          padding:0;
          background:#f2f3f5;
          color:#171719;
          font-family:Arial,Helvetica,sans-serif;
        "
      >
        <div
          style="
            display:none;
            max-height:0;
            overflow:hidden;
            opacity:0;
          "
        >
          New quote request from ${escapeHtml(quote.fullName)} for a
          ${escapeHtml(quote.vehicleYear)}
          ${escapeHtml(quote.vehicleMake)}
          ${escapeHtml(quote.vehicleModel)}.
        </div>

        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="width:100%;background:#f2f3f5;"
        >
          <tr>
            <td align="center" style="padding:30px 12px;">
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  width:100%;
                  max-width:680px;
                  background:#ffffff;
                  border:1px solid #dedfe3;
                  border-collapse:separate;
                "
              >
                <tr>
                  <td
                    style="
                      height:6px;
                      background:#d60b11;
                      font-size:0;
                      line-height:0;
                    "
                  >
                    &nbsp;
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding:30px 34px;
                      background:#0d0d0f;
                      color:#ffffff;
                    "
                  >
                    <p
                      style="
                        margin:0 0 8px;
                        color:#ef4444;
                        font-size:12px;
                        font-weight:700;
                        letter-spacing:1.4px;
                        text-transform:uppercase;
                      "
                    >
                      Website enquiry
                    </p>

                    <h1
                      style="
                        margin:0;
                        font-size:27px;
                        line-height:1.25;
                      "
                    >
                      New quote request
                    </h1>

                    <p
                      style="
                        margin:12px 0 0;
                        color:#c8c8cc;
                        font-size:14px;
                        line-height:1.6;
                      "
                    >
                      A customer submitted a vehicle repair enquiry through
                      the JS Auto Body Repairs website.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:26px 34px 0;">
                    <table
                      role="presentation"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      style="
                        width:100%;
                        border:1px solid #e3e4e7;
                        background:#f8f8f9;
                      "
                    >
                      <tr>
                        <td style="padding:16px 18px;">
                          <p
                            style="
                              margin:0 0 5px;
                              color:#77777d;
                              font-size:11px;
                              font-weight:700;
                              letter-spacing:1px;
                              text-transform:uppercase;
                            "
                          >
                            Request reference
                          </p>

                          <p
                            style="
                              margin:0;
                              color:#171719;
                              font-family:Courier New,monospace;
                              font-size:14px;
                              font-weight:700;
                              word-break:break-all;
                            "
                          >
                            ${escapeHtml(requestId)}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:28px 34px 0;">
                    <h2
                      style="
                        margin:0 0 14px;
                        color:#171719;
                        font-size:18px;
                      "
                    >
                      Customer details
                    </h2>

                    <table
                      role="presentation"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      style="width:100%;border-collapse:collapse;"
                    >
                      <tr>
                        <td style="width:34%;padding:11px 12px;border-top:1px solid #ececef;color:#727278;font-size:13px;">
                          Name
                        </td>
                        <td style="padding:11px 12px;border-top:1px solid #ececef;color:#171719;font-size:14px;font-weight:600;">
                          ${escapeHtml(quote.fullName)}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:11px 12px;border-top:1px solid #ececef;color:#727278;font-size:13px;">
                          Email
                        </td>
                        <td style="padding:11px 12px;border-top:1px solid #ececef;font-size:14px;">
                          <a
                            href="mailto:${escapeHtml(quote.email)}"
                            style="color:#c3070d;text-decoration:none;font-weight:600;"
                          >
                            ${escapeHtml(quote.email)}
                          </a>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:11px 12px;border-top:1px solid #ececef;color:#727278;font-size:13px;">
                          Phone
                        </td>
                        <td style="padding:11px 12px;border-top:1px solid #ececef;font-size:14px;">
                          <a
                            href="tel:${escapeHtml(telephoneHref)}"
                            style="color:#c3070d;text-decoration:none;font-weight:600;"
                          >
                            ${escapeHtml(quote.phone)}
                          </a>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:11px 12px;border-top:1px solid #ececef;border-bottom:1px solid #ececef;color:#727278;font-size:13px;">
                          Preferred contact
                        </td>
                        <td style="padding:11px 12px;border-top:1px solid #ececef;border-bottom:1px solid #ececef;color:#171719;font-size:14px;font-weight:600;text-transform:capitalize;">
                          ${escapeHtml(quote.preferredContact)}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:30px 34px 0;">
                    <h2
                      style="
                        margin:0 0 14px;
                        color:#171719;
                        font-size:18px;
                      "
                    >
                      Vehicle and service
                    </h2>

                    <table
                      role="presentation"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      style="width:100%;border-collapse:collapse;"
                    >
                      <tr>
                        <td style="width:34%;padding:11px 12px;border-top:1px solid #ececef;color:#727278;font-size:13px;">
                          Vehicle
                        </td>
                        <td style="padding:11px 12px;border-top:1px solid #ececef;color:#171719;font-size:14px;font-weight:600;">
                          ${escapeHtml(quote.vehicleYear)}
                          ${escapeHtml(quote.vehicleMake)}
                          ${escapeHtml(quote.vehicleModel)}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:11px 12px;border-top:1px solid #ececef;color:#727278;font-size:13px;">
                          Registration
                        </td>
                        <td style="padding:11px 12px;border-top:1px solid #ececef;color:#171719;font-size:14px;font-weight:600;">
                          ${escapeHtml(quote.registration || "Not supplied")}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:11px 12px;border-top:1px solid #ececef;border-bottom:1px solid #ececef;color:#727278;font-size:13px;">
                          Service
                        </td>
                        <td style="padding:11px 12px;border-top:1px solid #ececef;border-bottom:1px solid #ececef;color:#171719;font-size:14px;font-weight:600;">
                          ${escapeHtml(serviceLabels[quote.service])}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:30px 34px 0;">
                    <h2
                      style="
                        margin:0 0 14px;
                        color:#171719;
                        font-size:18px;
                      "
                    >
                      Damage or work required
                    </h2>

                    <div
                      style="
                        padding:18px;
                        border-left:4px solid #d60b11;
                        background:#f8f8f9;
                        color:#2f2f33;
                        font-size:14px;
                        line-height:1.75;
                        white-space:pre-wrap;
                        overflow-wrap:anywhere;
                      "
                    >${escapeHtml(quote.description)}</div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:26px 34px 0;">
                    <table
                      role="presentation"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      style="
                        width:100%;
                        background:#fff5f5;
                        border:1px solid #f4cccc;
                      "
                    >
                      <tr>
                        <td style="padding:15px 18px;">
                          <p
                            style="
                              margin:0;
                              color:#771012;
                              font-size:14px;
                              line-height:1.5;
                            "
                          >
                            <strong>Vehicle photos:</strong>
                            ${escapeHtml(attachmentSummary)}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:30px 34px;">
                    <table
                      role="presentation"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                    >
                      <tr>
                        <td
                          style="
                            background:#d60b11;
                            border-radius:3px;
                          "
                        >
                          <a
                            href="mailto:${escapeHtml(quote.email)}?subject=${encodeURIComponent(`Re: ${subject}`)}"
                            style="
                              display:inline-block;
                              padding:13px 20px;
                              color:#ffffff;
                              font-size:13px;
                              font-weight:700;
                              text-decoration:none;
                            "
                          >
                            Reply to customer
                          </a>
                        </td>

                        <td style="width:10px;">&nbsp;</td>

                        <td
                          style="
                            border:1px solid #c8c8cc;
                            border-radius:3px;
                          "
                        >
                          <a
                            href="tel:${escapeHtml(telephoneHref)}"
                            style="
                              display:inline-block;
                              padding:12px 20px;
                              color:#171719;
                              font-size:13px;
                              font-weight:700;
                              text-decoration:none;
                            "
                          >
                            Call customer
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding:20px 34px;
                      border-top:1px solid #e5e5e8;
                      background:#f8f8f9;
                    "
                  >
                    <p
                      style="
                        margin:0;
                        color:#77777d;
                        font-size:12px;
                        line-height:1.6;
                      "
                    >
                      This message was generated automatically by the
                      JS Auto Body Repairs website. Replying to the email
                      will send your response directly to
                      ${escapeHtml(quote.fullName)}.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
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
