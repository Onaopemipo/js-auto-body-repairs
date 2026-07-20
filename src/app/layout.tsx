import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { FloatingContactActions } from "@/components/layout/floating-contact-actions";
import { MotionShell } from "@/components/motion/motion-shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { brandConfig } from "@/config/brand";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "Automotive",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: brandConfig.logo.favicon,
    apple: brandConfig.logo.appleTouch,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={siteConfig.language}>
      <body className={`${inter.variable} ${manrope.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MotionShell>
          <SiteHeader />
          <main id="main-content" className="page-main">
            {children}
          </main>
          <SiteFooter />
          <FloatingContactActions />
        </MotionShell>
      </body>
    </html>
  );
}
