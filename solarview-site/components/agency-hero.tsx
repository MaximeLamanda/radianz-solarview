import { ArrowUpRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { DotBirdFlight } from "@/components/dot-bird-flight";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface AgencyHeroProps {
  heading: string;
  description?: string;
  buttonPrimary: { text: string; href: string };
  buttonSecondary?: { text: string; href: string };
  logos?: ReactNode;
  className?: string;
}

export function AgencyHero({
  heading,
  description,
  buttonPrimary,
  buttonSecondary,
  logos,
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
      <div className="relative z-10 flex flex-col items-center pb-12 pt-10 md:pb-16 md:pt-14">
        <div className="container flex flex-col items-center">
          <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
            <DotBirdFlight
              size="140px"
              dotColor="#0a0a0a"
              fit="stage"
              blockSize={3}
            />
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

          {logos ? (
            <div className="mt-10 w-full max-w-5xl md:mt-12">{logos}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
