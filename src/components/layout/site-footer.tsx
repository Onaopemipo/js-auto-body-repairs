import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

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

          <div className="mt-6 space-y-4 text-sm text-[var(--text-secondary)]">
            {siteConfig.phone ? (
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="block transition hover:text-white"
              >
                {siteConfig.phone}
              </a>
            ) : (
              <p>Phone details pending</p>
            )}

            <a
              href={`mailto:${siteConfig.email}`}
              className="block break-all transition hover:text-white"
            >
              {siteConfig.email}
            </a>

            {siteConfig.address ? (
              <p>{siteConfig.address}</p>
            ) : (
              <p>Workshop location pending</p>
            )}
          </div>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>

            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
