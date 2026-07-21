import { Container } from "@/components/ui/container";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(145deg,#111113_0%,#080809_70%)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(231,7,11,0.16),transparent_28%)]"
      />
      <Container className="relative py-20 sm:py-24 lg:py-32">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-heading mt-6 max-w-5xl text-5xl leading-[1] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="body-copy mt-7 max-w-3xl text-base sm:text-lg">
          {description}
        </p>
      </Container>
    </section>
  );
}
