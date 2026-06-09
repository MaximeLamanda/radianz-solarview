import type { Locale } from "@/i18n/config";

import { getAllArticles, type Article, type ArticleSection } from "@/lib/parse-article";

export type { Article, ArticleSection };

export function getArticlesByLocale(locale: Locale): Article[] {
  return getAllArticles()
    .filter((article) => article.locale === locale)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getArticleBySlug(locale: Locale, slug: string): Article | undefined {
  return getAllArticles().find((article) => article.locale === locale && article.slug === slug);
}

export function getAllArticlePaths(): Array<{ locale: Locale; slug: string }> {
  return getAllArticles().map((article) => ({ locale: article.locale, slug: article.slug }));
}
