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

export default async function ContactPage() {
  const tCommon = await getTranslations("common");
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
          { title: tNav("expertises"), url: "/#resultats" },
          { title: tArticles("nav"), url: "/articles" },
        ]}
        auth={{
          login: { title: tNav("logIn"), url: "#contact-form" },
          signup: { title: tNav("requestDemo"), url: "#contact-form" },
        }}
      />
      <main id="contact-form" className="min-h-[70vh]">
        <LetsTalkSection asPageTitle />
        <div className="container pb-16">
          <p className="text-center text-sm text-muted-foreground">
            <Link href="/" className="underline hover:text-foreground">
              ← {tCommon("backToHome")}
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
