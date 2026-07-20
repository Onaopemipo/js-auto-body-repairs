#!/usr/bin/env zsh

set -Eeuo pipefail

PROJECT_ROOT="${PROJECT_ROOT:-$HOME/Workspace/js-auto-body-repairs}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_ROOT="$PROJECT_ROOT/.implementation-backups"
BACKUP_DIR="$BACKUP_ROOT/phase-1-foundation-$TIMESTAMP"

trap 'exit_code=$?; echo; echo "PHASE 1 FAILED"; echo "Exit code: $exit_code"; echo "Line: $LINENO"; exit $exit_code' ERR

if [[ ! -d "$PROJECT_ROOT" ]]; then
  echo "ERROR: Project directory not found: $PROJECT_ROOT"
  exit 1
fi

cd "$PROJECT_ROOT"

if [[ ! -f package.json ]]; then
  echo "ERROR: package.json not found."
  exit 1
fi

NODE_MAJOR="$(node -p "Number(process.versions.node.split('.')[0])")"
if (( NODE_MAJOR < 20 )); then
  echo "ERROR: Node.js 20 or newer is required."
  exit 1
fi

npm run lint
npm run build

mkdir -p "$BACKUP_DIR"
rsync -a --exclude=node_modules --exclude=.next --exclude=.git --exclude=.implementation-backups "$PROJECT_ROOT/" "$BACKUP_DIR/"

npm install clsx tailwind-merge lucide-react motion
npm install --save-dev prettier

mkdir -p src/components/layout src/components/navigation src/components/ui src/config src/lib scripts docs/architecture

cat > src/lib/cn.ts <<'EOF'
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOF

cat > src/config/site.ts <<'EOF'
export const siteConfig = {
  name: "JS Auto Body Repairs",
  shortName: "JS Auto Body",
  description:
    "Professional collision repair, panel restoration, paint refinishing and vehicle body repair services.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://jsautobodyrepairs.com.au",
  locale: "en_AU",
  language: "en-AU",
  email:
    process.env.NEXT_PUBLIC_BUSINESS_EMAIL ??
    "info@jsautobodyrepairs.com.au",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "",
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ?? "",
  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Our Work", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Reviews", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
EOF

cat > .env.example <<'EOF'
NEXT_PUBLIC_SITE_URL=https://jsautobodyrepairs.com.au
NEXT_PUBLIC_BUSINESS_EMAIL=info@jsautobodyrepairs.com.au
NEXT_PUBLIC_BUSINESS_PHONE=
NEXT_PUBLIC_BUSINESS_ADDRESS=
EOF

if [[ ! -f .env.local ]]; then
  cp .env.example .env.local
fi

grep -qxF ".env.local" .gitignore || echo ".env.local" >> .gitignore
grep -qxF ".env.production" .gitignore || echo ".env.production" >> .gitignore
grep -qxF ".implementation-backups/" .gitignore || echo ".implementation-backups/" >> .gitignore

cat > src/app/globals.css <<'EOF'
@import "tailwindcss";

:root {
  --page-background: #09090a;
  --page-background-elevated: #111113;
  --surface: #17171a;
  --text-primary: #f5f5f5;
  --text-secondary: #b3b3b7;
  --text-muted: #77777d;
  --brand-primary: #d60b11;
  --brand-primary-hover: #ef1118;
  --border-subtle: rgba(255, 255, 255, 0.1);
  --border-strong: rgba(255, 255, 255, 0.2);
  --header-height: 6rem;
  --container-max-width: 86rem;
  --radius-small: 0.375rem;
  --radius-large: 1rem;
  --shadow-elevated: 0 24px 70px rgba(0, 0, 0, 0.42);
}

@theme inline {
  --color-background: var(--page-background);
  --color-foreground: var(--text-primary);
  --font-sans: var(--font-sans);
  --font-display: var(--font-display);
}

* { box-sizing: border-box; }
html { min-width: 320px; scroll-behavior: smooth; background: var(--page-background); }
body {
  min-height: 100vh;
  margin: 0;
  overflow-x: hidden;
  background: radial-gradient(circle at 10% 0%, rgba(214, 11, 17, 0.08), transparent 30rem), var(--page-background);
  color: var(--text-primary);
  font-family: var(--font-sans), Arial, Helvetica, sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
body[data-menu-open="true"] { overflow: hidden; }
a { color: inherit; text-decoration: none; }
button, input, textarea, select { font: inherit; }
img, svg, video, canvas { display: block; max-width: 100%; }
::selection { background: var(--brand-primary); color: #fff; }
:focus-visible { outline: 2px solid var(--brand-primary-hover); outline-offset: 4px; }
.site-container { width: min(calc(100% - 2rem), var(--container-max-width)); margin-inline: auto; }
.page-main { min-height: calc(100svh - var(--header-height)); }
.section-spacing { padding-block: clamp(4.5rem, 8vw, 8rem); }
.display-heading { font-family: var(--font-display), Arial, Helvetica, sans-serif; font-weight: 700; letter-spacing: -0.035em; text-wrap: balance; }
.body-copy { color: var(--text-secondary); line-height: 1.8; text-wrap: pretty; }
.eyebrow { color: var(--brand-primary-hover); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; }
.skip-link { position: fixed; top: .75rem; left: .75rem; z-index: 100; transform: translateY(-180%); border-radius: var(--radius-small); background: var(--text-primary); padding: .75rem 1rem; color: var(--page-background); font-weight: 700; }
.skip-link:focus { transform: translateY(0); }
@media (min-width: 768px) { .site-container { width: min(calc(100% - 4rem), var(--container-max-width)); } }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
EOF

cat > src/components/ui/container.tsx <<'EOF'
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("site-container", className)} {...props} />;
}
EOF

cat > src/components/ui/button-link.tsx <<'EOF'
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "text";
  size?: "standard" | "large";
};

