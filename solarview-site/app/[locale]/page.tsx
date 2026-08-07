import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Navbar1 } from "@/components/navbar1";
import { AgencyHero } from "@/components/agency-hero";
import { Logos18 } from "@/components/logos18";
import { ProcessSection } from "@/components/process-section";
import { MagicTextSection } from "@/components/magic-text-section";
import { UseCasesCarousel } from "@/components/use-cases-carousel";
import { LetsTalkSection } from "@/components/lets-talk-section";
import { PricingSection } from "@/components/pricing-section";
import { CaseStudiesSection } from "@/components/case-studies-section";
import { AgentUrlAnalyzerIllustration } from "@/components/agent-url-analyzer-illustration";
import { SolarCvDetectionIllustration } from "@/components/solar-cv-detection-illustration";
import { Footer2 } from "@/components/footer2";

import { BRAND } from "@/lib/constants";
import { buildFooterBottomLinks, buildFooterMenuItems } from "@/lib/footer-menu";
import {
  getUseCaseById,
  HOMEPAGE_USE_CASE_IDS,
} from "@/lib/industries";
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
  const tIndustries = await getTranslations({ locale: typedLocale, namespace: "industries" });
  const tArticles = await getTranslations({ locale: typedLocale, namespace: "articles" });
  const tFooter = await getTranslations({ locale: typedLocale, namespace: "footer" });

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
          { title: tNav("expertises"), url: "/industries" },
          { title: tArticles("nav"), url: "/articles" },
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
          cta={{ text: tAgency("process.cta"), href: "/contact" }}
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
          stackLabel={tAgency("useCases.stackLabel")}
          dialogCtaLabel={tAgency("useCases.dialogCta")}
          seeMore={{
            label: tAgency("useCases.seeMore"),
            href: "/industries?secteur=all",
          }}
          addCard={{
            title: tAgency("useCases.addTitle"),
            cta: tAgency("useCases.addCta"),
            href: "/contact",
          }}
          items={HOMEPAGE_USE_CASE_IDS.map((id, index) => {
            const meta = getUseCaseById(id)!;
            const variants = [
              "warm-sand",
              "periwinkle",
              "warm-sand",
              "teal-fog",
              "lime-mist",
              "periwinkle",
            ] as const;
            return {
              id,
              title: tIndustries(`cases.${id}.title`),
              description: tIndustries(`cases.${id}.description`),
              detail: tIndustries(`cases.${id}.detail`),
              stack: meta.stack,
              shape: "gallery" as const,
              galleryShapeId: meta.galleryShapeId,
              variant: variants[index],
              imageSrc: meta.imageSrc,
            };
          })}
        />
        <MagicTextSection text={tAgency("statement.text")} />
        <CaseStudiesSection
          heading={tAgency("caseStudies.heading")}
          description={tAgency("caseStudies.description")}
          items={[
            {
              client: tAgency("caseStudies.item1.client"),
              category: tAgency("caseStudies.item1.category"),
              imageSrc: "/case-studies/progenes.png",
              imageWidth: 1440,
              imageHeight: 900,
              href: "/case-studies/progenes",
            },
            {
              client: tAgency("caseStudies.item4.client"),
              category: tAgency("caseStudies.item4.category"),
              imageSrc: "/case-studies/haven-energy.png",
              imageWidth: 1440,
              imageHeight: 900,
              href: "/case-studies/haven-energy",
            },
            {
              client: tAgency("caseStudies.item5.client"),
              category: tAgency("caseStudies.item5.category"),
              imageSrc: "/case-studies/t1-energy.png",
              imageWidth: 1440,
              imageHeight: 900,
              href: "/case-studies/t1-energy",
            },
            {
              client: tAgency("caseStudies.item2.client"),
              category: tAgency("caseStudies.item2.category"),
              href: "/case-studies/articles-agent",
              illustration: (
                <AgentUrlAnalyzerIllustration
                  panelLabel={tAgency("caseStudies.item2.panelLabel")}
                  urls={[
                    {
                      url: "articles/loi-aper-2026",
                      status: "done",
                      statusLabel: tAgency("caseStudies.item2.urlStatusDone"),
                    },
                    {
                      url: "articles/prospection-solaire-b2b",
                      status: "done",
                      statusLabel: tAgency("caseStudies.item2.urlStatusDone"),
                    },
                    {
                      url: "articles/autoconsommation-pme",
                      status: "pending",
                      statusLabel: tAgency(
                        "caseStudies.item2.urlStatusPending",
                      ),
                    },
                  ]}
                />
              ),
            },
            {
              client: tAgency("caseStudies.item3.client"),
              category: tAgency("caseStudies.item3.category"),
              href: "/case-studies/solar-detection",
              illustration: (
                <SolarCvDetectionIllustration
                  detectionLabel={tAgency(
                    "caseStudies.item3.detectionLabel",
                  )}
                  confidenceLabel={tAgency(
                    "caseStudies.item3.confidenceLabel",
                  )}
                />
              ),
            },
            {
              client: tAgency("caseStudies.item6.client"),
              category: tAgency("caseStudies.item6.category"),
              href: "/contact",
            },
          ]}
        />
        <PricingSection
          heading={tAgency("pricing.heading")}
          offers={[
            {
              id: "offre-audit",
              name: tAgency("pricing.offer1Name"),
              tagline: (
                <>
                  {tAgency("pricing.offer1TaglineBefore")}
                  <span className="font-semibold text-muted-foreground">
                    {tAgency("pricing.offer1TaglineHighlight")}
                  </span>
                  {tAgency("pricing.offer1TaglineAfter")}
                </>
              ),
              price: tAgency("pricing.offer1Price"),
              priceLabel: tAgency("pricing.offer1PriceLabel"),
              features: [
                tAgency("pricing.offer1Feature1"),
                tAgency("pricing.offer1Feature2"),
                tAgency("pricing.offer1Feature3"),
                tAgency("pricing.offer1Feature4"),
                tAgency("pricing.offer1Feature5"),
                tAgency("pricing.offer1Feature6"),
              ],
              cta: tAgency("pricing.offer1Cta"),
            },
            {
              id: "offre-plateforme",
              name: tAgency("pricing.offer2Name"),
              tagline: tAgency("pricing.offer2Tagline"),
              price: tAgency("pricing.offer2Price"),
              priceLabel: tAgency("pricing.offer2PriceLabel"),
              features: [
                tAgency("pricing.offer2Feature1"),
                tAgency("pricing.offer2Feature2"),
                tAgency("pricing.offer2Feature3"),
                tAgency("pricing.offer2Feature4"),
                tAgency("pricing.offer2Feature5"),
                tAgency("pricing.offer2Feature6"),
              ],
              cta: tAgency("pricing.offer2Cta"),
              highlighted: true,
            },
          ]}
        />
        <LetsTalkSection />
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
