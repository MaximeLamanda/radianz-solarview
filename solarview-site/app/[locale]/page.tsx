import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Navbar1 } from "@/components/navbar1";
import { AgencyHero } from "@/components/agency-hero";
import { TrustLogosSection } from "@/components/trust-logos-section";
import { PainPointsSection } from "@/components/pain-points-section";
import { ServicesSection } from "@/components/services-section";
import { StatsTestimonialSection } from "@/components/stats-testimonial-section";
import { ComparisonSection } from "@/components/comparison-section";
import { PricingSection } from "@/components/pricing-section";
import { ProcessSection } from "@/components/process-section";
import { FaqSection } from "@/components/faq-section";
import { CtaBannerSection } from "@/components/cta-banner-section";
import { LetsTalkSection } from "@/components/lets-talk-section";
import { Footer2 } from "@/components/footer2";

import { BRAND } from "@/lib/constants";
import { buildFooterBottomLinks, buildFooterMenuItems } from "@/lib/footer-menu";
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
          buttonSecondary={{ text: tAgency("hero.ctaSecondary"), href: "/#services" }}
        />
      </main>

      <TrustLogosSection
        title={tAgency("trust.title")}
        logos={[
          { name: tAgency("logos.logo1") },
          { name: tAgency("logos.logo2") },
          { name: tAgency("logos.logo3") },
          { name: tAgency("logos.logo4") },
          { name: tAgency("logos.logo5") },
          { name: tAgency("logos.logo6") },
          { name: tAgency("logos.logo7") },
          { name: tAgency("logos.logo8") },
        ]}
      />

      <PainPointsSection
        heading={tAgency("pain.heading")}
        subheading={tAgency("pain.subheading")}
        points={[
          {
            amount: tAgency("pain.point1Amount"),
            title: tAgency("pain.point1Title"),
            solution: tAgency("pain.point1Solution"),
          },
          {
            amount: tAgency("pain.point2Amount"),
            title: tAgency("pain.point2Title"),
            solution: tAgency("pain.point2Solution"),
          },
          {
            amount: tAgency("pain.point3Amount"),
            title: tAgency("pain.point3Title"),
            solution: tAgency("pain.point3Solution"),
          },
        ]}
        cta={tAgency("pain.cta")}
        ctaHref="/contact"
      />

      <ServicesSection
        badge={tAgency("services.badge")}
        heading={tAgency("services.heading")}
        description={tAgency("services.description")}
        services={[
          { title: tAgency("services.service1Title"), description: tAgency("services.service1Desc") },
          { title: tAgency("services.service2Title"), description: tAgency("services.service2Desc") },
          { title: tAgency("services.service3Title"), description: tAgency("services.service3Desc") },
        ]}
        cta={tAgency("services.cta")}
        ctaHref="/contact"
      />

      <StatsTestimonialSection
        heading={tAgency("stats.heading")}
        description={tAgency("stats.description")}
        stats={[
          {
            value: tAgency("stats.stat1Value"),
            label: tAgency("stats.stat1Label"),
            sublabel: tAgency("stats.stat1Sublabel"),
          },
          {
            value: tAgency("stats.stat2Value"),
            label: tAgency("stats.stat2Label"),
            sublabel: tAgency("stats.stat2Sublabel"),
          },
        ]}
        testimonial={{
          quote: tAgency("stats.quote"),
          author: tAgency("stats.author"),
          role: tAgency("stats.role"),
          company: tAgency("stats.company"),
        }}
      />

      <ComparisonSection
        heading={tAgency("comparison.heading")}
        description={tAgency("comparison.description")}
        columnRadianz={tAgency("comparison.columnRadianz")}
        columnTraditional={tAgency("comparison.columnTraditional")}
        rows={[
          {
            label: tAgency("comparison.row1Label"),
            radianz: tAgency("comparison.row1Radianz"),
            traditional: tAgency("comparison.row1Traditional"),
          },
          {
            label: tAgency("comparison.row2Label"),
            radianz: tAgency("comparison.row2Radianz"),
            traditional: tAgency("comparison.row2Traditional"),
          },
          {
            label: tAgency("comparison.row3Label"),
            radianz: tAgency("comparison.row3Radianz"),
            traditional: tAgency("comparison.row3Traditional"),
          },
          {
            label: tAgency("comparison.row4Label"),
            radianz: tAgency("comparison.row4Radianz"),
            traditional: tAgency("comparison.row4Traditional"),
          },
          {
            label: tAgency("comparison.row5Label"),
            radianz: tAgency("comparison.row5Radianz"),
            traditional: tAgency("comparison.row5Traditional"),
          },
          {
            label: tAgency("comparison.row6Label"),
            radianz: tAgency("comparison.row6Radianz"),
            traditional: tAgency("comparison.row6Traditional"),
          },
        ]}
        highlights={[
          {
            title: tAgency("comparison.highlight1Title"),
            description: tAgency("comparison.highlight1Desc"),
          },
          {
            title: tAgency("comparison.highlight2Title"),
            description: tAgency("comparison.highlight2Desc"),
          },
          {
            title: tAgency("comparison.highlight3Title"),
            description: tAgency("comparison.highlight3Desc"),
          },
        ]}
      />

      <PricingSection
        heading={tAgency("pricing.heading")}
        description={tAgency("pricing.description")}
        offers={[
          {
            name: tAgency("pricing.offer1Name"),
            tagline: tAgency("pricing.offer1Tagline"),
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

      <ProcessSection
        heading={tAgency("process.heading")}
        description={tAgency("process.description")}
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

      <FaqSection
        heading={tAgency("faq.heading")}
        items={[
          { question: tAgency("faq.q1"), answer: tAgency("faq.a1") },
          { question: tAgency("faq.q2"), answer: tAgency("faq.a2") },
          { question: tAgency("faq.q3"), answer: tAgency("faq.a3") },
          { question: tAgency("faq.q4"), answer: tAgency("faq.a4") },
          { question: tAgency("faq.q5"), answer: tAgency("faq.a5") },
        ]}
      />

      <CtaBannerSection
        heading={tAgency("cta.heading")}
        description={tAgency("cta.description")}
        cta={tAgency("cta.cta")}
        ctaHref="/contact"
      />

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
          menuItems={buildFooterMenuItems(tFooter)}
          copyright={tSite("copyright")}
          bottomLinks={buildFooterBottomLinks(tFooter)}
        />
      </footer>
    </>
  );
}
