import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { Footer2 } from "@/components/footer2";
import { Navbar1 } from "@/components/navbar1";
import { ArticleSectionIndicator } from "@/components/article-section-indicator";
import { Link } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/config";
import { getAllArticlePaths, getArticleBySlug } from "@/lib/articles";
import { BRAND } from "@/lib/constants";
import { SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return getAllArticlePaths();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const article = getArticleBySlug(typedLocale, slug);

  if (!article) {
    return {};
  }

  const canonicalPath = `/${typedLocale}/articles/${article.slug}`;
  const languages = Object.fromEntries(
    locales.map((loc) => {
      const localized = getArticleBySlug(loc, article.slug);
      return [loc, localized ? `/${loc}/articles/${localized.slug}` : `/${loc}/articles`];
    }),
  );

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: canonicalPath,
      languages,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `${SITE_URL}${canonicalPath}`,
      images: [{ url: article.coverImage, alt: article.title }],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const article = getArticleBySlug(typedLocale, slug);

  if (!article) {
    notFound();
  }

  const tSite = await getTranslations({ locale: typedLocale, namespace: "site" });
  const tNav = await getTranslations({ locale: typedLocale, namespace: "nav" });
  const tFeature = await getTranslations({ locale: typedLocale, namespace: "feature" });
  const tPipeline = await getTranslations({ locale: typedLocale, namespace: "pipeline" });
  const tContact = await getTranslations({ locale: typedLocale, namespace: "contact" });
  const tFooter = await getTranslations({ locale: typedLocale, namespace: "footer" });
  const tArticles = await getTranslations({ locale: typedLocale, namespace: "articles" });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    author: { "@type": "Person", name: article.author },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    image: [`${SITE_URL}${article.coverImage}`],
    mainEntityOfPage: `${SITE_URL}/${typedLocale}/articles/${article.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Navbar1
        logo={{
          url: "/",
          src: BRAND.logoSrc,
          alt: tSite("name"),
          title: tSite("name"),
        }}
        menu={[
          { title: tFeature("about"), url: "/#avantages" },
          { title: tPipeline("badge"), url: "/#features" },
          { title: tArticles("nav"), url: "/articles" },
          { title: tContact("badge"), url: "/contact" },
        ]}
        auth={{
          login: { title: tNav("logIn"), url: "/contact" },
          signup: { title: tNav("requestDemo"), url: "/contact" },
        }}
      />
      <main className="container py-12 md:py-16">
        <Link href="/articles" className="text-sm underline underline-offset-4">
          {tArticles("backToArticles")}
        </Link>
        <article className="mt-5 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <ArticleSectionIndicator
                title={tArticles("tocTitle")}
                items={article.sections.map((section) => ({
                  id: section.id,
                  label: section.heading,
                }))}
              />
            </div>
          </aside>
          <div>
            <header className="max-w-3xl">
              <p className="text-xs text-muted-foreground">
                {new Date(article.publishedAt).toLocaleDateString(typedLocale, {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}{" "}
                · {article.readingTimeMinutes} min · {article.author}
              </p>
              <h1 className="mt-2 text-section">{article.title}</h1>
              <p className="mt-3 text-muted-foreground">{article.excerpt}</p>
            </header>

            <div className="mt-10 space-y-10">
              {article.sections.map((section) => (
                <section id={section.id} key={section.id} className="scroll-mt-24">
                  <h2 className="text-2xl font-normal tracking-tight">{section.heading}</h2>
                  <div className="mt-3 space-y-4 text-sm leading-7 text-muted-foreground">
                    {section.content.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>
      <footer>
        <Footer2
          logo={{
            url: "/",
            src: BRAND.logoSrc,
            alt: tSite("name"),
            title: tSite("name"),
          }}
          tagline={tSite("footerTagline")}
          menuItems={[
            {
              title: tFooter("product"),
              links: [
                { text: tFooter("features"), url: "/#avantages" },
                { text: tFooter("requestDemo"), url: "/contact" },
              ],
            },
            {
              title: tFooter("company"),
              links: [
                { text: tFooter("about"), url: "/#hero" },
                { text: tFooter("contact"), url: "/contact" },
              ],
            },
          ]}
          copyright={tSite("copyright")}
          bottomLinks={[]}
        />
      </footer>
    </>
  );
}
