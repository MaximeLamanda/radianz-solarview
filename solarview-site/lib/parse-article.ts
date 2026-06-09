import fs from "fs";
import path from "path";

import matter from "gray-matter";

import type { Locale } from "@/i18n/config";

export type ArticleSection = {
  id: string;
  heading: string;
  content: string[];
};

export type Article = {
  slug: string;
  locale: Locale;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readingTimeMinutes: number;
  primaryKeyword?: string;
  sections: ArticleSection[];
};

type ArticleFrontmatter = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readingTimeMinutes: number;
  primaryKeyword?: string;
  status?: "draft" | "published";
};

const CONTENT_DIR = path.join(process.cwd(), "content", "articles");

function slugifyHeading(heading: string): string {
  return heading
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseSections(body: string): ArticleSection[] {
  const sections: ArticleSection[] = [];
  const chunks = body.trim().split(/^## /m).filter(Boolean);

  for (const chunk of chunks) {
    const [headingLine, ...rest] = chunk.split("\n");
    const heading = headingLine.trim();
    const paragraphs = rest
      .join("\n")
      .trim()
      .split(/\n{2,}/)
      .map((p) => p.replace(/\n/g, " ").trim())
      .filter(Boolean);

    if (!heading || paragraphs.length === 0) continue;

    sections.push({
      id: slugifyHeading(heading),
      heading,
      content: paragraphs,
    });
  }

  return sections;
}

function readArticlesFromLocale(locale: Locale): Article[] {
  const localeDir = path.join(CONTENT_DIR, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs.readdirSync(localeDir).filter((file) => file.endsWith(".md"));

  const articles: Article[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(localeDir, file), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = data as ArticleFrontmatter;

    if (frontmatter.status === "draft") {
      continue;
    }

    articles.push({
      slug: frontmatter.slug,
      locale,
      title: frontmatter.title,
      excerpt: frontmatter.excerpt,
      coverImage: frontmatter.coverImage,
      publishedAt: frontmatter.publishedAt,
      updatedAt: frontmatter.updatedAt,
      author: frontmatter.author,
      readingTimeMinutes: frontmatter.readingTimeMinutes,
      primaryKeyword: frontmatter.primaryKeyword,
      sections: parseSections(content),
    });
  }

  return articles;
}

export function getAllArticles(): Article[] {
  return (["fr", "en"] as const).flatMap((locale) => readArticlesFromLocale(locale));
}
