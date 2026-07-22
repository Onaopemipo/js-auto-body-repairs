"use client";

import type { GalleryCategory } from "@/types/gallery";

interface GalleryFilterProps {
  categories: Array<{
    value: GalleryCategory;
    label: string;
  }>;
  activeCategory: GalleryCategory;
  counts: Record<GalleryCategory, number>;
  onChange: (category: GalleryCategory) => void;
}

export function GalleryFilter({
  categories,
  activeCategory,
  counts,
  onChange,
}: GalleryFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter gallery projects"
      className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {categories.map((category) => {
        const active = activeCategory === category.value;

        return (
          <button
            key={category.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(category.value)}
            className={[
              "inline-flex min-h-11",
              "shrink-0 items-center",
              "gap-2 border px-4",
              "text-xs font-bold",
              "uppercase",
              "tracking-[0.075em]",
              "transition",
              active
                ? [
                    "border-[var(--brand-primary)]",
                    "bg-[var(--brand-primary)]",
                    "text-white",
                  ].join(" ")
                : [
                    "border-white/15",
                    "bg-white/[0.025]",
                    "text-white/60",
                    "hover:border-white/35",
                    "hover:text-white",
                  ].join(" "),
            ].join(" ")}
          >
            {category.label}

            <span
              className={[
                "rounded-full px-2",
                "py-0.5 text-[0.65rem]",
                active ? "bg-black/20" : "bg-white/[0.06]",
              ].join(" ")}
            >
              {counts[category.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
