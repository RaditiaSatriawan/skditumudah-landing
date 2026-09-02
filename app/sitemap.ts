import type { MetadataRoute } from "next";
import { getAllArticleSlugs } from "@/lib/articles";

const SITE = "https://www.skditumudah.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticleSlugs().map((slug) => ({
    url: `${SITE}/${slug}/`,
    lastModified: new Date("2026-09-01"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [
    {
      url: SITE,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    ...articles,
  ];
}
