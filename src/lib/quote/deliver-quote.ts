import {
  getMissingSmtpVariables,
  isProductionEnvironment,
  isSmtpConfigured,
} from "@/lib/quote/delivery-config";
import { sendQuoteEmail } from "@/lib/quote/email";
import type { ValidatedQuoteFile } from "@/lib/quote/file-validation";
import { storeQuoteLocally } from "@/lib/quote/local-quote-store";
import type { QuoteRequest } from "@/lib/quote/quote-schema";

export type QuoteDeliveryMode = "smtp" | "local-development";

interface DeliverQuoteOptions {
  quote: QuoteRequest;
  files: ValidatedQuoteFile[];
  requestId: string;
  receivedAt: string;
}

export async function deliverQuote({
  quote,
  files,
  requestId,
  receivedAt,
}: DeliverQuoteOptions): Promise<{
  mode: QuoteDeliveryMode;
}> {
  if (isSmtpConfigured()) {
    await sendQuoteEmail({
      quote,
      files,
      requestId,
    });

    return {
      mode: "smtp",
    };
  }

  if (isProductionEnvironment()) {
    const missingVariables = getMissingSmtpVariables();

    console.error(
      "Production quote delivery is not configured:",
      missingVariables.join(", "),
    );

    throw new Error("Quote email delivery is not configured.");
  }

  await storeQuoteLocally({
    quote,
    files,
    requestId,
    receivedAt,
  });

  return {
    mode: "local-development",
  };
}
