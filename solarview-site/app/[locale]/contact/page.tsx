import { BRAND } from "@/lib/constants";
import { buildFooterBottomLinks, buildFooterMenuItems } from "@/lib/footer-menu";
import { Navbar1 } from "@/components/navbar1";
import { Footer2 } from "@/components/footer2";
import { LetsTalkSection } from "@/components/lets-talk-section";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { type Locale } from "@/i18n/config";
import { hreflangAlternates, SITE_URL, withSocialMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "contact" });
  const canonicalPath = `/${typedLocale}/contact`;

  return withSocialMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: canonicalPath,
      languages: hreflangAlternates("/contact"),
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${SITE_URL}${canonicalPath}`,
      type: "website",
    },
  });
}

export default async function ContactPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const searchParamsResolved = await searchParams;
  const t = await getTranslations();
  const tSite = await getTranslations("site");
  const tNav = await getTranslations("nav");
  const tFeature = await getTranslations("feature");
  const tPipeline = await getTranslations("pipeline");
  const tArticles = await getTranslations("articles");
  const tContact = await getTranslations("contact");
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
          { title: tFeature("about"), url: "/#avantages" },
          { title: tPipeline("badge"), url: "/#features" },
          { title: tArticles("nav"), url: "/articles" },
          { title: tContact("badge"), url: "/contact" },
        ]}
        auth={{
          login: { title: tNav("logIn"), url: "#contact-form" },
          signup: { title: tNav("requestDemo"), url: "#contact-form" },
        }}
      />
      <main id="contact-form" className="min-h-[70vh]">
        <LetsTalkSection
          asPageTitle
          success={searchParamsResolved.success === "1"}
          error={
            searchParamsResolved.error === "config" || searchParamsResolved.error === "send"
              ? (searchParamsResolved.error as "config" | "send")
              : undefined
          }
          locale={resolvedParams.locale}
        />
        <div className="container pb-16">
          <p className="text-center text-sm text-muted-foreground">
            <Link href="/" className="underline hover:text-foreground">
              ← {t("common.backToHome")}
            </Link>
          </p>
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
