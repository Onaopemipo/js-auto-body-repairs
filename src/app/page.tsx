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
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

export const metadata = buildPageMetadata({
  title: "Collision Repair and Auto Body Restoration",
  description:
    "Professional collision repair, panel restoration, paint refinishing and accident damage assessment from JS Auto Body Repairs in Redland Bay.",
  path: "/",
});

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
