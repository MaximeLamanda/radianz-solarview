import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getAllArticlePaths } from "@/lib/articles";
import { CASE_STUDY_SLUGS } from "@/lib/case-studies";
import { localePath, SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/contact",
    "/articles",
    "/industries",
    "/privacy",
    "/services/audit-ia",
  ];
  const articleRoutes = getAllArticlePaths();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${SITE_URL}${localePath(locale, route)}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route ? 0.8 : 1,
      });
    }

    for (const slug of CASE_STUDY_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/case-studies/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
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
