import { homepageTrustItems } from "@/data/homepage";

import { Container } from "@/components/ui/container";

export function TrustStrip() {
  return (
    <section className="border-y border-white/10 bg-white/[0.025]">
      <Container className="grid grid-cols-2 lg:grid-cols-4">
        {homepageTrustItems.map(({ label, icon: Icon }, index) => (
          <div
            key={label}
            className={[
              "flex min-h-28 items-center",
              "justify-center gap-3 px-4",
              index % 2 === 0 ? "border-r border-white/10" : "",
              index < 2 ? "border-b border-white/10 lg:border-b-0" : "",
              index === 1 ? "lg:border-r" : "",
              index === 2 ? "border-r border-white/10" : "",
            ].join(" ")}
          >
            <Icon
              aria-hidden="true"
              className="size-5 text-[var(--brand-primary-hover)]"
            />
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/72">
              {label}
            </span>
          </div>
        ))}
      </Container>
    </section>
  );
}
