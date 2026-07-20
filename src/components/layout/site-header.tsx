import Link from "next/link";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { BrandPlaceholder } from "@/components/ui/brand-placeholder";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[rgba(9,9,10,0.88)] backdrop-blur-xl">
      <Container className="flex min-h-[var(--header-height)] items-center justify-between gap-6">
        <BrandPlaceholder />
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ButtonLink
            href="/request-estimate"
            className="hidden lg:inline-flex"
          >
            Request an estimate
          </ButtonLink>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