export function ButtonLink({ variant = "primary", size = "standard", className, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center font-semibold transition focus-visible:outline-none",
        size === "standard" && "min-h-12 px-5 text-sm",
        size === "large" && "min-h-14 px-7 text-sm",
        variant === "primary" && "rounded-[var(--radius-small)] bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)]",
        variant === "secondary" && "rounded-[var(--radius-small)] border border-[var(--border-strong)] bg-white/[0.03] text-white hover:border-white/40 hover:bg-white/[0.07]",
        variant === "text" && "min-h-0 px-0 text-[var(--brand-primary-hover)] hover:text-white",
        className,
      )}
      {...props}
    />
  );
}
EOF

cat > src/components/ui/brand-placeholder.tsx <<'EOF'
import Link from "next/link";
import { cn } from "@/lib/cn";

interface BrandPlaceholderProps { className?: string; }

export function BrandPlaceholder({ className }: BrandPlaceholderProps) {
  return (
    <Link href="/" aria-label="JS Auto Body Repairs homepage" className={cn("inline-flex items-center gap-3", className)}>
      <span aria-hidden="true" className="grid size-11 place-items-center rounded-[var(--radius-small)] bg-[var(--brand-primary)] text-lg font-black italic text-white">JS</span>
      <span className="hidden leading-none sm:block">
        <span className="block text-sm font-bold uppercase tracking-[0.08em]">Auto Body Repairs</span>
        <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.16em] text-[var(--text-muted)]">Professional vehicle restoration</span>
      </span>
    </Link>
  );
}
EOF

cat > src/components/navigation/mobile-navigation.tsx <<'EOF'
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

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.dataset.menuOpen = String(open);
    return () => { delete document.body.dataset.menuOpen; };
  }, [open]);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className="lg:hidden">
      <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls={navigationId} onClick={() => setOpen((current) => !current)} className="relative z-[60] grid size-11 place-items-center rounded-full border border-[var(--border-strong)] bg-black/30 text-white transition hover:border-white/40">
        {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
      </button>
      <div id={navigationId} aria-hidden={!open} className={cn("fixed inset-0 z-50 bg-[rgba(9,9,10,0.98)] backdrop-blur-xl transition duration-300", open ? "visible opacity-100" : "invisible opacity-0")}>
        <div className="site-container flex min-h-svh flex-col pb-8 pt-[calc(var(--header-height)+2rem)]">
          <nav aria-label="Mobile navigation" className="flex flex-1 flex-col justify-center">
            {siteConfig.navigation.map((item, index) => (
              <Link key={item.href} href={item.href} tabIndex={open ? 0 : -1} aria-current={pathname === item.href ? "page" : undefined} className="flex items-center justify-between border-b border-[var(--border-subtle)] py-5">
                <span className="text-4xl font-semibold">{item.label}</span>
                <span className="text-xs tracking-[0.16em] text-[var(--brand-primary-hover)]">{String(index + 1).padStart(2, "0")}</span>
              </Link>
            ))}
          </nav>
          <ButtonLink href="/request-estimate" size="large" tabIndex={open ? 0 : -1}>Request an estimate</ButtonLink>
        </div>
      </div>
    </div>
  );
}
EOF

