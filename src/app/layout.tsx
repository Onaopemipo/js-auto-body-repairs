import type { Metadata } from "next";
import { GlobalSeoSchemas } from "@/components/seo/global-seo-schemas";
import { Inter, Manrope } from "next/font/google";
import { FloatingContactActions } from "@/components/layout/floating-contact-actions";
import { MotionShell } from "@/components/motion/motion-shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { brandConfig } from "@/config/brand";
import { seoConfig } from "@/config/seo";
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

  title: {
    default: seoConfig.title,
    template: `%s | ${siteConfig.name}`,
  },

  description: seoConfig.description,

  applicationName: siteConfig.name,

  category: "Automotive",

  keywords: [...seoConfig.keywords],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: seoConfig.title,
    description: seoConfig.description,
    images: [
      {
        url: seoConfig.socialImage.url,
        width: seoConfig.socialImage.width,
        height: seoConfig.socialImage.height,
        alt: seoConfig.socialImage.alt,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: seoConfig.title,
    description: seoConfig.description,
    images: [seoConfig.socialImage.url],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

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
        <GlobalSeoSchemas />
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
