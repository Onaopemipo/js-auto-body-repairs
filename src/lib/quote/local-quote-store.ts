import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import type { ValidatedQuoteFile } from "@/lib/quote/file-validation";
import type { QuoteRequest } from "@/lib/quote/quote-schema";

interface StoreQuoteLocallyOptions {
  quote: QuoteRequest;
  files: ValidatedQuoteFile[];
  requestId: string;
  receivedAt: string;
}

function createSafeDirectoryName(requestId: string) {
  return requestId.replace(/[^a-zA-Z0-9-]/g, "");
}

export async function storeQuoteLocally({
  quote,
  files,
  requestId,
  receivedAt,
}: StoreQuoteLocallyOptions) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Local quote storage is disabled in production.");
  }

  const rootDirectory = path.resolve(
    process.cwd(),
    ".local-data",
    "quote-submissions",
  );

  const submissionDirectory = path.join(
    rootDirectory,
    createSafeDirectoryName(requestId),
  );

  const attachmentsDirectory = path.join(submissionDirectory, "attachments");

  await mkdir(attachmentsDirectory, {
    recursive: true,
  });

  const record = {
    requestId,
    receivedAt,
    deliveryMode: "local-development",
    customer: {
      fullName: quote.fullName,
      email: quote.email,
      phone: quote.phone,
      preferredContact: quote.preferredContact,
    },
    vehicle: {
      make: quote.vehicleMake,
      model: quote.vehicleModel,
      year: quote.vehicleYear,
      registration: quote.registration || null,
    },
    service: quote.service,
    description: quote.description,
    attachments: files.map((file) => ({
      filename: file.filename,
      contentType: file.contentType,
      bytes: file.content.length,
    })),
  };

  await writeFile(
    path.join(submissionDirectory, "submission.json"),
    `${JSON.stringify(record, null, 2)}\n`,
    "utf8",
  );

  await Promise.all(
    files.map((file) =>
      writeFile(path.join(attachmentsDirectory, file.filename), file.content),
    ),
  );

  console.info(`Development quote stored at ${submissionDirectory}`);

  return submissionDirectory;
}
