"use client";

import { ArrowUpRight, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

import { BrandLogo } from "@/components/brand-logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

const SECTOR_KEYS = [
  "industrie",
  "finance",
  "saas",
  "energie",
  "immobilier",
  "retail",
] as const;

const SECTOR_MENU_URLS = new Set(["/industries"]);

function isSectorsMenuUrl(url: string): boolean {
  return SECTOR_MENU_URLS.has(url);
}

/** Données mock temporairement — à remplacer par le contenu réel / i18n. */
const MOCK_DROPDOWNS: Record<string, MenuItem[]> = {
  "/#services": [
    {
      title: "Audit IA",
      url: "/#offre-audit",
      description:
        "Identifier les opportunités IA et définir une roadmap actionnable.",
    },
    {
      title: "Plateforme web & IA",
      url: "/#offre-plateforme",
      description:
        "Agents, workflows et plateformes sur mesure, production-ready.",
    },
    {
      title: "Accompagnement IA",
      url: "/#services",
      description:
        "Intégrer l'IA dans vos équipes et industrialiser les usages.",
    },
    {
      title: "Automatisation",
      url: "/#services",
      description:
        "Connecter vos outils et supprimer les tâches manuelles à faible valeur.",
    },
  ],
};

const navTriggerClass = cn(
  navigationMenuTriggerStyle(),
  "h-auto flex-row gap-0 bg-transparent px-3 py-1.5 text-xs font-mono font-medium normal-case tracking-normal text-white shadow-none",
  // Gris — override du hover accent/lime du primitif
  "hover:!bg-zinc-800 hover:!text-white focus:!bg-zinc-800 focus:!text-white",
  "focus-visible:ring-zinc-600 data-[state=open]:!bg-zinc-800 data-[state=open]:!text-white",
  "data-[active=true]:!bg-zinc-800 data-[active=true]:!text-white",
);

const listItemHoverClass = cn(
  "block rounded-md p-3 no-underline outline-hidden transition-colors",
  "hover:!bg-zinc-800 hover:!text-white focus:!bg-zinc-800 focus:!text-white",
  "data-[active=true]:!bg-zinc-800 data-[active=true]:!text-white",
);

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; title: string }) {
  const content = (
    <>
      <div className="text-sm leading-none font-medium text-white">{title}</div>
      {children ? (
        <p className="mt-1 line-clamp-2 text-sm leading-snug text-white/60">{children}</p>
      ) : null}
    </>
  );

  return (
    <li {...props}>
      {href.startsWith("http") ? (
        <NavigationMenuLink asChild className={listItemHoverClass}>
          <a href={href}>{content}</a>
        </NavigationMenuLink>
      ) : (
        <NavigationMenuLink asChild className={listItemHoverClass}>
          <Link href={href}>{content}</Link>
        </NavigationMenuLink>
      )}
    </li>
  );
}

function FeaturedBlock({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  const className = cn(
    "group relative flex h-full min-h-[220px] w-full flex-col justify-end overflow-hidden rounded-md p-6 no-underline outline-hidden select-none",
    "transition-colors focus:shadow-md",
  );

  const body = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- mesh décoratif plein cadre */}
      <img
        src="/use-cases/mesh-roi.png"
        alt=""
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/75 via-black/35 to-transparent"
        aria-hidden
      />
      <span
        className="absolute top-4 right-4 z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-transparent text-white transition-colors duration-200 group-hover:border-white/60"
        aria-hidden
      >
        <ArrowUpRight className="size-4 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
      <div className="relative z-10">
        <div className="mb-2 text-lg font-medium text-white">{title}</div>
        <p className="text-sm leading-tight text-white/70">{description}</p>
      </div>
    </>
  );

  return (
    <li className="row-span-3">
      {href.startsWith("http") ? (
        <NavigationMenuLink asChild className={className}>
          <a href={href}>{body}</a>
        </NavigationMenuLink>
      ) : (
        <NavigationMenuLink asChild className={className}>
          <Link href={href}>{body}</Link>
        </NavigationMenuLink>
      )}
    </li>
  );
}

