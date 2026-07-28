import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Navbar1 } from "@/components/navbar1";
import { AgencyHero } from "@/components/agency-hero";
import { Logos18 } from "@/components/logos18";
import { ProcessSection } from "@/components/process-section";
import { MagicTextSection } from "@/components/magic-text-section";
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
        <ProcessSection
          heading={tAgency("process.heading")}
          steps={[
            {
              step: tAgency("process.step1"),
              title: tAgency("process.step1Title"),
              description: tAgency("process.step1Desc"),
            },
            {
              step: tAgency("process.step2"),
              title: tAgency("process.step2Title"),
              description: tAgency("process.step2Desc"),
            },
            {
              step: tAgency("process.step3"),
              title: tAgency("process.step3Title"),
              description: tAgency("process.step3Desc"),
            },
          ]}
        />
        <UseCasesCarousel
          heading={tAgency("useCases.heading")}
          description={tAgency("useCases.description")}
          previousLabel={tAgency("useCases.previous")}
          nextLabel={tAgency("useCases.next")}
          addCard={{
            title: tAgency("useCases.addTitle"),
            cta: tAgency("useCases.addCta"),
            href: "/contact",
          }}
          items={[
            {
              title: tAgency("useCases.item1"),
              shape: "gallery",
              galleryShapeId: 8,
              variant: "warm-sand",
              imageSrc: "/use-cases/mesh-peach.png",
            },
            {
              title: tAgency("useCases.item2"),
              shape: "gallery",
              galleryShapeId: 22,
              variant: "periwinkle",
              imageSrc: "/use-cases/mesh-cyan.png",
            },
            {
              title: tAgency("useCases.item3"),
              shape: "gallery",
              galleryShapeId: 1,
              variant: "warm-sand",
              imageSrc: "/use-cases/mesh-ember.png",
            },
            {
              title: tAgency("useCases.item4"),
              shape: "gallery",
              galleryShapeId: 14,
              variant: "teal-fog",
              imageSrc: "/use-cases/mesh-teal.png",
            },
            {
              title: tAgency("useCases.item5"),
              shape: "gallery",
              galleryShapeId: 35,
              variant: "lime-mist",
              imageSrc: "/use-cases/mesh-lime.png",
            },
            {
              title: tAgency("useCases.item6"),
              shape: "gallery",
              galleryShapeId: 70,
              variant: "periwinkle",
              imageSrc: "/use-cases/mesh-indigo.png",
            },
          ]}
        />
        <MagicTextSection text={tAgency("statement.text")} />
      </main>
    </>
  );
}
