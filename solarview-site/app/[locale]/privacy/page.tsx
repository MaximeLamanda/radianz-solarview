import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Footer2 } from "@/components/footer2";
import { Navbar1 } from "@/components/navbar1";
import { type Locale } from "@/i18n/config";
import { BRAND } from "@/lib/constants";
import { buildFooterBottomLinks, buildFooterMenuItems } from "@/lib/footer-menu";
import { hreflangAlternates, SITE_URL, withSocialMetadata } from "@/lib/seo";

const SECTION_KEYS = ["dataController", "dataCollected", "purposes", "retention", "rights", "contact"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "privacy" });
  const canonicalPath = `/${typedLocale}/privacy`;

  return withSocialMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: canonicalPath,
      languages: hreflangAlternates("/privacy"),
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${SITE_URL}${canonicalPath}`,
      type: "website",
    },
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  const tSite = await getTranslations({ locale: typedLocale, namespace: "site" });
  const tNav = await getTranslations({ locale: typedLocale, namespace: "nav" });
  const tArticles = await getTranslations({ locale: typedLocale, namespace: "articles" });
  const tFooter = await getTranslations({ locale: typedLocale, namespace: "footer" });
  const tPrivacy = await getTranslations({ locale: typedLocale, namespace: "privacy" });

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
      <main className="container max-w-3xl py-12 md:py-16">
        <header>
          <h1 className="text-section">{tPrivacy("title")}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{tPrivacy("lastUpdated")}</p>
          <p className="mt-4 text-muted-foreground">{tPrivacy("intro")}</p>
        </header>
        <div className="mt-10 space-y-8">
          {SECTION_KEYS.map((key) => (
            <section key={key}>
              <h2 className="text-xl font-medium tracking-tight">{tPrivacy(`sections.${key}.title`)}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {tPrivacy(`sections.${key}.body`)}
              </p>
            </section>
          ))}
        </div>
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
