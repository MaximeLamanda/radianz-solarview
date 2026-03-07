import { Navbar1 } from "@/components/navbar1";
import { Footer2 } from "@/components/footer2";
import { LetsTalkSection } from "@/components/lets-talk-section";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

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
  const tContact = await getTranslations("contact");
  const tFooter = await getTranslations("footer");

  return (
    <>
      <Navbar1
        logo={{
          url: "/",
          src: "/radianz-logo.png",
          alt: tSite("name"),
          title: tSite("name"),
        }}
        menu={[
          { title: tFeature("about"), url: "/#avantages" },
          { title: tPipeline("badge"), url: "/#features" },
          { title: tContact("badge"), url: "/contact" },
        ]}
        auth={{
          login: { title: tNav("logIn"), url: "#contact-form" },
          signup: { title: tNav("requestDemo"), url: "#contact-form" },
        }}
      />
      <main id="contact-form" className="min-h-[70vh]">
        <LetsTalkSection
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
            src: "/radianz-logo.png",
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
            {
              title: tFooter("resources"),
              links: [
                { text: tFooter("legalNotice"), url: "#" },
                { text: tFooter("privacy"), url: "#" },
              ],
            },
          ]}
          copyright={tSite("copyright")}
          bottomLinks={[
            { text: tFooter("legalNotice"), url: "#" },
            { text: tFooter("privacyPolicy"), url: "#" },
          ]}
        />
      </footer>
    </>
  );
}
