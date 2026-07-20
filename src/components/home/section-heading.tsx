import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="eyebrow">{eyebrow}</p>

      <h2 className="display-heading mt-5 text-4xl leading-[1.06] sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      {description ? (
        <p className="body-copy mt-6 text-base sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
