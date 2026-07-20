import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
const routes = [
  "",
  "/services",
  "/gallery",
  "/about",
  "/testimonials",
  "/contact",
  "/request-estimate",
  "/privacy",
  "/terms",
];
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/request-estimate" ? 0.9 : 0.7,
  }));
}
