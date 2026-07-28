import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import {
  HeroMediaCollageDesktop,
  HeroMediaCollageMobile,
  type HeroMediaSlot,
} from "@/components/hero-media-collage";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type { HeroMediaSlot };

const SLOT_SIZE = "h-28 w-28 lg:h-32 lg:w-32 xl:h-36 xl:w-36";

/**
 * Placement type Invisible : images proches du texte, léger overlap en haut.
 */
const DEFAULT_SLOTS: HeroMediaSlot[] = [
  {
    id: "1",
    label: "Image 1",
    desktopClassName: `absolute left-[3%] top-[22%] ${SLOT_SIZE} lg:left-[4%] lg:top-[20%] xl:left-[5%]`,
  },
  {
    id: "2",
    label: "Image 2",
    desktopClassName: `absolute left-1/2 top-[22%] z-[1] -translate-x-1/2 ${SLOT_SIZE} lg:top-[20%] xl:top-[18%]`,
  },
  {
    id: "3",
    label: "Image 3",
    desktopClassName: `absolute right-[3%] top-[38%] ${SLOT_SIZE} lg:right-[4%] lg:top-[40%] xl:right-[5%]`,
  },
  {
    id: "4",
    label: "Image 4",
    desktopClassName: `absolute left-[3%] top-[58%] ${SLOT_SIZE} lg:left-[4%] lg:top-[56%] xl:left-[5%]`,
  },
  {
    id: "5",
    label: "Image 5",
    desktopClassName: `absolute bottom-[5%] left-1/2 -translate-x-1/2 ${SLOT_SIZE} lg:bottom-[6%] xl:bottom-[7%]`,
  },
  {
    id: "6",
    label: "Image 6",
    desktopClassName: `absolute right-[3%] top-[58%] ${SLOT_SIZE} lg:right-[4%] lg:top-[56%] xl:right-[5%]`,
  },
];

interface AgencyHeroProps {
  heading: string;
  description?: string;
  buttonPrimary: { text: string; href: string };
  buttonSecondary?: { text: string; href: string };
  slots?: HeroMediaSlot[];
  className?: string;
}

export function AgencyHero({
  heading,
  description,
  buttonPrimary,
  buttonSecondary,
  slots = DEFAULT_SLOTS,
  className,
}: AgencyHeroProps) {
  return (
    <section
      className={cn(
        "hero-dot-grid relative -mt-[var(--hero-nav-offset)] overflow-x-clip pt-[var(--hero-nav-offset)]",
        className,
      )}
      style={{ "--hero-nav-offset": "4.75rem" } as CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        aria-hidden
      >
        <HeroMediaCollageDesktop slots={slots} />
      </div>

      {/* Centre vertical dans la zone visible sous la navbar */}
      <div className="relative z-10 flex min-h-[calc(100svh-var(--hero-nav-offset))] flex-col items-center justify-center pb-12 md:pb-16">
        <div className="container flex flex-col items-center">
          <div className="mb-8 w-full md:hidden">
            <HeroMediaCollageMobile slots={slots} />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-6 text-center">
            <h1 className="w-full text-center text-3xl leading-[1.12] font-normal tracking-[-0.03em] text-balance md:text-5xl md:leading-tight lg:text-6xl">
              {heading}
            </h1>
            {description ? (
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
                {description}
              </p>
            ) : null}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {buttonSecondary ? (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 min-w-[160px] gap-1.5 rounded-md bg-card/90 px-6 text-base font-mono font-medium normal-case tracking-normal backdrop-blur-sm"
                >
                  <Link href={buttonSecondary.href}>{buttonSecondary.text}</Link>
                </Button>
              ) : null}
              <Button
                asChild
                variant="lime"
                size="lg"
                className="h-12 min-w-[160px] gap-1.5 rounded-md px-6 text-base font-mono font-medium normal-case tracking-normal"
              >
                <Link href={buttonPrimary.href} className="inline-flex items-center gap-1.5">
                  {buttonPrimary.text}
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
