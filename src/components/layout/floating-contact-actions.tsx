"use client";

import { FileText, Phone } from "lucide-react";
import Link from "next/link";

import { contactConfig } from "@/config/contact";

export function FloatingContactActions() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 grid grid-cols-2 gap-2 xl:hidden">
      <a
        href={contactConfig.phone.href}
        className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/15 bg-black/90 px-4 text-xs font-bold uppercase tracking-[0.075em] text-white shadow-[0_16px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl"
      >
        <Phone
          aria-hidden="true"
          className="size-4 text-[var(--brand-primary-hover)]"
        />
        Call now
      </a>

      <Link
        href="/request-estimate"
        className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--brand-primary)] px-4 text-xs font-bold uppercase tracking-[0.075em] text-white shadow-[0_16px_45px_rgba(231,7,11,0.22)]"
      >
        <FileText aria-hidden="true" className="size-4" />
        Free quote
      </Link>
    </div>
  );
}
