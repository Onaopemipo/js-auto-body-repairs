import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "text";
  size?: "standard" | "large";
};

export function ButtonLink({
  variant = "primary",
  size = "standard",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center font-semibold transition focus-visible:outline-none",
        size === "standard" && "min-h-12 px-5 text-sm",
        size === "large" && "min-h-14 px-7 text-sm",
        variant === "primary" &&
          "rounded-[var(--radius-small)] bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)]",
        variant === "secondary" &&
          "rounded-[var(--radius-small)] border border-[var(--border-strong)] bg-white/[0.03] text-white hover:border-white/40 hover:bg-white/[0.07]",
        variant === "text" &&
          "min-h-0 px-0 text-[var(--brand-primary-hover)] hover:text-white",
        className,
      )}
      {...props}
    />
  );
}
