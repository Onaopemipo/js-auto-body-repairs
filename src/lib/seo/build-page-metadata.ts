import type { Metadata } from "next";

import { seoConfig } from "@/config/seo";
import { siteConfig } from "@/config/site";

interface BuildPageMetadataOptions {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}

export function buildPageMetadata({
  title,
  description,
  path,
  index = true,
}: BuildPageMetadataOptions): Metadata {
  const absoluteUrl = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,

    alternates: {
      canonical: path,
    },

    robots: {
      index,
      follow: index,
      googleBot: {
        index,
        follow: index,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: absoluteUrl,
      title,
      description,
      images: [
        {
          url: seoConfig.socialImage.url,
          width: seoConfig.socialImage.width,
          height: seoConfig.socialImage.height,
          alt: seoConfig.socialImage.alt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seoConfig.socialImage.url],
    },
  };
}
