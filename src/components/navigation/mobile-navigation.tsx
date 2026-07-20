"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export function MobileNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label="Open navigation"
        aria-expanded={open}
        onClick={() => {
          setOpen(true);
        }}
        className={[
          "relative z-50 grid size-11",
          "place-items-center rounded-full",
          "border border-white/20",
          "bg-black/35 text-white",
          "backdrop-blur-md",
          "transition duration-300",
          "hover:border-[var(--brand-primary)]",
          "focus-visible:outline-none",
        ].join(" ")}
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>

      <Dialog
        open={open}
        onClose={setOpen}
        transition
        className={[
          "relative z-[100] xl:hidden",
          "duration-300 ease-out",
          "data-closed:opacity-0",
        ].join(" ")}
      >
        <DialogBackdrop
          transition
          className={[
            "fixed inset-0",
            "bg-black/80 backdrop-blur-md",
            "duration-300 ease-out",
            "data-closed:opacity-0",
          ].join(" ")}
        />

        <div className="fixed inset-0 overflow-y-auto overscroll-contain">
          <div className="min-h-full">
            <DialogPanel
              transition
              className={[
                "relative min-h-[100dvh]",
                "overflow-hidden",
                "bg-[rgba(8,8,9,0.985)]",
                "duration-500 ease-out",
                "data-closed:translate-x-full",
                "data-closed:opacity-0",
              ].join(" ")}
            >
              <div
                aria-hidden="true"
                className={[
                  "pointer-events-none absolute inset-0",
                  "bg-[radial-gradient(circle_at_82%_12%,rgba(231,7,11,0.20),transparent_32%)]",
                ].join(" ")}
              />

              <div
                aria-hidden="true"
                className={[
                  "pointer-events-none absolute",
                  "-right-28 top-28",
                  "h-72 w-72 rounded-full",
                  "bg-[var(--brand-primary)]/10",
                  "blur-3xl",
                ].join(" ")}
              />

              <div className="site-container relative flex min-h-[100dvh] flex-col pb-8 pt-5">
                <div className="flex min-h-[var(--header-height)] items-center justify-between gap-5">
                  <div className="w-[190px] sm:w-[230px]">
                    <BrandLogo priority />
                  </div>

                  <button
                    type="button"
                    aria-label="Close navigation"
                    onClick={closeMenu}
                    className={[
                      "grid size-11 shrink-0",
                      "place-items-center rounded-full",
                      "border border-white/20",
                      "bg-black/35 text-white",
                      "backdrop-blur-md",
                      "transition duration-300",
                      "hover:border-[var(--brand-primary)]",
                      "focus-visible:outline-none",
                    ].join(" ")}
                  >
                    <X aria-hidden="true" className="size-5" />
                  </button>
                </div>

                <DialogTitle className="sr-only">Site navigation</DialogTitle>

                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-1 flex-col justify-start pb-8 pt-8"
                >
                  {siteConfig.navigation.map((item, index) => {
                    const active =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        aria-current={active ? "page" : undefined}
                        style={{
                          transitionDelay: open ? `${index * 45}ms` : "0ms",
                        }}
                        className={cn(
                          "group flex items-center",
                          "justify-between border-b",
                          "border-white/10 py-5",
                          "transition-all duration-500",
                          open
                            ? ["translate-y-0", "opacity-100"]
                            : ["translate-y-5", "opacity-0"],
                        )}
                      >
                        <span
                          className={cn(
                            "text-4xl font-semibold",
                            "tracking-[-0.035em]",
                            "sm:text-5xl",
                            active
                              ? "text-white"
                              : ["text-white/72", "group-hover:text-white"],
                          )}
                        >
                          {item.label}
                        </span>

                        <span className="flex items-center gap-3">
                          <span className="text-xs tracking-[0.18em] text-[var(--brand-primary-hover)]">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <ArrowUpRight
                            aria-hidden="true"
                            className={[
                              "size-4 text-white/35",
                              "transition",
                              "group-hover:text-white",
                            ].join(" ")}
                          />
                        </span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="grid gap-3 sm:grid-cols-2">
                  {siteConfig.phone ? (
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                      onClick={closeMenu}
                      className={[
                        "inline-flex min-h-14",
                        "items-center justify-center",
                        "gap-2 rounded-[var(--radius-small)]",
                        "border border-white/20",
                        "bg-white/[0.04]",
                        "text-sm font-bold uppercase",
                        "tracking-[0.075em]",
                        "transition hover:border-white/40",
                      ].join(" ")}
                    >
                      <Phone aria-hidden="true" className="size-4" />
                      Call workshop
                    </a>
                  ) : null}

                  <ButtonLink
                    href="/request-estimate"
                    size="large"
                    onClick={closeMenu}
                  >
                    Request estimate
                  </ButtonLink>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
