import { SectionHeading } from "@/components/home/section-heading";
import { Container } from "@/components/ui/container";
import { homepageProcess } from "@/data/homepage";

export function RepairProcess() {
  return (
    <section className="section-spacing relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(231,7,11,0.10),transparent_28%)]"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Repair journey"
          title="A controlled process from damage to restoration."
          description="Each stage has a clear purpose. That discipline protects quality, timing and the final result."
        />

        <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-5">
          {homepageProcess.map(({ step, title, description }) => (
            <article
              key={step}
              className="min-h-72 bg-[rgba(15,15,17,0.94)] p-7"
            >
              <span className="text-xs font-bold tracking-[0.16em] text-[var(--brand-primary-hover)]">
                {step}
              </span>

              <h3 className="mt-16 text-2xl font-semibold">{title}</h3>

              <p className="body-copy mt-4 text-sm">{description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
