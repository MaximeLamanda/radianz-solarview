"use client";

import { ArrowUpRight, Book, Menu, Sunset, Trees, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Link } from "@/i18n/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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

const Navbar1 = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  menu = [
    { title: "Home", url: "#" },
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "Blog",
          description: "The latest industry news, updates, and info",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Company",
          description: "Our mission is to innovate and empower the world",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Careers",
          description: "Browse job listing and discover our workspace",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Support",
          description:
            "Get in touch with our support team or visit our community forums",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "Help Center",
          description: "Get all the answers you need right here",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Contact Us",
          description: "We are here to help you with any questions you have",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Status",
          description: "Check the current status of our services and APIs",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Terms of Service",
          description: "Our terms and conditions for using our services",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Pricing",
      url: "#",
    },
    {
      title: "Blog",
      url: "#",
    },
  ],
  auth = {
    login: { title: "Login", url: "#" },
    signup: { title: "Sign up", url: "#" },
  },
  className,
}: Navbar1Props) => {
  return (
    <section className={cn("py-4", className)}>
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-4">
          {/* Logo - left */}
          {logo.url.startsWith("http") ? (
            <a href={logo.url} className="flex items-center gap-2 justify-self-start">
              <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
              <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
            </a>
          ) : (
            <Link href={logo.url === "#hero" || logo.url === "/" ? "/" : logo.url} className="flex items-center gap-2 justify-self-start">
              <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
              <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
            </Link>
          )}
          {/* Nav links - center */}
          <div className="flex justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          {/* CTA - right */}
          <div className="flex items-center justify-end gap-3">
            <LanguageSwitcher />
            <Button asChild size="sm" className="gap-1.5">
              {auth.signup.url.startsWith("http") ? (
                <a href={auth.signup.url} className="inline-flex items-center gap-1.5">
                  {auth.signup.title}
                  <ArrowUpRight className="size-4" />
                </a>
              ) : (
                <Link href={auth.signup.url.startsWith("#") ? `/contact${auth.signup.url}` : auth.signup.url} className="inline-flex items-center gap-1.5">
                  {auth.signup.title}
                  <ArrowUpRight className="size-4" />
                </Link>
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            {logo.url.startsWith("http") ? (
              <a href={logo.url} className="flex items-center gap-2">
                <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
              </a>
            ) : (
              <Link href={logo.url === "#hero" || logo.url === "/" ? "/" : logo.url} className="flex items-center gap-2">
                <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
              </Link>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="size-11 min-w-11 shrink-0">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    {logo.url.startsWith("http") ? (
                      <a href={logo.url} className="flex items-center gap-2">
                        <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
                      </a>
                    ) : (
                      <Link href={logo.url === "#hero" || logo.url === "/" ? "/" : logo.url} className="flex items-center gap-2">
                        <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
                      </Link>
                    )}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <LanguageSwitcher />
                    <Button asChild className="gap-1.5">
                      {auth.signup.url.startsWith("http") ? (
                        <a href={auth.signup.url} className="inline-flex items-center gap-1.5">
                          {auth.signup.title}
                          <ArrowUpRight className="size-4" />
                        </a>
                      ) : (
                        <Link href={auth.signup.url.startsWith("#") ? `/contact${auth.signup.url}` : auth.signup.url} className="inline-flex items-center gap-1.5">
                          {auth.signup.title}
                          <ArrowUpRight className="size-4" />
                        </Link>
                      )}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  const isExternal = item.url.startsWith("http");
  const linkClass = "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground";
  return (
    <NavigationMenuItem key={item.title}>
      {isExternal ? (
        <NavigationMenuLink href={item.url} className={linkClass}>
          {item.title}
        </NavigationMenuLink>
      ) : (
        <NavigationMenuLink asChild>
          <Link href={item.url} className={linkClass}>
            {item.title}
          </Link>
        </NavigationMenuLink>
      )}
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  const isExternal = item.url.startsWith("http");
  if (isExternal) {
    return (
      <a key={item.title} href={item.url} className="text-md font-semibold">
        {item.title}
      </a>
    );
  }
  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  const className = "flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground";
  if (item.url.startsWith("http")) {
    return (
      <a className={className} href={item.url}>
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
    );
  }
  return (
    <Link
      className={className}
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar1 };
