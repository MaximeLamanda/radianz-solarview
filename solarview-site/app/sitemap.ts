import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getAllArticlePaths } from "@/lib/articles";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/contact", "/articles"];
  const articleRoutes = getAllArticlePaths();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      const segments = route ? [locale, route] : [locale];
      const path = segments.join("/");
      entries.push({
        url: `${SITE_URL}/${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route ? 0.8 : 1,
      });
    }
  }

  for (const articleRoute of articleRoutes) {
    entries.push({
      url: `${SITE_URL}/${articleRoute.locale}/articles/${articleRoute.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return entries;
}
