import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { BRAND } from "@/lib/constants";
import { buildFooterBottomLinks, buildFooterMenuItems } from "@/lib/footer-menu";
import { INDUSTRY_FILTER_ALL, INDUSTRY_IDS, INDUSTRY_USE_CASES } from "@/lib/industries";
import { type Locale } from "@/i18n/config";
import { hreflangAlternates, SITE_URL, withSocialMetadata } from "@/lib/seo";
import { Navbar1 } from "@/components/navbar1";
import { Footer2 } from "@/components/footer2";
import { IndustriesHub } from "@/components/industries-hub";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "industries" });
  const canonicalPath = `/${typedLocale}/industries`;

  return withSocialMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: canonicalPath,
      languages: hreflangAlternates("/industries"),
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${SITE_URL}${canonicalPath}`,
      type: "website",
    },
  });
}

export default async function IndustriesPage() {
  const t = await getTranslations("industries");
  const tSite = await getTranslations("site");
  const tNav = await getTranslations("nav");
  const tArticles = await getTranslations("articles");
  const tFooter = await getTranslations("footer");

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
          { title: tNav("services"), url: "/#services" },
          { title: tNav("expertises"), url: "/industries" },
          { title: tArticles("nav"), url: "/articles" },
        ]}
        auth={{
          login: { title: tNav("logIn"), url: "/contact" },
          signup: { title: tNav("requestDemo"), url: "/contact" },
        }}
      />
      <main>
        <Suspense
          fallback={
            <section className="bg-white py-16 md:py-24">
              <div className="container">
                <div className="mb-10 h-24 max-w-2xl animate-pulse rounded-md bg-muted md:mb-14" />
                <div className="mb-10 flex gap-2">
                  {INDUSTRY_IDS.map((id) => (
                    <div
                      key={id}
                      className="h-9 w-24 animate-pulse rounded-md bg-muted"
                    />
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square animate-pulse rounded-2xl bg-muted"
                    />
                  ))}
                </div>
              </div>
            </section>
          }
        >
          <IndustriesHub
            heading={t("heading")}
            description={t("description")}
            emptyLabel={t("empty")}
            stackLabel={t("stackLabel")}
            ctaLabel={t("cta")}
            industries={[
              { id: INDUSTRY_FILTER_ALL, title: t("allLabel") },
              ...INDUSTRY_IDS.map((id) => ({
                id,
                title: tNav(`sectors.${id}.title`),
              })),
            ]}
            cases={INDUSTRY_USE_CASES.map((item) => ({
              id: item.id,
              title: t(`cases.${item.id}.title`),
              description: t(`cases.${item.id}.description`),
              detail: t(`cases.${item.id}.detail`),
            }))}
          />
        </Suspense>
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
          menuItems={buildFooterMenuItems(tFooter)}
          copyright={tSite("copyright")}
          bottomLinks={buildFooterBottomLinks(tFooter)}
        />
      </footer>
    </>
  );
}
