import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { CaseStudyDetail } from "@/components/case-study-detail";
import { Footer2 } from "@/components/footer2";
import { Navbar1 } from "@/components/navbar1";
import { type Locale } from "@/i18n/config";
import {
  caseStudyHreflangAlternates,
  getAllCaseStudyPaths,
  getCaseStudyBySlug,
} from "@/lib/case-studies";
import { BRAND } from "@/lib/constants";
import { buildFooterBottomLinks, buildFooterMenuItems } from "@/lib/footer-menu";
import { SITE_URL, withSocialMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllCaseStudyPaths();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const study = getCaseStudyBySlug(typedLocale, slug);

  if (!study) {
    return {};
  }

  const canonicalPath = `/${typedLocale}/case-studies/${study.slug}`;

  return withSocialMetadata({
    title: study.title,
    description: study.excerpt,
    alternates: {
      canonical: canonicalPath,
      languages: caseStudyHreflangAlternates(study),
    },
    openGraph: {
      title: study.title,
      description: study.excerpt,
      type: "article",
      url: `${SITE_URL}${canonicalPath}`,
    },
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const study = getCaseStudyBySlug(typedLocale, slug);

  if (!study) {
    notFound();
  }

  const tSite = await getTranslations({ locale: typedLocale, namespace: "site" });
  const tNav = await getTranslations({ locale: typedLocale, namespace: "nav" });
  const tFooter = await getTranslations({ locale: typedLocale, namespace: "footer" });
  const tArticles = await getTranslations({ locale: typedLocale, namespace: "articles" });
  const tCase = await getTranslations({
    locale: typedLocale,
    namespace: "caseStudyPage",
  });
  const tAgency = await getTranslations({
    locale: typedLocale,
    namespace: "agency",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.excerpt,
    about: study.client,
    publisher: {
      "@type": "Organization",
      name: "RADIANZ",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/radianz-logo.svg`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/${typedLocale}/case-studies/${study.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar1
        logo={{
          url: "/",
          src: BRAND.logoSrc,
          alt: tSite("name"),
          title: tSite("name"),
        }}
        menu={[
          { title: tNav("services"), url: "/#services" },
          { title: tNav("expertises"), url: "/#resultats" },
          { title: tArticles("nav"), url: "/articles" },
        ]}
        auth={{
          login: { title: tNav("logIn"), url: "/contact" },
          signup: { title: tNav("requestDemo"), url: "/contact" },
        }}
      />
      <main>
        <CaseStudyDetail
          study={study}
          labels={{
            home: tCase("home"),
            caseStudies: tCase("caseStudies"),
            overview: tCase("overview"),
            sector: tCase("sector"),
            solution: tCase("solution"),
            learnMore: tCase("learnMore"),
            contactCta: tCase("contactCta"),
            visitSite: tCase("visitSite"),
            agentPanelLabel: tAgency("caseStudies.item2.panelLabel"),
            agentUrlDone: tAgency("caseStudies.item2.urlStatusDone"),
            agentUrlPending: tAgency("caseStudies.item2.urlStatusPending"),
            solarDetectionLabel: tAgency("caseStudies.item3.detectionLabel"),
            solarConfidenceLabel: tAgency("caseStudies.item3.confidenceLabel"),
          }}
        />
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
