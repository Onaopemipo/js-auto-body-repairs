"use client";

import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export function MobileNavigation() {
  const pathname = usePathname();
  const navigationId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.menuOpen = String(open);

    return () => {
      delete document.body.dataset.menuOpen;
    };
  }, [open]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls={navigationId}
        onClick={() => {
          setOpen((current) => !current);
        }}
        className={[
          "relative z-[70] grid size-11",
          "place-items-center rounded-full",
          "border border-white/20",
          "bg-black/35 text-white",
          "backdrop-blur-md",
          "transition duration-300",
          "hover:border-[var(--brand-primary)]",
        ].join(" ")}
      >
        {open ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
      </button>

      <div
        id={navigationId}
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[60]",
          "overflow-y-auto",
          "bg-[rgba(8,8,9,0.985)]",
          "transition duration-500",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-0",
            "bg-[radial-gradient(circle_at_82%_12%,rgba(231,7,11,0.18),transparent_32%)]",
          ].join(" ")}
        />

        <div className="site-container relative flex min-h-svh flex-col pb-8 pt-6">
          <div className="flex min-h-[var(--header-height)] items-center">
            <div className="w-[190px] sm:w-[230px]">
              <BrandLogo priority />
            </div>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="flex flex-1 flex-col justify-center py-8"
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
                  tabIndex={open ? 0 : -1}
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
                      className="size-4 text-white/35 transition group-hover:text-white"
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
                tabIndex={open ? 0 : -1}
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
              tabIndex={open ? 0 : -1}
              onClick={closeMenu}
            >
              Request estimate
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
