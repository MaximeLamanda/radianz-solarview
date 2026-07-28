import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Navbar1 } from "@/components/navbar1";
import { AgencyHero } from "@/components/agency-hero";
import { Logos18 } from "@/components/logos18";
import { UseCasesCarousel } from "@/components/use-cases-carousel";

import { BRAND } from "@/lib/constants";
import { hreflangAlternates, SITE_URL, withSocialMetadata } from "@/lib/seo";
import { type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "site" });
  const canonicalPath = `/${typedLocale}`;

  return withSocialMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: canonicalPath,
      languages: hreflangAlternates(),
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${SITE_URL}${canonicalPath}`,
      type: "website",
      locale: typedLocale === "fr" ? "fr_FR" : "en_US",
      siteName: t("name"),
    },
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const tSite = await getTranslations({ locale: typedLocale, namespace: "site" });
  const tNav = await getTranslations({ locale: typedLocale, namespace: "nav" });
  const tAgency = await getTranslations({ locale: typedLocale, namespace: "agency" });
  const tArticles = await getTranslations({ locale: typedLocale, namespace: "articles" });

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: tSite("name"),
        url: SITE_URL,
        logo: `${SITE_URL}/radianz-logo.svg`,
        description: tSite("schemaDescription"),
        areaServed: {
          "@type": "Country",
          name: "France",
        },
      },
      {
        "@type": "ProfessionalService",
        name: tSite("name"),
        description: tSite("schemaDescription"),
        url: SITE_URL,
        priceRange: "€€€",
      },
      {
        "@type": "WebSite",
        name: tSite("name"),
        url: `${SITE_URL}/${typedLocale}`,
        inLanguage: typedLocale,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Navbar1
        logo={{
          url: "#hero",
          src: BRAND.logoSrc,
          alt: tSite("name"),
          title: tSite("name"),
        }}
        menu={[
          { title: tNav("services"), url: "/#services" },
          { title: tNav("expertises"), url: "/#resultats" },
          { title: tNav("offers"), url: "/#offres" },
          { title: tArticles("nav"), url: "/articles" },
          { title: tNav("contact"), url: "/contact" },
        ]}
        auth={{
          login: { title: tNav("logIn"), url: "/contact" },
          signup: { title: tNav("requestDemo"), url: "/contact" },
        }}
      />
      <main id="hero">
        <AgencyHero
          heading={tAgency("hero.heading")}
          description={tAgency("hero.description")}
          buttonPrimary={{ text: tAgency("hero.ctaPrimary"), href: "/contact" }}
          buttonSecondary={{ text: tAgency("hero.ctaSecondary"), href: "/contact" }}
          logos={<Logos18 />}
        />
        <UseCasesCarousel
          heading={tAgency("useCases.heading")}
          description={tAgency("useCases.description")}
          previousLabel={tAgency("useCases.previous")}
          nextLabel={tAgency("useCases.next")}
          items={[
            {
              title: tAgency("useCases.item1"),
              shape: "circle",
              gradient: "from-lime/80 via-[#d4e8c2] to-[#a8c5b0]",
            },
            {
              title: tAgency("useCases.item2"),
              shape: "hexagon",
              gradient: "from-[#c5d4e8] via-[#e8eef5] to-[#9bb0c9]",
            },
            {
              title: tAgency("useCases.item3"),
              shape: "diamond",
              gradient: "from-[#e8d5c5] via-[#f5ebe3] to-[#c9a892]",
            },
            {
              title: tAgency("useCases.item4"),
              shape: "rounded-square",
              gradient: "from-[#d5e8e0] via-[#eef5f2] to-[#8fb5a5]",
            },
            {
              title: tAgency("useCases.item5"),
              shape: "triangle",
              gradient: "from-[#e8e0d5] via-[#f5f0e8] to-[#b5a48f]",
            },
            {
              title: tAgency("useCases.item6"),
              shape: "ring",
              gradient: "from-[#d5dde8] via-[#eef1f5] to-[#8f9bb5]",
            },
          ]}
        />
      </main>
    </>
  );
}
