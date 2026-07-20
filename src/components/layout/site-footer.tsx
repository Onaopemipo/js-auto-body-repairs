import Link from "next/link";
import { BrandPlaceholder } from "@/components/ui/brand-placeholder";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--page-background-elevated)]">
      <Container className="grid gap-12 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:py-20">
        <div>
          <BrandPlaceholder />
          <p className="body-copy mt-6 max-w-md text-sm">
            Professional auto body repairs built around accurate assessment,
            disciplined workmanship and a refined final result.
          </p>
          <ButtonLink href="/request-estimate" className="mt-7">
            Request an estimate
          </ButtonLink>
        </div>
        <div>
          <p className="eyebrow">Navigation</p>
          <nav
            aria-label="Footer navigation"
            className="mt-5 flex flex-col gap-3"
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
          <div className="mt-5 space-y-3 text-sm text-[var(--text-secondary)]">
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
      <div className="border-t border-[var(--border-subtle)]">
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
