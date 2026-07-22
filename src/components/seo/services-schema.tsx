import { JsonLd } from "@/components/seo/json-ld";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";
import { siteContent } from "@/content/site-content";

export function ServicesSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "JS Auto Body Repairs Services",
        itemListElement: siteContent.services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteConfig.url}/services#${service.slug}`,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: {
              "@type": "AutoBodyShop",
              name: contactConfig.businessName,
              telephone: contactConfig.phone.international,
              address: {
                "@type": "PostalAddress",
                streetAddress: contactConfig.address.street,
                addressLocality: contactConfig.address.suburb,
                addressRegion: contactConfig.address.state,
                postalCode: contactConfig.address.postcode,
                addressCountry: contactConfig.address.countryCode,
              },
            },
          },
        })),
      }}
    />
  );
}
