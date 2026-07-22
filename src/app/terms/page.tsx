import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { LegalContact } from "@/components/legal/legal-contact";
import { LegalDocument } from "@/components/legal/legal-document";
import { PageHero } from "@/components/pages/page-hero";
import { legalContent } from "@/content/legal/legal-content";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

export const metadata = buildPageMetadata({
  title: legalContent.terms.title,
  description: legalContent.terms.description,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Website Terms", path: "/terms" },
        ]}
      />

      <PageHero
        eyebrow="Legal"
        title={legalContent.terms.title}
        description={legalContent.terms.description}
      />

      <LegalDocument
        effectiveDate={legalContent.effectiveDate}
        sections={[
          {
            title: "1. Acceptance",
            content: (
              <p>
                By using this website, you agree to these Website Terms of Use.
                Stop using the website if you do not agree with them.
              </p>
            ),
          },
          {
            title: "2. General website information",
            content: (
              <>
                <p>
                  Website content is provided as general information about JS
                  Auto Body Repairs and its services.
                </p>

                <p>
                  Information displayed online is not a final diagnosis,
                  inspection report, repair specification, booking confirmation
                  or binding quotation.
                </p>
              </>
            ),
          },
          {
            title: "3. Online quote requests",
            content: (
              <>
                <p>
                  Submitting the online form does not create a repair contract,
                  confirm availability or guarantee a particular price,
                  timeframe or repair method.
                </p>

                <p>
                  Any initial response may be subject to physical inspection,
                  dismantling, parts availability, hidden damage, insurer
                  requirements and further discussion.
                </p>
              </>
            ),
          },
          {
            title: "4. Accuracy of submitted information",
            content: (
              <p>
                You are responsible for providing accurate information and for
                having authority to provide uploaded photographs, vehicle
                details and contact information.
              </p>
            ),
          },
          {
            title: "5. Bookings and workshop services",
            content: (
              <p>
                Confirmed workshop services may be subject to separate
                estimates, work authorisations, invoices, insurer processes,
                parts terms or repair conditions provided directly by the
                business.
              </p>
            ),
          },
          {
            title: "6. Australian Consumer Law",
            content: (
              <p>
                Nothing in these website terms excludes, restricts or modifies
                rights, remedies, guarantees or liabilities that cannot lawfully
                be excluded under the Australian Consumer Law or other
                applicable legislation.
              </p>
            ),
          },
          {
            title: "7. Website availability",
            content: (
              <p>
                The website may be changed, suspended or unavailable without
                notice because of maintenance, technical faults, hosting issues,
                security incidents or other operational requirements.
              </p>
            ),
          },
          {
            title: "8. Prohibited use",
            content: (
              <>
                <p>You must not:</p>

                <ul className="list-disc space-y-2 pl-6">
                  <li>use the website unlawfully or fraudulently;</li>
                  <li>submit malicious, deceptive or irrelevant content;</li>
                  <li>attempt to bypass security or anti-spam protections;</li>
                  <li>
                    upload material that infringes another person’s rights;
                  </li>
                  <li>
                    interfere with the website, server, forms or connected
                    systems.
                  </li>
                </ul>
              </>
            ),
          },
          {
            title: "9. Intellectual property",
            content: (
              <p>
                Unless stated otherwise, website branding, layout, text,
                graphics and business-owned project photographs are owned by or
                licensed to JS Auto Body Repairs. They must not be reproduced
                commercially without permission.
              </p>
            ),
          },
          {
            title: "10. External services and links",
            content: (
              <p>
                The website may link to services such as Google Maps or use
                third-party infrastructure. Those services are governed by their
                own terms, availability and privacy practices.
              </p>
            ),
          },
          {
            title: "11. Liability",
            content: (
              <p>
                To the extent permitted by law, the business is not responsible
                for losses caused solely by reliance on incomplete general
                website information, temporary website unavailability,
                third-party services or unauthorised use of the website.
              </p>
            ),
          },
          {
            title: "12. Governing law",
            content: (
              <p>
                These website terms are governed by the laws applying in
                Queensland, Australia. This clause does not remove rights that
                apply under mandatory consumer legislation.
              </p>
            ),
          },
          {
            title: "13. Contact",
            content: <LegalContact />,
          },
        ]}
      />
    </>
  );
}
