import { Mail, MessageSquareText, Phone } from "lucide-react";

import { siteConfig } from "@/config/site";

export function FloatingContactActions() {
  const phoneHref = siteConfig.phone
    ? `tel:${siteConfig.phone.replace(/\s+/g, "")}`
    : null;

  return (
    <>
      <div
        aria-label="Quick contact actions"
        className={[
          "fixed bottom-6 right-6 z-40",
          "hidden flex-col gap-3 lg:flex",
        ].join(" ")}
      >
        {phoneHref ? (
          <a
            href={phoneHref}
            aria-label="Call JS Auto Body Repairs"
            className={[
              "grid size-12",
              "place-items-center rounded-full",
              "border border-white/15",
              "bg-[rgba(8,8,9,0.82)]",
              "text-white/70 shadow-lg",
              "backdrop-blur-xl",
              "transition duration-300",
              "hover:border-[var(--brand-primary)]",
              "hover:text-white",
            ].join(" ")}
          >
            <Phone aria-hidden="true" className="size-4" />
          </a>
        ) : null}

        <a
          href={`mailto:${siteConfig.email}`}
          aria-label="Email JS Auto Body Repairs"
          className={[
            "grid size-12",
            "place-items-center rounded-full",
            "border border-white/15",
            "bg-[rgba(8,8,9,0.82)]",
            "text-white/70 shadow-lg",
            "backdrop-blur-xl",
            "transition duration-300",
            "hover:border-[var(--brand-primary)]",
            "hover:text-white",
          ].join(" ")}
        >
          <Mail aria-hidden="true" className="size-4" />
        </a>
      </div>

      <div
        aria-label="Mobile contact actions"
        className={[
          "fixed inset-x-4 bottom-4 z-40",
          "grid grid-cols-2 gap-2 lg:hidden",
        ].join(" ")}
      >
        {phoneHref ? (
          <a
            href={phoneHref}
            className={[
              "inline-flex min-h-12 items-center",
              "justify-center gap-2 rounded-sm",
              "border border-white/15",
              "bg-[rgba(8,8,9,0.9)]",
              "text-xs font-bold uppercase",
              "tracking-[0.075em]",
              "backdrop-blur-xl",
            ].join(" ")}
          >
            <Phone aria-hidden="true" className="size-4" />
            Call
          </a>
        ) : (
          <a
            href={`mailto:${siteConfig.email}`}
            className={[
              "inline-flex min-h-12 items-center",
              "justify-center gap-2 rounded-sm",
              "border border-white/15",
              "bg-[rgba(8,8,9,0.9)]",
              "text-xs font-bold uppercase",
              "tracking-[0.075em]",
              "backdrop-blur-xl",
            ].join(" ")}
          >
            <Mail aria-hidden="true" className="size-4" />
            Email
          </a>
        )}

        <a
          href="/request-estimate"
          className={[
            "inline-flex min-h-12 items-center",
            "justify-center gap-2 rounded-sm",
            "bg-[var(--brand-primary)]",
            "text-xs font-bold uppercase",
            "tracking-[0.075em] text-white",
            "shadow-[0_12px_34px_rgba(231,7,11,0.25)]",
          ].join(" ")}
        >
          <MessageSquareText aria-hidden="true" className="size-4" />
          Get quote
        </a>
      </div>
    </>
  );
}
