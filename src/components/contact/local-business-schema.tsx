import { brandConfig } from "@/config/brand";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";

export function LocalBusinessSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoBodyShop",
    "@id": `${siteConfig.url}/#business`,
    name: contactConfig.businessName,
    url: siteConfig.url,
    telephone: contactConfig.phone.international,
    image: `${siteConfig.url}/media/hero/hero-desktop.webp`,
    logo: `${siteConfig.url}${brandConfig.logo.favicon}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: contactConfig.address.street,
      addressLocality: contactConfig.address.suburb,
      addressRegion: contactConfig.address.state,
      postalCode: contactConfig.address.postcode,
      addressCountry: contactConfig.address.countryCode,
    },
    openingHoursSpecification: contactConfig.hours
      .filter((entry) => entry.opens && entry.closes)
      .map((entry) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${entry.schemaDay}`,
        opens: entry.opens,
        closes: entry.closes,
      })),
    hasMap: contactConfig.maps.searchUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