cat > src/components/layout/site-header.tsx <<'EOF'
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
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] transition-colors hover:text-white">{item.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ButtonLink href="/request-estimate" className="hidden lg:inline-flex">Request an estimate</ButtonLink>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
EOF

cat > src/components/layout/site-footer.tsx <<'EOF'
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
          <p className="body-copy mt-6 max-w-md text-sm">Professional auto body repairs built around accurate assessment, disciplined workmanship and a refined final result.</p>
          <ButtonLink href="/request-estimate" className="mt-7">Request an estimate</ButtonLink>
        </div>
        <div>
          <p className="eyebrow">Navigation</p>
          <nav aria-label="Footer navigation" className="mt-5 flex flex-col gap-3">
            {siteConfig.navigation.map((item) => <Link key={item.href} href={item.href} className="text-sm text-[var(--text-secondary)] transition hover:text-white">{item.label}</Link>)}
          </nav>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <div className="mt-5 space-y-3 text-sm text-[var(--text-secondary)]">
            {siteConfig.phone ? <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="block transition hover:text-white">{siteConfig.phone}</a> : <p>Phone details pending</p>}
            <a href={`mailto:${siteConfig.email}`} className="block break-all transition hover:text-white">{siteConfig.email}</a>
            {siteConfig.address ? <p>{siteConfig.address}</p> : <p>Workshop location pending</p>}
          </div>
        </div>
      </Container>
      <div className="border-t border-[var(--border-subtle)]">
        <Container className="flex flex-col gap-3 py-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-5"><Link href="/privacy" className="transition hover:text-white">Privacy</Link><Link href="/terms" className="transition hover:text-white">Terms</Link></div>
        </Container>
      </div>
    </footer>
  );
}
EOF

cat > src/app/layout.tsx <<'EOF'
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "Automotive",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: siteConfig.locale, url: siteConfig.url, siteName: siteConfig.name, title: siteConfig.name, description: siteConfig.description },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={siteConfig.language}>
      <body className={`${inter.variable} ${manrope.variable}`}>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main-content" className="page-main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
EOF

