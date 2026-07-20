import Link from "next/link";
import { cn } from "@/lib/cn";

interface BrandPlaceholderProps {
  className?: string;
}

export function BrandPlaceholder({ className }: BrandPlaceholderProps) {
  return (
    <Link
      href="/"
      aria-label="JS Auto Body Repairs homepage"
      className={cn("inline-flex items-center gap-3", className)}
    >
      <span
        aria-hidden="true"
        className="grid size-11 place-items-center rounded-[var(--radius-small)] bg-[var(--brand-primary)] text-lg font-black italic text-white"
      >
        JS
      </span>
      <span className="hidden leading-none sm:block">
        <span className="block text-sm font-bold uppercase tracking-[0.08em]">
          Auto Body Repairs
        </span>
        <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.16em] text-[var(--text-muted)]">
          Professional vehicle restoration
        </span>
      </span>
    </Link>
  );
}
