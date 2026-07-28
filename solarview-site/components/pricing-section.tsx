import { ArrowUpRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface PricingOffer {
  name: string;
  tagline: string;
  price: string;
  priceLabel: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

interface PricingSectionProps {
  heading: string;
  description: string;
  offers: PricingOffer[];
  className?: string;
}

export function PricingSection({
  heading,
  description,
  offers,
  className,
}: PricingSectionProps) {
  return (
    <section className={cn("py-20 md:py-28", className)} id="offres">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-section">{heading}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
          {offers.map((offer) => (
            <div
              key={offer.name}
              className={cn(
                "flex flex-col rounded-xl border p-8",
                offer.highlighted
                  ? "border-ink bg-ink text-white"
                  : "border-border bg-card",
              )}
            >
              <span
                className={cn(
                  "radianz-label",
                  offer.highlighted ? "text-white/60" : undefined,
                )}
              >
                {offer.name}
              </span>
              <h3 className="mt-3 text-xl font-semibold">{offer.tagline}</h3>
              <div className="mt-6">
                <span className="text-sm opacity-70">{offer.priceLabel}</span>
                <p className="font-mono text-4xl font-normal tracking-tight">{offer.price}</p>
              </div>
              <ul className="mt-8 flex-1 space-y-3">
                {offer.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        offer.highlighted ? "text-accent" : "text-emerald-600",
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={offer.highlighted ? "lime" : "outline"}
                size="lg"
                className="mt-8 w-full"
              >
                <Link href="/contact" className="inline-flex items-center gap-1.5">
                  {offer.cta}
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
