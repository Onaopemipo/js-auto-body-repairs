"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";

import { contactConfig } from "@/config/contact";

export function CopyAddress() {
  const timerReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(contactConfig.address.formatted);
    } catch {
      const textarea = document.createElement("textarea");

      textarea.value = contactConfig.address.formatted;

      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    setCopied(true);

    if (timerReference.current) {
      clearTimeout(timerReference.current);
    }

    timerReference.current = setTimeout(() => {
      setCopied(false);
    }, 2_500);
  }

  return (
    <button
      type="button"
      onClick={copyAddress}
      className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/20 bg-white/[0.03] px-5 text-xs font-bold uppercase tracking-[0.075em] text-white transition hover:border-white/45 hover:bg-white/[0.06]"
    >
      {copied ? (
        <Check aria-hidden="true" className="size-4 text-emerald-300" />
      ) : (
        <Copy aria-hidden="true" className="size-4" />
      )}

      {copied ? "Address copied" : "Copy address"}
    </button>
  );
}
