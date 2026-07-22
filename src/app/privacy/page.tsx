import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { LegalContact } from "@/components/legal/legal-contact";
import { LegalDocument } from "@/components/legal/legal-document";
import { PageHero } from "@/components/pages/page-hero";
import { legalContent } from "@/content/legal/legal-content";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

export const metadata = buildPageMetadata({
  title: legalContent.privacy.title,
  description: legalContent.privacy.description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]}
      />

      <PageHero
        eyebrow="Legal"
        title={legalContent.privacy.title}
        description={legalContent.privacy.description}
      />

      <LegalDocument
        effectiveDate={legalContent.effectiveDate}
        sections={[
          {
            title: "1. About this policy",
            content: (
              <>
                <p>
                  This policy explains how JS Auto Body Repairs handles personal
                  information provided through this website and during
                  website-related enquiries.
                </p>

                <p>
                  It applies to information submitted through the quote form,
                  contact links and other website interactions. Workshop,
                  insurer or repair documentation handled outside this website
                  may also be subject to separate collection notices or
                  agreements.
                </p>
              </>
            ),
          },
          {
            title: "2. Information we may collect",
            content: (
              <>
                <p>Information collected through the website may include:</p>

                <ul className="list-disc space-y-2 pl-6">
                  <li>your name, email address and phone number;</li>
                  <li>your preferred contact method;</li>
                  <li>vehicle make, model, year and optional registration;</li>
                  <li>
                    descriptions of collision damage, faults or requested work;
                  </li>
                  <li>
                    photographs you choose to upload with a quote request;
                  </li>
                  <li>
                    technical and security information needed to protect the
                    quote form from misuse.
                  </li>
                </ul>
              </>
            ),
          },
          {
            title: "3. Why we collect information",
            content: (
              <>
                <p>We may use submitted information to:</p>

                <ul className="list-disc space-y-2 pl-6">
                  <li>review and respond to repair or service enquiries;</li>
                  <li>prepare or discuss an initial repair estimate;</li>
                  <li>contact you using your preferred contact method;</li>
                  <li>
                    assess photographs and information relating to your vehicle;
                  </li>
                  <li>
                    protect the website, quote form and business from spam,
                    fraud or misuse;
                  </li>
                  <li>maintain appropriate business and enquiry records.</li>
                </ul>
              </>
            ),
          },
          {
            title: "4. Quote photographs",
            content: (
              <>
                <p>
                  Uploaded photographs may contain vehicle registration plates,
                  people, documents or surroundings. Only upload photographs
                  that are relevant to the repair enquiry and that you are
                  authorised to provide.
                </p>

                <p>
                  Avoid including unrelated people, personal documents,
                  residential details or other information that is unnecessary
                  for the quote.
                </p>
              </>
            ),
          },
          {
            title: "5. Storage and delivery",
            content: (
              <>
                <p>
                  In production, quote requests may be delivered to the business
                  through configured email infrastructure. Security and
                  anti-spam services may also process limited technical
                  information required to protect the form.
                </p>

                <p>
                  During local development, test submissions may be stored in a
                  private local development directory. Development submissions
                  must not contain real customer information.
                </p>
              </>
            ),
          },
          {
            title: "6. Disclosure",
            content: (
              <>
                <p>
                  Information may be disclosed to service providers used to
                  operate the website, deliver enquiries, host data, prevent
                  abuse or provide technical support.
                </p>

                <p>
                  We do not state that customer information is sold. Information
                  may also be disclosed where required or authorised by law.
                </p>
              </>
            ),
          },
          {
            title: "7. Security and retention",
            content: (
              <>
                <p>
                  Reasonable administrative and technical measures are used to
                  protect information from misuse, loss, unauthorised access,
                  modification or disclosure.
                </p>

                <p>
                  Information should be retained only for as long as reasonably
                  required for the enquiry, repair relationship, business
                  records, dispute handling or legal obligations.
                </p>
              </>
            ),
          },
          {
            title: "8. Access and correction",
            content: (
              <p>
                You may contact us to ask about personal information associated
                with your website enquiry or to request correction of inaccurate
                information. Verification may be required before information is
                released or changed.
              </p>
            ),
          },
          {
            title: "9. Cookies and analytics",
            content: (
              <>
                <p>
                  The website may use Google Analytics after a visitor
                  explicitly accepts analytics. Analytics is used to measure
                  page views, website interactions, quote conversions and
                  performance metrics.
                </p>

                <p>
                  Google Analytics is not loaded when analytics consent has not
                  been granted. Advertising storage, advertising user data and
                  advertising personalisation remain denied by this website.
                </p>
              </>
            ),
          },
          {
            title: "10. Questions or complaints",
            content: (
              <>
                <p>
                  Contact the business with questions, privacy requests or
                  concerns about how website-submitted information has been
                  handled.
                </p>

                <LegalContact />
              </>
            ),
          },
          {
            title: "11. Updates",
            content: (
              <p>
                This policy may be updated when website features, business
                processes, service providers or legal obligations change. The
                effective date above identifies the current version.
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
