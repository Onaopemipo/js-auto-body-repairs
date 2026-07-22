import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

interface LegalSection {
  title: string;
  content: ReactNode;
}

interface LegalDocumentProps {
  effectiveDate: string;
  sections: LegalSection[];
}

export function LegalDocument({ effectiveDate, sections }: LegalDocumentProps) {
  return (
    <section className="section-spacing">
      <Container>
        <div className="mx-auto max-w-4xl">
          <p className="text-sm text-white/45">
            Effective date: {effectiveDate}
          </p>

          <div className="mt-10 space-y-12">
            {sections.map((section) => (
              <section
                key={section.title}
                className="border-t border-white/10 pt-8"
              >
                <h2 className="text-2xl font-semibold sm:text-3xl">
                  {section.title}
                </h2>

                <div className="body-copy mt-5 space-y-4 text-sm leading-7 sm:text-base">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
