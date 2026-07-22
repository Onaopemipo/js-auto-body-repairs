import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { LegalContact } from "@/components/legal/legal-contact";
import { LegalDocument } from "@/components/legal/legal-document";
import { PageHero } from "@/components/pages/page-hero";
import { legalContent } from "@/content/legal/legal-content";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

export const metadata = buildPageMetadata({
  title: legalContent.cookies.title,
  description: legalContent.cookies.description,
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Cookie Policy", path: "/cookies" },
        ]}
      />

      <PageHero
        eyebrow="Legal"
        title={legalContent.cookies.title}
        description={legalContent.cookies.description}
      />

      <LegalDocument
        effectiveDate={legalContent.effectiveDate}
        sections={[
          {
            title: "1. What cookies are",
            content: (
              <p>
                Cookies and similar browser technologies are small pieces of
                information stored or accessed by a website to support
                functionality, security, preferences or measurement.
              </p>
            ),
          },
          {
            title: "2. Current website use",
            content: (
              <>
                <p>
                  The website currently uses browser and server technologies
                  required to provide core functionality, protect forms and
                  deliver requested pages.
                </p>

                <p>
                  Google Analytics is treated as optional. It is not loaded
                  until the visitor accepts analytics through the privacy
                  preferences control.
                </p>
              </>
            ),
          },
          {
            title: "3. Security services",
            content: (
              <p>
                The quote form may use Cloudflare Turnstile when configured.
                Turnstile helps distinguish legitimate form submissions from
                automated abuse and may process limited technical information
                needed to provide that protection.
              </p>
            ),
          },
          {
            title: "4. Local browser storage",
            content: (
              <p>
                Browser storage may be used for essential interface state or, in
                future phases, to remember a visitor’s cookie or analytics
                preference.
              </p>
            ),
          },
          {
            title: "5. Google Analytics",
            content: (
              <>
                <p>
                  When analytics consent is granted, Google Analytics may
                  measure page views, quote-form conversions, click-to-call
                  actions, directions clicks, gallery interaction and Core Web
                  Vitals.
                </p>

                <p>
                  The website uses basic consent behaviour: analytics scripts
                  are not loaded before analytics consent is granted.
                  Advertising storage and advertising personalisation remain
                  denied.
                </p>

                <p>
                  You can change or withdraw your analytics preference at any
                  time using the “Privacy choices” control in the website
                  footer.
                </p>
              </>
            ),
          },
          {
            title: "6. Browser controls",
            content: (
              <p>
                Most browsers allow cookies and stored website data to be
                reviewed, blocked or deleted. Blocking essential technologies
                may prevent some website features from working correctly.
              </p>
            ),
          },
          {
            title: "7. Contact",
            content: <LegalContact />,
          },
        ]}
      />
    </>
  );
}
