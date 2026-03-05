import Link from "next/link";

import { Navbar1 } from "@/components/navbar1";
import { Footer2 } from "@/components/footer2";
import { Button } from "@/components/ui/button";
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
      <main className="min-h-[70vh] py-16 md:py-24">
        <div className="container max-w-2xl">
          <div className="mx-auto rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 md:p-12">
            <h1 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
              Contacter un sales Radianz
            </h1>
            <p className="mb-8 text-muted-foreground">
              Remplissez le formulaire ci-dessous et un commercial Radianz vous
              recontactera sous 24h.
            </p>
            {params.success === "1" && (
              <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
                Votre demande a bien été envoyée. Un commercial Radianz vous
                recontactera sous 24h.
              </div>
            )}
            {(params.error === "config" || params.error === "send") && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
                Une erreur est survenue. Veuillez réessayer ou nous contacter
                directement par email.
              </div>
            )}
            <form
              id="contact-form"
              action="/api/contact"
              method="POST"
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Nom complet
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Jean Dupont"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-zinc-800"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Email professionnel
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jean@entreprise.com"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-zinc-800"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Société
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Votre entreprise"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-zinc-800"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Décrivez votre projet ou posez vos questions..."
                  className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-zinc-800"
                />
              </div>
              <Button type="submit" size="lg" className="w-full md:w-auto">
                Envoyer ma demande
              </Button>
            </form>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
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
