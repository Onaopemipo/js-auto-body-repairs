"use client";

import { ArrowUpRight, Phone } from "lucide-react";
import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { DesktopNavigation } from "@/components/navigation/desktop-navigation";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [scrollState, setScrollState] = useState<
    "top" | "scrolled" | "compact"
  >("top");

  useEffect(() => {
    function updateScrollState() {
      const scrollY = window.scrollY;

      if (scrollY > 300) {
        setScrollState("compact");
        return;
      }

      if (scrollY > 80) {
        setScrollState("scrolled");
        return;
      }

      setScrollState("top");
    }

    updateScrollState();

    window.addEventListener("scroll", updateScrollState, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  const scrolled = scrollState !== "top";
  const compact = scrollState === "compact";

  return (
    <header
      data-scroll-state={scrollState}
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "border-b transition-all duration-500",
        scrolled
          ? [
              "border-white/10",
              "bg-[rgba(8,8,9,0.88)]",
              "shadow-[0_16px_45px_rgba(0,0,0,0.32)]",
              "backdrop-blur-xl",
            ]
          : [
              "border-transparent",
              "bg-gradient-to-b",
              "from-black/80",
              "via-black/35",
              "to-transparent",
            ],
      )}
    >
      <Container
        className={cn(
          "flex items-center",
          "justify-between gap-6",
          "transition-[min-height] duration-500",
          compact ? "min-h-[5.25rem]" : "min-h-[var(--header-height)]",
        )}
      >
        <div
          className={cn(
            "origin-left transition-all",
            "duration-500",
            compact
              ? "w-[175px] scale-[0.92] sm:w-[215px] lg:w-[245px]"
              : "w-[190px] sm:w-[235px] lg:w-[270px]",
          )}
        >
          <BrandLogo priority />
        </div>

        <DesktopNavigation />

        <div className="flex items-center gap-3">
          {siteConfig.phone ? (
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              aria-label="Call JS Auto Body Repairs"
              className={[
                "hidden size-11 items-center",
                "justify-center rounded-full",
                "border border-white/15",
                "bg-black/25 text-white/70",
                "backdrop-blur-md",
                "transition duration-300",
                "hover:border-[var(--brand-primary)]",
                "hover:text-white lg:inline-flex xl:hidden",
              ].join(" ")}
            >
              <Phone aria-hidden="true" className="size-4" />
            </a>
          ) : null}

          <ButtonLink
            href="/request-estimate"
            className="group hidden xl:inline-flex"
          >
            Request estimate
            <ArrowUpRight
              aria-hidden="true"
              className="ml-2 size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </ButtonLink>

          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
