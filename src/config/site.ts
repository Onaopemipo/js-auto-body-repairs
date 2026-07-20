export const siteConfig = {
  name: "JS Auto Body Repairs",
  shortName: "JS Auto Body",
  description:
    "Professional collision repair, panel restoration, paint refinishing and vehicle body repair services.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jsautobodyrepairs.com.au",
  locale: "en_AU",
  language: "en-AU",
  email:
    process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "info@jsautobodyrepairs.com.au",
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
