import { JsonLd } from "@/components/seo/json-ld";
import { brandConfig } from "@/config/brand";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: contactConfig.businessName,
        url: siteConfig.url,
        logo: `${siteConfig.url}${brandConfig.logo.full}`,
        image: `${siteConfig.url}/media/hero/hero-desktop.webp`,
        telephone: contactConfig.phone.international,
        address: {
          "@type": "PostalAddress",
          streetAddress: contactConfig.address.street,
          addressLocality: contactConfig.address.suburb,
          addressRegion: contactConfig.address.state,
          postalCode: contactConfig.address.postcode,
          addressCountry: contactConfig.address.countryCode,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: contactConfig.phone.international,
          contactType: "customer service",
          areaServed: "AU",
          availableLanguage: "English",
        },
      }}
    />
  );
}
