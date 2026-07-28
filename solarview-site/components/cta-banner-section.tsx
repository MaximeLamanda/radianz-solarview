import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface CtaBannerSectionProps {
  heading: string;
  description: string;
  cta: string;
  ctaHref: string;
  className?: string;
}

export function CtaBannerSection({
  heading,
  description,
  cta,
  ctaHref,
  className,
}: CtaBannerSectionProps) {
  return (
    <section className={cn("py-16 md:py-20", className)}>
      <div className="container">
        <div className="radianz-accent-card mx-auto max-w-4xl rounded-2xl px-8 py-12 text-center md:px-16 md:py-16">
          <h2 className="relative z-10 text-2xl font-semibold tracking-tight md:text-3xl">
            {heading}
          </h2>
          <p className="relative z-10 mx-auto mt-4 max-w-xl text-muted-foreground">{description}</p>
          <Button asChild variant="default" size="lg" className="relative z-10 mt-8">
            <Link href={ctaHref} className="inline-flex items-center gap-1.5">
              {cta}
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
