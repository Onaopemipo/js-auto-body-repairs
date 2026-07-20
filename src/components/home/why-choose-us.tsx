import { SectionHeading } from "@/components/home/section-heading";
import { Container } from "@/components/ui/container";
import { homepageBenefits } from "@/data/homepage";

export function WhyChooseUs() {
  return (
    <section className="section-spacing border-y border-white/10 bg-white/[0.025]">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Why JS Auto Body Repairs"
              title="Professional repair should feel clear, controlled and complete."
              description="A quality result depends on more than the final coat of paint. It depends on the decisions made before, during and after the repair."
            />

            <div className="mt-10 border-l-2 border-[var(--brand-primary)] pl-6">
              <p className="text-lg font-medium leading-8 text-white/82">
                We focus on the complete repair outcome: accurate assessment,
                disciplined execution and a finish that restores confidence.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {homepageBenefits.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="border border-white/10 bg-[var(--page-background-elevated)] p-7"
              >
                <Icon
                  aria-hidden="true"
                  className="size-5 text-[var(--brand-primary-hover)]"
                />

                <h3 className="mt-6 text-lg font-semibold">{title}</h3>

                <p className="body-copy mt-3 text-sm">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
