import type { Metadata } from "next";

import { PageCta } from "@/components/pages/page-cta";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about JS Auto Body Repairs, a locally owned Redland Bay panel beating and auto refinishing workshop.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About JS Auto Body Repairs"
        title={siteContent.about.heroTitle}
        description={siteContent.about.heroDescription}
      />
      <section className="section-spacing">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <article>
            <p className="eyebrow">{siteContent.about.storyTitle}</p>
            <p className="body-copy mt-6 text-base leading-8">
              {siteContent.about.story}
            </p>
          </article>
          <article>
            <p className="eyebrow">{siteContent.about.approachTitle}</p>
            <p className="body-copy mt-6 text-base leading-8">
              {siteContent.about.approach}
            </p>
          </article>
        </Container>
      </section>
      <section className="section-spacing border-y border-white/10 bg-white/[0.025]">
        <Container>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {siteContent.about.differentiators.map((item) => (
              <article
                key={item.title}
                className="bg-[var(--page-background-elevated)] p-8"
              >
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="body-copy mt-4 text-sm">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <PageCta
        title="Need your vehicle repaired properly?"
        description="Start with a clear assessment and straightforward advice from the team."
      />
    </>
  );
}
