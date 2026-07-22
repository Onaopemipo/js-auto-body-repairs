import Link from "next/link";

import { ManageAnalyticsPreferences } from "@/components/analytics/manage-analytics-preferences";
import { BrandLogo } from "@/components/brand/brand-logo";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";

const legalLinks = [
  {
    label: "Privacy",
    href: "/privacy",
  },
  {
    label: "Terms",
    href: "/terms",
  },
  {
    label: "Cookies",
    href: "/cookies",
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#070708] pb-20 lg:pb-0">
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0",
          "bg-[radial-gradient(circle_at_12%_18%,rgba(231,7,11,0.12),transparent_30%)]",
        ].join(" ")}
      />

      <Container className="relative grid gap-14 py-16 lg:grid-cols-[1.3fr_0.7fr_0.8fr] lg:py-20">
        <div>
          <div className="w-full max-w-[470px]">
            <BrandLogo variant="footer" linked={false} />
          </div>

          <p className="body-copy mt-6 max-w-xl text-sm">
            Professional collision repair, panel restoration and refinishing
            focused on accurate assessment, disciplined workmanship and a
            confident return to the road.
          </p>

          <ButtonLink href="/request-estimate" className="mt-7">
            Request estimate
          </ButtonLink>
        </div>

        <div>
          <p className="eyebrow">Navigation</p>

          <nav
            aria-label="Footer navigation"
            className="mt-6 flex flex-col gap-4"
          >
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--text-secondary)] transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="eyebrow">Contact</p>

          <address className="mt-6 space-y-4 text-sm not-italic text-[var(--text-secondary)]">
            <a
              href={contactConfig.phone.href}
              data-analytics-event="phone_click"
              data-analytics-label="footer_phone"
              data-analytics-location="site_footer"
              className="block transition hover:text-white"
            >
              {contactConfig.phone.display}
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="block break-all transition hover:text-white"
            >
              {siteConfig.email}
            </a>

            <p>{contactConfig.address.formatted}</p>
          </address>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>

          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <ManageAnalyticsPreferences />
          </nav>
        </Container>
      </div>
    </footer>
  );
}
