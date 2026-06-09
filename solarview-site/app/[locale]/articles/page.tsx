import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Footer2 } from "@/components/footer2";
import { Navbar1 } from "@/components/navbar1";
import { Link } from "@/i18n/navigation";
import { type Locale } from "@/i18n/config";
import { getArticlesByLocale } from "@/lib/articles";
import { BRAND } from "@/lib/constants";
import { hreflangAlternates, SITE_URL, withSocialMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "articles" });
  const canonicalPath = `/${typedLocale}/articles`;

  return withSocialMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: canonicalPath,
      languages: hreflangAlternates("/articles"),
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${SITE_URL}${canonicalPath}`,
      type: "website",
    },
  });
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const articles = getArticlesByLocale(typedLocale);

  const tSite = await getTranslations({ locale: typedLocale, namespace: "site" });
  const tNav = await getTranslations({ locale: typedLocale, namespace: "nav" });
  const tFeature = await getTranslations({ locale: typedLocale, namespace: "feature" });
  const tPipeline = await getTranslations({ locale: typedLocale, namespace: "pipeline" });
  const tContact = await getTranslations({ locale: typedLocale, namespace: "contact" });
  const tFooter = await getTranslations({ locale: typedLocale, namespace: "footer" });
  const tArticles = await getTranslations({ locale: typedLocale, namespace: "articles" });

  return (
    <>
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
        <header className="max-w-3xl">
          <h1 className="text-section">{tArticles("title")}</h1>
          <p className="mt-3 text-muted-foreground">{tArticles("description")}</p>
        </header>

        {articles.length === 0 ? (
          <section className="mt-10 rounded-lg border border-border p-6">
            <p className="text-sm text-muted-foreground">{tArticles("emptyState")}</p>
          </section>
        ) : (
          <section className="mt-10 grid gap-6 md:grid-cols-2">
            {articles.map((article) => (
              <article key={article.slug} className="rounded-xl border border-border bg-card p-6">
                <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-md">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(article.publishedAt).toLocaleDateString(typedLocale, {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  · {article.readingTimeMinutes} min
                </p>
                <h2 className="mt-2 text-xl font-medium tracking-tight">{article.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{article.excerpt}</p>
                <Link
                  href={`/articles/${article.slug}`}
                  className="mt-4 inline-block text-sm font-medium underline underline-offset-4"
                >
                  {tArticles("readArticle")}
                </Link>
              </article>
            ))}
          </section>
        )}
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
              title: tFooter("resources"),
              links: [{ text: tFooter("contact"), url: "/contact" }],
            },
          ]}
          copyright={tSite("copyright")}
          bottomLinks={[]}
        />
      </footer>
    </>
  );
}
