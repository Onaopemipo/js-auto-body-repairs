import { legalContent } from "@/content/legal/legal-content";

export function LegalContact() {
  return (
    <address className="not-italic">
      <strong className="text-white">{legalContent.business.name}</strong>

      <br />

      {legalContent.business.address}

      <br />

      <a
        href={legalContent.business.phoneHref}
        className="transition hover:text-white"
      >
        {legalContent.business.phone}
      </a>

      <br />

      <a
        href={`mailto:${legalContent.business.email}`}
        className="break-all transition hover:text-white"
      >
        {legalContent.business.email}
      </a>
    </address>
  );
}
