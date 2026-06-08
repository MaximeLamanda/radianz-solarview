import type { Metadata } from "next";
import { Clock, MapPin, Target } from "lucide-react";
import { getTranslations } from "next-intl/server";

import heroTopImg from "@/public/hero-top.webp";
import { Navbar1 } from "@/components/navbar1";
import { Hero45 } from "@/components/hero45";
import { Feature166 } from "@/components/feature166";
import { PipelineSection } from "@/components/pipeline-section";
import { ProspectPortalSection } from "@/components/prospect-portal-section";
import { SearchSection } from "@/components/search-section";
import { LetsTalkSection } from "@/components/lets-talk-section";
import { Footer2 } from "@/components/footer2";

import { BRAND, STAT_BADGES, HERO_FEATURES } from "@/lib/constants";
import { hreflangAlternates, SITE_URL } from "@/lib/seo";
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

  return {
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
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
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
  const tFeature = await getTranslations({ locale: typedLocale, namespace: "feature" });
  const tPipeline = await getTranslations({ locale: typedLocale, namespace: "pipeline" });
  const tArticles = await getTranslations({ locale: typedLocale, namespace: "articles" });
  const tContact = await getTranslations({ locale: typedLocale, namespace: "contact" });
  const tFooter = await getTranslations({ locale: typedLocale, namespace: "footer" });
  const tHero = await getTranslations({ locale: typedLocale, namespace: "hero" });

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
        "@type": "SoftwareApplication",
        name: tSite("name"),
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: tSite("schemaDescription"),
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
          description: typedLocale === "fr" ? "Demande de démo" : "Demo request",
        },
      },
      {
        "@type": "WebSite",
        name: tSite("name"),
        url: `${SITE_URL}/${typedLocale}`,
        inLanguage: typedLocale,
      },
    ],
  };

  const heroFeaturesWithIcons = [
    { ...HERO_FEATURES[0], icon: Clock, title: tHero("buildingsScanned"), description: tHero("buildingsScannedDesc") },
    { ...HERO_FEATURES[1], icon: Target, title: tHero("higherCloseRate"), description: tHero("higherCloseRateDesc") },
    { ...HERO_FEATURES[2], icon: MapPin, title: tHero("capacityAnalyzed"), description: tHero("capacityAnalyzedDesc") },
  ];

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
      <main id="hero">
        <section id="benefices">
          <Hero45
            heading={tHero("headline")}
            description={tHero("subheadline")}
            buttonPrimary={{ text: tNav("requestDemo"), href: "/contact" }}
            statBadges={[
              ...STAT_BADGES,
              {
                label: tHero("simulationStatus"),
                data: [tHero("simulationOpenedAgo")],
                live: true,
              },
            ]}
            images={[
              {
                src: heroTopImg,
                alt: tSite("heroImageAlt"),
              },
            ]}
            features={heroFeaturesWithIcons}
          />
        </section>
      </main>
      <section id="avantages">
        <Feature166
          badge={tFeature("about")}
          description={tFeature("description")}
          feature1={{
            title: tFeature("commercialRoof"),
            description: tFeature("commercialRoofDesc"),
            illustration: "map",
            image: "/discover-map-view.png",
            imageAlt: tPipeline("searchTitle"),
            mapParcelLabel: tFeature("mapParcelSurface"),
            mapBuildingLabel: tFeature("mapBuildingSurface"),
            mapSites: [
              {
                logo: "/boulanger-logo.png",
                name: "Boulanger",
                parcelSurface: "4 520 m²",
                buildingSurface: "2 356 m²",
                selected: true,
              },
              {
                logo: "/burger-king-logo.png",
                name: "Burger King",
                parcelSurface: "3 100 m²",
                buildingSurface: "1 650 m²",
              },
              {
                logo: "/lidl-logo.png",
                name: "Lidl",
                parcelSurface: "2 840 m²",
                buildingSurface: "1 420 m²",
              },
            ],
          }}
          feature2={{
            title: tFeature("fasterQualification"),
            description: tFeature("fasterQualificationDesc"),
            kpi: tFeature("fasterQualificationKpiValue"),
            kpiSuffix: tFeature("fasterQualificationKpiSuffix"),
            kpiLabel: tFeature("fasterQualificationKpi"),
            qualificationTags: [
              tFeature("qualifyTagNaf"),
              tFeature("qualifyTagSurface"),
              tFeature("qualifyTagYear"),
              tFeature("qualifyTagZone"),
              tFeature("qualifyTagSiren"),
              tFeature("qualifyTagParking"),
            ],
          }}
          feature3={{
            title: tFeature("officialData"),
            description: tFeature("officialDataDesc"),
            illustration: "production-chart",
            simulationSiteName: tFeature("simulateSiteName"),
            simulationSiteAddress: tFeature("simulateSiteAddress"),
            simulationCards: [
              {
                label: tFeature("simulatePanelLabel"),
                reference: tFeature("simulatePanelRef"),
                image: "/panel.jpeg",
              },
              {
                label: tFeature("simulateBatteryLabel"),
                reference: tFeature("simulateBatteryRef"),
                image: "/battery.png",
              },
            ],
          }}
          feature4={{
            title: tFeature("smartMatching"),
            description: tFeature("smartMatchingDesc"),
            illustration: "follow-up-email",
            convinceEmail: {
              windowLabel: tFeature("convinceEmailWindowLabel"),
              to: tFeature("convinceEmailTo"),
              subject: tFeature("convinceEmailSubject"),
              greeting: tFeature("convinceEmailGreeting"),
              bodyBeforeLink: tFeature("convinceEmailBodyBefore"),
              link: tFeature("convinceEmailLink"),
              bodyAfterLink: tFeature("convinceEmailBodyAfter"),
              closing: tFeature("convinceEmailClosing"),
              sender: tFeature("convinceEmailSender"),
            },
          }}
        />
      </section>
      <section id="features">
        <SearchSection />
        <PipelineSection />
        <ProspectPortalSection />
      </section>
      <section id="contact-form">
        <LetsTalkSection />
      </section>
      <footer id="contact">
        <Footer2
          logo={{
            url: "#hero",
            src: BRAND.logoSrc,
            alt: tSite("name"),
            title: tSite("name"),
          }}
          tagline={tSite("footerTagline")}
          menuItems={[
            {
              title: tFooter("product"),
              links: [
                { text: tFooter("features"), url: "#avantages" },
                { text: tFooter("pricing"), url: "/contact" },
                { text: tFooter("requestDemo"), url: "/contact" },
              ],
            },
            {
              title: tFooter("company"),
              links: [
                { text: tFooter("about"), url: "#hero" },
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
