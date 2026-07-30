import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { DotEyeBlink } from "@/components/dot-eye-blink";
import { DotGlobeSpin } from "@/components/dot-globe-spin";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** Shared icon box — keeps both pricing cards aligned. */
const OFFER_ICON_SIZE = "90px";

interface PricingOffer {
  name: string;
  tagline: ReactNode;
  price: string;
  priceLabel: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  id?: string;
}

interface PricingSectionProps {
  heading: string;
  offers: PricingOffer[];
  className?: string;
}

export function PricingSection({
  heading,
  offers,
  className,
}: PricingSectionProps) {
  return (
    <section className={cn("bg-white py-20 md:py-28", className)} id="offres">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-section">{heading}</h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
          {offers.map((offer) => (
            <div
              key={offer.name}
              id={offer.id}
              className={cn(
                "flex flex-col rounded-xl border p-3 md:p-4 scroll-mt-24",
                offer.highlighted
                  ? "border-ink bg-ink text-white"
                  : "border-border bg-muted",
              )}
            >
              <div
                className={cn(
                  "rounded-lg p-5 md:p-6",
                  offer.highlighted ? "bg-white/10" : "bg-white",
                )}
              >
                {offer.highlighted ? (
                  <DotGlobeSpin
                    label={offer.name}
                    size={OFFER_ICON_SIZE}
                    cellSize={6}
                    dotColor="rgba(255,255,255,0.55)"
                  />
                ) : (
                  <DotEyeBlink
                    label={offer.name}
                    size={OFFER_ICON_SIZE}
                    cellSize={6}
                    dotColor="rgba(10,10,10,0.45)"
                  />
                )}
                <h3 className="mt-6 text-xl font-semibold leading-snug tracking-tight md:mt-7 md:text-2xl">
                  {offer.tagline}
                </h3>
                <div className="mt-7 mb-1">
                  <span className="text-sm opacity-70">{offer.priceLabel}</span>
                  <p className="font-mono text-2xl font-normal tracking-tight md:text-3xl">
                    {offer.price}
                  </p>
                </div>
                <Button
                  asChild
                  variant={offer.highlighted ? "lime" : "default"}
                  size="lg"
                  className="mt-6 w-full"
                >
                  <Link href="/contact" className="inline-flex items-center gap-1.5">
                    {offer.cta}
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>
              <ul className="mt-4 flex-1 space-y-2.5 px-2 py-3 md:px-3 md:py-4">
                {offer.features.map((feature) => (
                  <li
                    key={feature}
                    className={cn(
                      "flex items-start gap-2 text-sm",
                      offer.highlighted ? "text-white/80" : "text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1.5 size-1.5 shrink-0 rounded-full",
                        offer.highlighted ? "bg-white/40" : "bg-muted-foreground/50",
                      )}
                      aria-hidden
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
