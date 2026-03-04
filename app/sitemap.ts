import type { MetadataRoute } from "next";

import { GOAL_PATHS } from "@/lib/data/goals";
import { getSiteUrl } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const guideEntries: MetadataRoute.Sitemap = GOAL_PATHS.map((goal) => ({
    url: `${siteUrl}/guide/${goal.path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...guideEntries];
}
