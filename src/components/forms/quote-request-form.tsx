"use client";

import {
  AlertCircle,
  CheckCircle2,
  ImagePlus,
  LoaderCircle,
  Send,
  X,
} from "lucide-react";
import Script from "next/script";
import { trackAnalyticsEvent, trackGenerateLead } from "@/lib/analytics/events";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

interface SubmissionResponse {
  ok: boolean;
  message: string;
  requestId?: string;
}

interface SelectedPhoto {
  file: File;
  previewUrl: string;
}

const maximumFiles = 5;
const maximumFileBytes = 8 * 1024 * 1024;
const maximumTotalBytes = 20 * 1024 * 1024;

export function QuoteRequestForm() {
  const formStartedReference = useRef(false);

  const formReference = useRef<HTMLFormElement>(null);

  const [startedAt] = useState(() => Date.now());

  const [photos, setPhotos] = useState<SelectedPhoto[]>([]);

  const [submitting, setSubmitting] = useState(false);

  const [result, setResult] = useState<SubmissionResponse | null>(null);

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const inputClassName = [
    "mt-2 min-h-12 w-full",
    "border border-white/15",
    "bg-black/25 px-4",
    "text-base text-white",
    "outline-none transition",
    "placeholder:text-white/30",
    "focus:border-[var(--brand-primary)]",
  ].join(" ");

  function removePhoto(index: number) {
    setPhotos((current) => {
      const removed = current[index];

      if (removed) {
        URL.revokeObjectURL(removed.previewUrl);
      }

      return current.filter((_, currentIndex) => currentIndex !== index);
    });
  }

  function handlePhotoSelection(event: ChangeEvent<HTMLInputElement>) {
    const incomingFiles = Array.from(event.target.files || []);

    event.target.value = "";

    if (photos.length + incomingFiles.length > maximumFiles) {
      setResult({
        ok: false,
        message: "Upload no more than five photos.",
      });
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/heic",
      "image/heif",
    ];

    if (incomingFiles.some((file) => !allowedTypes.includes(file.type))) {
      setResult({
        ok: false,
        message: "Only JPG, PNG, WebP, HEIC and HEIF photos are accepted.",
      });
      return;
    }

    if (incomingFiles.some((file) => file.size > maximumFileBytes)) {
      setResult({
        ok: false,
        message: "Each photo must be 8 MB or smaller.",
      });
      return;
    }

    const totalBytes = [
      ...photos.map(({ file }) => file.size),
      ...incomingFiles.map((file) => file.size),
    ].reduce((total, size) => total + size, 0);

    if (totalBytes > maximumTotalBytes) {
      setResult({
        ok: false,
        message: "The combined photo size must be 20 MB or smaller.",
      });
      return;
    }

    setResult(null);

    setPhotos((current) => [
      ...current,
      ...incomingFiles.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    ]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      trackAnalyticsEvent("quote_form_validation_error", {
        form_name: "vehicle_quote_request",
      });

      return;
    }

    const formData = new FormData(form);

    formData.set("startedAt", String(startedAt));

    formData.delete("photos");

    for (const photo of photos) {
      formData.append("photos", photo.file, photo.file.name);
    }

    setSubmitting(true);
    setResult(null);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const responseBody = (await response.json()) as SubmissionResponse;

      setResult(responseBody);

      if (response.ok && responseBody.ok) {
        trackGenerateLead({
          service: String(formData.get("service") ?? ""),
          preferredContact: String(formData.get("preferredContact") ?? ""),
          hasPhotos: photos.length > 0,
        });

        formReference.current?.reset();

        for (const photo of photos) {
          URL.revokeObjectURL(photo.previewUrl);
        }

        setPhotos([]);
      }
    } catch {
      setResult({
        ok: false,
        message:
          "We could not send your request. Please call 0481 214 187 or try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {turnstileSiteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      ) : null}

      <form
        ref={formReference}
        onSubmit={handleSubmit}
        onFocusCapture={() => {
          if (formStartedReference.current) {
            return;
          }

          formStartedReference.current = true;

          trackAnalyticsEvent("quote_form_start", {
            form_name: "vehicle_quote_request",
          });
        }}
        encType="multipart/form-data"
        className="space-y-10"
      >
        <input type="hidden" name="startedAt" value={startedAt} />

        <div
          className="absolute -left-[10000px] size-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="website">Website</label>

          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <fieldset>
          <legend className="text-2xl font-semibold">Contact details</legend>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-white/80">
              Full name
              <input
                name="fullName"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                className={inputClassName}
              />
            </label>

            <label className="text-sm font-medium text-white/80">
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={160}
                className={inputClassName}
              />
            </label>

            <label className="text-sm font-medium text-white/80">
              Phone
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                className={inputClassName}
              />
            </label>

            <label className="text-sm font-medium text-white/80">
              Preferred contact
              <select
                name="preferredContact"
                defaultValue="phone"
                className={inputClassName}
              >
                <option value="phone">Phone</option>
                <option value="email">Email</option>
              </select>
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-2xl font-semibold">Vehicle details</legend>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-white/80">
              Make
              <input
                name="vehicleMake"
                type="text"
                required
                maxLength={80}
                placeholder="Toyota"
                className={inputClassName}
              />
            </label>

            <label className="text-sm font-medium text-white/80">
              Model
              <input
                name="vehicleModel"
                type="text"
                required
                maxLength={80}
                placeholder="Land Cruiser"
                className={inputClassName}
              />
            </label>

            <label className="text-sm font-medium text-white/80">
              Year
              <input
                name="vehicleYear"
                type="text"
                inputMode="numeric"
                required
                pattern="(19|20)[0-9]{2}"
                minLength={4}
                maxLength={4}
                placeholder="2022"
                className={inputClassName}
              />
            </label>

            <label className="text-sm font-medium text-white/80">
              Registration
              <input
                name="registration"
                type="text"
                maxLength={20}
                placeholder="Optional"
                className={inputClassName}
              />
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-2xl font-semibold">Repair information</legend>

          <div className="mt-6 space-y-5">
            <label className="block text-sm font-medium text-white/80">
              Service required
              <select
                name="service"
                defaultValue=""
                required
                className={inputClassName}
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="collision-repairs">Collision Repairs</option>
                <option value="paint-refinishing">Paint Refinishing</option>
                <option value="dent-removal">Dent Removal</option>
                <option value="performance-upgrades">
                  Performance Upgrades
                </option>
                <option value="routine-maintenance">Routine Maintenance</option>
                <option value="complex-repairs">Complex Repairs</option>
                <option value="car-ac-regas">Car AC Regas</option>
                <option value="not-sure">Not Sure</option>
              </select>
            </label>

            <label className="block text-sm font-medium text-white/80">
              Describe the damage or work required
              <textarea
                name="description"
                required
                minLength={20}
                maxLength={3000}
                rows={7}
                placeholder="Tell us where the damage is, how it happened and whether the vehicle is driveable."
                className={`${inputClassName} py-3`}
              />
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-2xl font-semibold">Vehicle photos</legend>

          <p className="body-copy mt-3 text-sm">
            Upload up to five photos. Include a wide view and close-up images of
            the damage.
          </p>

          <label className="mt-6 flex min-h-36 cursor-pointer flex-col items-center justify-center border border-dashed border-white/20 bg-black/20 px-6 text-center transition hover:border-[var(--brand-primary)]">
            <ImagePlus
              aria-hidden="true"
              className="size-7 text-[var(--brand-primary-hover)]"
            />

            <span className="mt-3 text-sm font-semibold">
              Add vehicle photos
            </span>

            <span className="mt-1 text-xs text-white/45">
              JPG, PNG, WebP, HEIC or HEIF — maximum 8 MB each
            </span>

            <input
              type="file"
              name="photos"
              accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
              multiple
              onChange={handlePhotoSelection}
              className="sr-only"
            />
          </label>

          {photos.length > 0 ? (
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {photos.map((photo, index) => (
                <div
                  key={`${photo.file.name}-${photo.file.lastModified}`}
                  className="relative overflow-hidden border border-white/10 bg-black/25"
                >
                  {/* Local object URLs are used only for previews. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.previewUrl}
                    alt={`Vehicle photo ${index + 1}`}
                    className="aspect-square w-full object-cover"
                  />

                  <button
                    type="button"
                    aria-label={`Remove ${photo.file.name}`}
                    onClick={() => removePhoto(index)}
                    className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-black/80"
                  >
                    <X aria-hidden="true" className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </fieldset>

        <label className="flex items-start gap-3 text-sm text-white/70">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 size-4 accent-[var(--brand-primary)]"
          />

          <span>
            I agree that JS Auto Body Repairs may contact me about this quote
            request.
          </span>
        </label>

        {turnstileSiteKey ? (
          <div
            className="cf-turnstile"
            data-sitekey={turnstileSiteKey}
            data-action="turnstile-spin-v2"
            data-theme="dark"
          />
        ) : (
          <p className="border border-amber-300/25 bg-amber-300/10 p-4 text-sm text-amber-100">
            Turnstile is not configured locally. It must be configured before
            production deployment.
          </p>
        )}

        {result ? (
          <div
            role="status"
            className={[
              "flex items-start gap-3 border p-4",
              result.ok
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
                : "border-red-400/30 bg-red-400/10 text-red-100",
            ].join(" ")}
          >
            {result.ok ? (
              <CheckCircle2
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0"
              />
            ) : (
              <AlertCircle
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0"
              />
            )}

            <div>
              <p className="font-medium">{result.message}</p>

              {result.requestId ? (
                <p className="mt-1 text-xs opacity-70">
                  Reference: {result.requestId}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-14 w-full items-center justify-center bg-[var(--brand-primary)] px-7 text-sm font-bold uppercase tracking-[0.075em] text-white transition hover:bg-[var(--brand-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? (
            <>
              <LoaderCircle
                aria-hidden="true"
                className="mr-2 size-4 animate-spin"
              />
              Sending request
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="mr-2 size-4" />
              Send quote request
            </>
          )}
        </button>
      </form>
    </>
  );
}
