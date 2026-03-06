import Link from "next/link";

import { Navbar1 } from "@/components/navbar1";
import { Footer2 } from "@/components/footer2";
import { LetsTalkSection } from "@/components/lets-talk-section";
import { SITE, NAV_LINKS, FOOTER } from "@/lib/constants";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <Navbar1
        logo={{
          url: "/",
          src: "/radianz-logo.png",
          alt: "RADIANZ",
          title: SITE.name,
        }}
        menu={NAV_LINKS.map((item) => ({
          title: item.title,
          url: item.url,
        }))}
        auth={{
          login: { title: "Log in", url: "#contact-form" },
          signup: { title: "Request a demo", url: "#contact-form" },
        }}
      />
      <main id="contact-form" className="min-h-[70vh]">
        <LetsTalkSection
          success={params.success === "1"}
          error={
            params.error === "config" || params.error === "send"
              ? (params.error as "config" | "send")
              : undefined
          }
        />
        <div className="container pb-16">
          <p className="text-center text-sm text-muted-foreground">
            <Link href="/" className="underline hover:text-foreground">
              ← Retour à l&apos;accueil
            </Link>
          </p>
        </div>
      </main>
      <footer>
        <Footer2
          logo={{
            url: "/",
            src: "/radianz-logo.png",
            alt: "RADIANZ",
            title: SITE.name,
          }}
          tagline={FOOTER.tagline}
          menuItems={FOOTER.menuItems.map((item) => ({
            title: item.title,
            links: [...item.links],
          }))}
          copyright={FOOTER.copyright}
          bottomLinks={[...FOOTER.bottomLinks]}
        />
      </footer>
    </>
  );
}
