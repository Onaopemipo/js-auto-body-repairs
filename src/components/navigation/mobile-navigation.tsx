"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

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
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls={navigationId}
        onClick={() => {
          setOpen((current) => !current);
        }}
        className={[
          "relative z-[60] grid size-11",
          "place-items-center rounded-full",
          "border border-[var(--border-strong)]",
          "bg-black/30 text-white",
          "transition hover:border-white/40",
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
          "fixed inset-0 z-50",
          "bg-[rgba(9,9,10,0.98)]",
          "backdrop-blur-xl",
          "transition duration-300",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="site-container flex min-h-svh flex-col pb-8 pt-[calc(var(--header-height)+2rem)]">
          <nav
            aria-label="Mobile navigation"
            className="flex flex-1 flex-col justify-center"
          >
            {siteConfig.navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={closeMenu}
                aria-current={pathname === item.href ? "page" : undefined}
                className={[
                  "flex items-center",
                  "justify-between border-b",
                  "border-[var(--border-subtle)]",
                  "py-5",
                ].join(" ")}
              >
                <span className="text-4xl font-semibold">{item.label}</span>

                <span className="text-xs tracking-[0.16em] text-[var(--brand-primary-hover)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </nav>

          <ButtonLink
            href="/request-estimate"
            size="large"
            tabIndex={open ? 0 : -1}
            onClick={closeMenu}
          >
            Request an estimate
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
