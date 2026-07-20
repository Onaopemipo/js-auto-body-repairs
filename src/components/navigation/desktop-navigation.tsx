"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary navigation"
      className="hidden items-center gap-6 xl:flex"
    >
      {siteConfig.navigation.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative py-3",
              "text-[0.72rem] font-bold uppercase",
              "tracking-[0.13em]",
              "transition-colors duration-300",
              active
                ? "text-white"
                : ["text-[var(--text-secondary)]", "hover:text-white"],
            )}
          >
            {item.label}

            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 bottom-1",
                "h-[2px] origin-left",
                "bg-[var(--brand-primary)]",
                "shadow-[0_0_14px_rgba(231,7,11,0.55)]",
                "transition-transform duration-300",
                active
                  ? "scale-x-100"
                  : ["scale-x-0", "group-hover:scale-x-100"],
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
