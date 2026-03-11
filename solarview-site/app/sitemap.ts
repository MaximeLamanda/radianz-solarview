import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://radianz-solarview-prod.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/contact"];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      const segments = route ? [locale, route] : [locale];
      const path = segments.join("/");
      entries.push({
        url: `${baseUrl}/${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route ? 0.8 : 1,
      });
    }
  }

  return entries;
}