cat > src/app/page.tsx <<'EOF'
import { ArrowRight, ShieldCheck, Wrench } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function HomePage() {
  return (
    <section className="section-spacing">
      <Container>
        <div className="grid min-h-[62svh] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow">Foundation preview</p>
            <h1 className="display-heading mt-6 max-w-4xl text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">JS Auto Body Repairs</h1>
            <p className="body-copy mt-7 max-w-2xl text-base sm:text-lg">The production foundation is now in place. The final homepage design, photography and scroll-driven 3D experience will be introduced in later phases.</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/request-estimate" size="large">Request an estimate<ArrowRight aria-hidden="true" className="ml-2 size-4" /></ButtonLink>
              <ButtonLink href="/services" variant="secondary" size="large">Explore services</ButtonLink>
            </div>
          </div>
          <div className="rounded-[var(--radius-large)] border border-[var(--border-subtle)] bg-[var(--surface)] p-7 shadow-[var(--shadow-elevated)] sm:p-10">
            <p className="eyebrow">System status</p>
            <div className="mt-7 space-y-5">
              <div className="flex gap-4 border-b border-[var(--border-subtle)] pb-5"><ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[var(--brand-primary-hover)]" /><div><h2 className="font-semibold">Accessible site shell</h2><p className="body-copy mt-2 text-sm">Responsive navigation, keyboard support and reduced-motion handling.</p></div></div>
              <div className="flex gap-4"><Wrench aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[var(--brand-primary-hover)]" /><div><h2 className="font-semibold">Reusable architecture</h2><p className="body-copy mt-2 text-sm">Shared tokens, layout primitives and configuration are ready for the full branded design.</p></div></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
EOF

cat > src/app/robots.ts <<'EOF'
import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteConfig.url}/sitemap.xml`, host: siteConfig.url }; }
EOF

cat > src/app/sitemap.ts <<'EOF'
import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
const routes = ["", "/services", "/gallery", "/about", "/testimonials", "/contact", "/request-estimate", "/privacy", "/terms"];
export default function sitemap(): MetadataRoute.Sitemap { const lastModified = new Date(); return routes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified, changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : route === "/request-estimate" ? 0.9 : 0.7 })); }
EOF

cat > docs/architecture/foundation.md <<'EOF'
# JS Auto Body Repairs Foundation

Phase 1 establishes the production shell before brand integration, page-specific design, CMS integration, maps, forms or Three.js work.
EOF

cat > scripts/validateFoundation.mjs <<'EOF'
import fs from "node:fs";
import path from "node:path";
const requiredFiles = [".env.example","src/app/globals.css","src/app/layout.tsx","src/app/page.tsx","src/app/robots.ts","src/app/sitemap.ts","src/config/site.ts","src/lib/cn.ts","src/components/layout/site-header.tsx","src/components/layout/site-footer.tsx","src/components/navigation/mobile-navigation.tsx","src/components/ui/brand-placeholder.tsx","src/components/ui/button-link.tsx","src/components/ui/container.tsx","docs/architecture/foundation.md"];
const requiredDependencies = ["clsx","tailwind-merge","lucide-react","motion"];
const failures = [];
for (const relativePath of requiredFiles) if (!fs.existsSync(path.resolve(relativePath))) failures.push(`Missing required file: ${relativePath}`);
const packageJson = JSON.parse(fs.readFileSync(path.resolve("package.json"), "utf8"));
for (const dependency of requiredDependencies) if (!packageJson.dependencies?.[dependency] && !packageJson.devDependencies?.[dependency]) failures.push(`Missing dependency: ${dependency}`);
const layout = fs.readFileSync(path.resolve("src/app/layout.tsx"), "utf8");
const mobileNavigation = fs.readFileSync(path.resolve("src/components/navigation/mobile-navigation.tsx"), "utf8");
const globals = fs.readFileSync(path.resolve("src/app/globals.css"), "utf8");
if (!layout.includes('href="#main-content"')) failures.push("Root layout does not include a skip link.");
if (!layout.includes('id="main-content"')) failures.push("Root layout does not expose the main-content target.");
if (!mobileNavigation.includes("aria-expanded") || !mobileNavigation.includes("aria-controls")) failures.push("Mobile navigation accessibility attributes are incomplete.");
if (!globals.includes("prefers-reduced-motion")) failures.push("Reduced-motion handling is missing.");
if (failures.length) { console.error("Foundation validation failed.\n"); failures.forEach((failure) => console.error(`- ${failure}`)); process.exit(1); }
console.log(`Foundation validation passed: ${requiredFiles.length} files and ${requiredDependencies.length} dependencies.`);
EOF

node <<'EOF'
const fs = require("node:fs");
const packagePath = "package.json";
const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
packageJson.scripts = { ...packageJson.scripts, dev: "next dev", build: "next build", start: "next start", lint: "eslint .", typecheck: "tsc --noEmit", "validate:foundation": "node scripts/validateFoundation.mjs", validate: "npm run validate:foundation && npm run typecheck && npm run lint && npm run build" };
packageJson.engines = { node: ">=20.9.0", npm: ">=10.0.0" };
fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);
EOF

npx prettier --write "src/**/*.{ts,tsx,css}" "scripts/**/*.mjs" "docs/**/*.md" "package.json" ".env.example"
npm run validate:foundation
npm run typecheck
npm run lint
rm -rf .next
npm run build

git add .
if git diff --cached --quiet; then
  echo "No staged changes to commit."
else
  git commit -m "feat: establish JS Auto Body Repairs foundation" || echo "Commit skipped. Implementation remains intact."
fi

echo

echo "PHASE 1 COMPLETE"
echo "Project: $PROJECT_ROOT"
echo "Backup: $BACKUP_DIR"