function DropdownPanel({
  item,
  featuredCases,
}: {
  item: MenuItem;
  featuredCases: { title: string; description: string };
}) {
  const links = item.items ?? [];
  const isServices = item.url === "/#services";
  const isSectors = isSectorsMenuUrl(item.url);

  if (isServices) {
    return (
      <ul className="grid min-w-[400px] grid-cols-[0.75fr_1fr] gap-2 p-2 md:min-w-[500px]">
        <FeaturedBlock
          href="/#case-studies"
          title={featuredCases.title}
          description={featuredCases.description}
        />
        {links.slice(0, 3).map((subItem) => (
          <ListItem key={subItem.title} title={subItem.title} href={subItem.url}>
            {subItem.description}
          </ListItem>
        ))}
      </ul>
    );
  }

  if (isSectors) {
    return (
      <ul className="grid w-[400px] grid-cols-2 gap-2 p-2 md:w-[500px]">
        {links.map((subItem) => (
          <ListItem key={subItem.title} title={subItem.title} href={subItem.url}>
            {subItem.description}
          </ListItem>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-2">
      {links.map((subItem) => (
        <ListItem key={subItem.title} title={subItem.title} href={subItem.url}>
          {subItem.description}
        </ListItem>
      ))}
    </ul>
  );
}

function enrichMenu(menu: MenuItem[], sectors: MenuItem[]): MenuItem[] {
  return menu.map((item) => ({
    ...item,
    items:
      item.items ??
      (isSectorsMenuUrl(item.url) ? sectors : MOCK_DROPDOWNS[item.url]),
  }));
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

function resolveLogoHref(url: string) {
  if (url === "#hero" || url === "/") return "/";
  return url;
}

function resolveAuthHref(url: string) {
  if (url.startsWith("http")) return url;
  if (url.startsWith("#")) return `/contact${url}`;
  return url;
}

function LogoLink({
  logo,
  showWordmark = true,
}: {
  logo: NonNullable<Navbar1Props["logo"]>;
  showWordmark?: boolean;
}) {
  const content = (
    <BrandLogo
      wordmark={logo.title}
      showWordmark={showWordmark}
      markClassName="h-[18px] brightness-0 invert"
      wordmarkClassName="text-sm sm:text-base"
      className="rounded-sm px-1 py-1 text-white transition-colors hover:bg-white/10"
    />
  );

  if (logo.url.startsWith("http")) {
    return (
      <a href={logo.url} className="shrink-0">
        {content}
      </a>
    );
  }

  return (
    <Link href={resolveLogoHref(logo.url)} className="shrink-0">
      {content}
    </Link>
  );
}

function NavLink({
  item,
  className,
  onNavigate,
}: {
  item: MenuItem;
  className?: string;
  onNavigate?: () => void;
}) {
  const linkClass = cn(
    buttonVariants({ variant: "ghost", size: "fit" }),
    "text-xs font-mono font-medium normal-case tracking-normal text-white hover:bg-white/10",
    className,
  );

  if (item.url.startsWith("http")) {
    return (
      <a href={item.url} className={linkClass} onClick={onNavigate}>
        {item.title}
      </a>
    );
  }

  return (
    <Link href={item.url} className={linkClass} onClick={onNavigate}>
      {item.title}
    </Link>
  );
}

function AuthButton({
  auth,
  variant = "white",
  className,
  onNavigate,
}: {
  auth: NonNullable<Navbar1Props["auth"]>;
  variant?: "white" | "lime" | "outline";
  className?: string;
  onNavigate?: () => void;
}) {
  const href = resolveAuthHref(auth.signup.url);
  const content = (
    <>
      {auth.signup.title}
      <ArrowUpRight className="size-3.5" />
    </>
  );

  return (
    <Button
      asChild
      variant={variant}
      size="fit"
      className={cn(
        "gap-1 text-xs font-mono font-medium normal-case tracking-normal",
        className,
      )}
    >
      {href.startsWith("http") ? (
        <a href={href} className="inline-flex items-center gap-1.5" onClick={onNavigate}>
          {content}
        </a>
      ) : (
        <Link href={href} className="inline-flex items-center gap-1.5" onClick={onNavigate}>
          {content}
        </Link>
      )}
    </Button>
  );
}

const SCROLL_COMPACT_THRESHOLD = 24;

const Navbar1 = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  menu = [],
  auth = {
    login: { title: "Login", url: "#" },
    signup: { title: "Sign up", url: "#" },
  },
  className,
}: Navbar1Props) => {
  const tNav = useTranslations("nav");
  const [open, setOpen] = React.useState(false);
  const [compact, setCompact] = React.useState(false);
  const sectors = React.useMemo(
    () =>
      SECTOR_KEYS.map((key) => ({
        title: tNav(`sectors.${key}.title`),
        description: tNav(`sectors.${key}.description`),
        url: `/industries?secteur=${key}`,
      })),
    [tNav],
  );
  const featuredCases = React.useMemo(
    () => ({
      title: tNav("featuredCases.title"),
      description: tNav("featuredCases.description"),
    }),
    [tNav],
  );
  const enrichedMenu = enrichMenu(menu, sectors);

  const closeMobileMenu = React.useCallback(() => setOpen(false), []);

  React.useEffect(() => {
    let rafId = 0;

    const applyScrollPosition = () => {
      rafId = 0;
      // Déployée uniquement en haut ; compacte dès qu'on a scrollé
      setCompact(window.scrollY > SCROLL_COMPACT_THRESHOLD);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(applyScrollPosition);
    };

    applyScrollPosition();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={cn("sticky top-2 z-50 px-4 pt-2 sm:px-6", className)}>
      <header
        className={cn(
          "relative mx-auto w-full overflow-visible rounded-md border-0 shadow-none",
          "bg-black text-white",
          "transition-[max-width] duration-300 ease-out",
          compact ? "max-w-3xl" : "max-w-[var(--site-max-width)]",
        )}
      >
        <nav className="relative flex items-center justify-between gap-3 overflow-visible p-2.5">
          <div className="relative z-10 shrink-0">
            <LogoLink logo={logo} />
          </div>

          <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <NavigationMenu
              className="max-w-none"
              viewportClassName="mt-5 border-white/10 bg-zinc-950 text-white shadow-lg"
            >
              <NavigationMenuList className="gap-0.5">
                {enrichedMenu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.items && item.items.length > 0 ? (
                      <>
                        <NavigationMenuTrigger className={navTriggerClass}>
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <DropdownPanel item={item} featuredCases={featuredCases} />
                        </NavigationMenuContent>
                      </>
                    ) : item.url.startsWith("http") ? (
                      <NavigationMenuLink asChild className={navTriggerClass}>
                        <a href={item.url}>{item.title}</a>
                      </NavigationMenuLink>
                    ) : (
                      <NavigationMenuLink asChild className={navTriggerClass}>
                        <Link href={item.url}>{item.title}</Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="relative z-10 flex items-center gap-2">
            {!compact ? (
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>
            ) : null}
            <div className="hidden md:block">
              <AuthButton auth={auth} />
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => setOpen(true)}
              className="size-9 min-w-0 text-white hover:bg-white/15 hover:text-white md:hidden"
              aria-label="Menu"
            >
              <Menu className="size-4" />
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetContent
                side="left"
                showCloseButton={false}
                className="gap-0 border-0 bg-black text-white"
              >
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex items-center border-b border-white/10 px-4 py-4">
                  <LogoLink logo={logo} showWordmark={false} />
                </div>

                <div className="flex flex-col gap-1 overflow-y-auto px-3 py-4">
                  {enrichedMenu.map((item) =>
                    item.items ? (
                      <Accordion
                        key={item.title}
                        type="single"
                        collapsible
                        className="w-full"
                      >
                        <AccordionItem value={item.title} className="border-none">
                          <AccordionTrigger className="rounded-md px-3 py-2 font-mono text-sm font-medium text-white hover:bg-white/10 hover:no-underline">
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent className="pb-1 pl-3">
                            {item.items.map((subItem) => (
                              <NavLink
                                key={subItem.title}
                                item={subItem}
                                className="w-full justify-start"
                                onNavigate={closeMobileMenu}
                              />
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <NavLink
                        key={item.title}
                        item={item}
                        className="w-full justify-start"
                        onNavigate={closeMobileMenu}
                      />
                    ),
                  )}
                </div>

                <SheetFooter className="border-t border-white/10 bg-black">
                  <LanguageSwitcher />
                  <AuthButton auth={auth} className="w-full" onNavigate={closeMobileMenu} />
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </div>
  );
};

export { Navbar1 };
