import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { sendQuoteEmail } from "@/lib/quote/email";
import { validateQuoteFiles } from "@/lib/quote/file-validation";
import { quoteRequestSchema } from "@/lib/quote/quote-schema";

export const runtime = "nodejs";

const minimumCompletionTimeMs = 3000;
const rateLimitWindowMs = 15 * 60 * 1000;
const maximumRequestsPerWindow = 5;

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");

  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + rateLimitWindowMs,
    });

    return {
      allowed: true,
      retryAfter: 0,
    };
  }

  if (current.count >= maximumRequestsPerWindow) {
    return {
      allowed: false,
      retryAfter: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;
  rateLimitStore.set(key, current);

  return {
    allowed: true,
    retryAfter: 0,
  };
}

function hasValidOrigin(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

async function verifyTurnstile({
  token,
  remoteIp,
}: {
  token: string;
  remoteIp: string;
}) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }

  if (!token) {
    return false;
  }

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: remoteIp,
  });

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as {
    success: boolean;
  };

  return result.success;
}

function createErrorResponse(
  message: string,
  status: number,
  fieldErrors?: Record<string, string[]>,
) {
  return NextResponse.json(
    {
      ok: false,
      message,
      fieldErrors,
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function POST(request: Request) {
  if (!hasValidOrigin(request)) {
    return createErrorResponse("Invalid request origin.", 403);
  }

  const contentType = request.headers.get("content-type") || "";

  if (!contentType.startsWith("multipart/form-data")) {
    return createErrorResponse("Invalid form submission.", 415);
  }

  const clientIp = getClientIp(request);

  const rateLimit = checkRateLimit(clientIp);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too many requests. Please wait before trying again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfter),
          "Cache-Control": "no-store",
        },
      },
    );
  }

  try {
    const formData = await request.formData();

    const validation = quoteRequestSchema.safeParse({
      fullName: formData.get("fullName"),

      email: formData.get("email"),

      phone: formData.get("phone"),

      preferredContact: formData.get("preferredContact"),

      vehicleMake: formData.get("vehicleMake"),

      vehicleModel: formData.get("vehicleModel"),

      vehicleYear: formData.get("vehicleYear"),

      registration: formData.get("registration") || "",

      service: formData.get("service"),

      description: formData.get("description"),

      consent: formData.get("consent"),

      website: formData.get("website") || "",

      startedAt: formData.get("startedAt"),

      turnstileToken: formData.get("cf-turnstile-response") || "",
    });

    if (!validation.success) {
      return createErrorResponse(
        "Check the form fields and try again.",
        400,
        validation.error.flatten().fieldErrors as Record<string, string[]>,
      );
    }

    const quote = validation.data;

    if (quote.website) {
      return createErrorResponse("Unable to process this request.", 400);
    }

    if (Date.now() - quote.startedAt < minimumCompletionTimeMs) {
      return createErrorResponse(
        "The form was submitted too quickly. Please try again.",
        400,
      );
    }

    const turnstilePassed = await verifyTurnstile({
      token: quote.turnstileToken,
      remoteIp: clientIp,
    });

    if (!turnstilePassed) {
      return createErrorResponse(
        "Security verification failed. Refresh the page and try again.",
        400,
      );
    }

    const uploadedFiles = formData
      .getAll("photos")
      .filter((value): value is File => value instanceof File);

    const files = await validateQuoteFiles(uploadedFiles);

    const requestId = randomUUID();

    await sendQuoteEmail({
      quote,
      files,
      requestId,
    });

    return NextResponse.json(
      {
        ok: true,
        requestId,
        message:
          "Your quote request has been sent. The workshop will contact you about the next step.",
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    console.error("Quote submission failed:", message);

    const isUploadError =
      message.includes("photo") || message.includes("image format");

    return createErrorResponse(
      isUploadError
        ? message
        : "We could not send your request. Please call 0410 466 916 or try again later.",
      isUploadError ? 400 : 500,
    );
  }
}
