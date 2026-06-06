"use client";

import { ArrowUpRight, Menu } from "lucide-react";
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
      className="rounded-sm px-1 py-1 font-mono text-xs text-white transition-colors hover:bg-white/10"
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
  const [open, setOpen] = React.useState(false);

  const closeMobileMenu = React.useCallback(() => setOpen(false), []);

  return (
    <div className={cn("sticky top-2 z-50 px-4 pt-2 sm:px-6", className)}>
      <header
        className={cn(
          "mx-auto w-full max-w-[var(--site-max-width)] rounded-md border-0 shadow-none",
          "bg-black text-white",
        )}
      >
        <nav className="flex items-center justify-between gap-3 p-2.5">
          <LogoLink logo={logo} />

          <div className="hidden items-center gap-0.5 lg:flex">
            {menu.map((item) => (
              <NavLink key={item.title} item={item} />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
            <div className="hidden lg:block">
              <AuthButton auth={auth} />
            </div>

            <Button
              size="icon"
              variant="outline"
              onClick={() => setOpen(true)}
              className="size-9 min-w-0 border-0 bg-white/10 text-white hover:bg-white/15 lg:hidden"
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
                  {menu.map((item) =>
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
