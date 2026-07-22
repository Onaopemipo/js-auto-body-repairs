import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

const routes = [
  {
    path: "",
    changeFrequency: "weekly" as const,
    priority: 1,
  },
  {
    path: "/services",
    changeFrequency: "monthly" as const,
    priority: 0.9,
  },
  {
    path: "/gallery",
    changeFrequency: "weekly" as const,
    priority: 0.9,
  },
  {
    path: "/about",
    changeFrequency: "yearly" as const,
    priority: 0.7,
  },
  {
    path: "/testimonials",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    path: "/contact",
    changeFrequency: "monthly" as const,
    priority: 0.9,
  },
  {
    path: "/request-estimate",
    changeFrequency: "monthly" as const,
    priority: 0.9,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
