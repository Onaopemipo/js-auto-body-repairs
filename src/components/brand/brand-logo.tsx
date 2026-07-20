import Image from "next/image";
import Link from "next/link";

import { brandConfig } from "@/config/brand";
import { cn } from "@/lib/cn";

type BrandLogoVariant = "header" | "footer" | "full" | "mark";

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  linked?: boolean;
  priority?: boolean;
  className?: string;
}

const dimensions = {
  header: {
    width: 600,
    height: 220,
  },
  footer: {
    width: 1000,
    height: 360,
  },
  full: {
    width: 1600,
    height: 580,
  },
  mark: {
    width: 512,
    height: 512,
  },
} as const;

function resolveSource(variant: BrandLogoVariant) {
  if (variant === "mark") {
    return brandConfig.logo.mark;
  }

  if (variant === "header") {
    return brandConfig.logo.header;
  }

  return brandConfig.logo.full;
}

export function BrandLogo({
  variant = "header",
  linked = true,
  priority = false,
  className,
}: BrandLogoProps) {
  const dimensionsForVariant = dimensions[variant];

  const image = (
    <Image
      src={resolveSource(variant)}
      alt={
        variant === "mark"
          ? brandConfig.name
          : `${brandConfig.name} — ${brandConfig.strapline}`
      }
      width={dimensionsForVariant.width}
      height={dimensionsForVariant.height}
      priority={priority}
      className={cn("h-auto w-full object-contain", className)}
      sizes={
        variant === "header"
          ? "(max-width: 640px) 190px, 270px"
          : variant === "mark"
            ? "128px"
            : "(max-width: 768px) 80vw, 500px"
      }
    />
  );

  if (!linked) {
    return image;
  }

  return (
    <Link
      href="/"
      aria-label={`${brandConfig.name} homepage`}
      className="inline-flex"
    >
      {image}
    </Link>
  );
}
