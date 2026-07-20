import type { Metadata } from "next";

import { FinalCta } from "@/components/home/final-cta";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { HomeHero } from "@/components/home/home-hero";
import { InsuranceSupport } from "@/components/home/insurance-support";
import { LocationPreview } from "@/components/home/location-preview";
import { RepairProcess } from "@/components/home/repair-process";
import { ServicesOverview } from "@/components/home/services-overview";
import { TestimonialsPreview } from "@/components/home/testimonials-preview";
import { TrustStrip } from "@/components/home/trust-strip";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Collision Repair and Auto Body Restoration",
  description:
    "Professional collision repair, panel restoration, paint refinishing and accident damage assessment from JS Auto Body Repairs.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JS Auto Body Repairs",
    description:
      "Professional collision repair, panel restoration and paint refinishing.",
    url: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Reveal>
        <TrustStrip />
      </Reveal>
      <Reveal>
        <ServicesOverview />
      </Reveal>
      <Reveal>
        <RepairProcess />
      </Reveal>
      <Reveal>
        <WhyChooseUs />
      </Reveal>
      <Reveal>
        <GalleryPreview />
      </Reveal>
      <Reveal>
        <TestimonialsPreview />
      </Reveal>
      <Reveal>
        <InsuranceSupport />
      </Reveal>
      <Reveal>
        <LocationPreview />
      </Reveal>
      <Reveal>
        <FinalCta />
      </Reveal>
    </>
  );
}
