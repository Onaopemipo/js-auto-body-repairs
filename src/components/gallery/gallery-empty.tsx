import { Camera, Images } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";

export function GalleryEmpty() {
  return (
    <div className="relative overflow-hidden border border-white/10 bg-[var(--page-background-elevated)] px-6 py-20 text-center sm:px-10">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:34px_34px]"
      />

      <div className="relative mx-auto max-w-2xl">
        <div className="mx-auto grid size-16 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
          <Images
            aria-hidden="true"
            className="size-7 text-[var(--brand-primary-hover)]"
          />
        </div>

        <p className="eyebrow mt-8">Project gallery</p>

        <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">
          Authentic repair photography is being prepared.
        </h2>

        <p className="body-copy mt-5 leading-7">
          This gallery will feature genuine before-and-after projects completed
          by JS Auto Body Repairs. We will not use generic stock photography as
          evidence of workshop results.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/request-estimate">Request a free quote</ButtonLink>

          <div className="inline-flex items-center gap-2 text-sm text-white/45">
            <Camera aria-hidden="true" className="size-4" />
            Real workshop projects only
          </div>
        </div>
      </div>
    </div>
  );
}
