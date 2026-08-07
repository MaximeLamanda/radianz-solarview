import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Footer2 } from "@/components/footer2";
import { Navbar1 } from "@/components/navbar1";
import { ServiceAuditPage } from "@/components/service-audit-page";
import { type Locale } from "@/i18n/config";
import { BRAND } from "@/lib/constants";
import { buildFooterBottomLinks, buildFooterMenuItems } from "@/lib/footer-menu";
import {
  buildFaqPageJsonLd,
  buildServiceJsonLd,
  type FaqItem,
  hreflangAlternates,
  SITE_URL,
  withSocialMetadata,
} from "@/lib/seo";
import { servicePath } from "@/lib/services";

type AuditProcessStep = { title: string; text: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getTranslations({
    locale: typedLocale,
    namespace: "servicesPages.audit",
  });
  const path = servicePath(typedLocale, "audit-ia");
  const canonicalPath = `/${typedLocale}${path}`;

  return withSocialMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: canonicalPath,
      languages: hreflangAlternates(path),
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${SITE_URL}${canonicalPath}`,
      type: "website",
    },
  });
}

export default async function AuditIaServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  const t = await getTranslations({
    locale: typedLocale,
    namespace: "servicesPages.audit",
  });
  const tSite = await getTranslations({ locale: typedLocale, namespace: "site" });
  const tNav = await getTranslations({ locale: typedLocale, namespace: "nav" });
  const tArticles = await getTranslations({
    locale: typedLocale,
    namespace: "articles",
  });
  const tFooter = await getTranslations({
    locale: typedLocale,
    namespace: "footer",
  });

  const path = servicePath(typedLocale, "audit-ia");
  const pageUrl = `${SITE_URL}/${typedLocale}${path}`;

  const faq = t.raw("faq") as FaqItem[];
  const forWho = t.raw("forWho") as string[];
  const process = t.raw("process") as AuditProcessStep[];
  const deliverables = t.raw("deliverables") as string[];

  const serviceJsonLd = buildServiceJsonLd({
    name: t("heading"),
    description: t("metaDescription"),
    url: pageUrl,
    providerName: tSite("name"),
  });
  const faqJsonLd = buildFaqPageJsonLd(faq);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
          { title: tNav("expertises"), url: "/industries" },
          { title: tArticles("nav"), url: "/articles" },
        ]}
        auth={{
          login: { title: tNav("logIn"), url: "/contact" },
          signup: { title: tNav("requestDemo"), url: "/contact" },
        }}
      />
      <main>
        <ServiceAuditPage
          badge={t("badge")}
          heading={t("heading")}
          description={t("description")}
          ctaPrimary={t("ctaPrimary")}
          forWhoTitle={t("forWhoTitle")}
          forWho={forWho}
          processTitle={t("processTitle")}
          process={process}
          deliverablesTitle={t("deliverablesTitle")}
          deliverables={deliverables}
          proofTitle={t("proofTitle")}
          proofDescription={t("proofDescription")}
          proofCta={t("proofCta")}
          faqTitle={t("faqTitle")}
          faq={faq}
          ctaTitle={t("ctaTitle")}
          ctaDescription={t("ctaDescription")}
          ctaButton={t("ctaButton")}
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
