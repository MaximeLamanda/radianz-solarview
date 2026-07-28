import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface PainPoint {
  amount: string;
  title: string;
  solution: string;
}

interface PainPointsSectionProps {
  heading: string;
  subheading: string;
  points: PainPoint[];
  cta: string;
  ctaHref: string;
  className?: string;
}

export function PainPointsSection({
  heading,
  subheading,
  points,
  cta,
  ctaHref,
  className,
}: PainPointsSectionProps) {
  return (
    <section className={cn("py-20 md:py-28", className)} id="problemes">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-section">{heading}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{subheading}</p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {points.map((point) => (
            <div
              key={point.title}
              className="radianz-accent-card flex flex-col rounded-xl p-6 md:p-8"
            >
              <span className="font-mono text-2xl font-semibold tracking-tight md:text-3xl">
                {point.amount}
              </span>
              <h3 className="relative z-10 mt-4 text-lg font-semibold">{point.title}</h3>
              <p className="relative z-10 mt-3 flex items-start gap-2 text-sm leading-relaxed">
                <ArrowRight className="relative z-10 mt-0.5 size-4 shrink-0" />
                {point.solution}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="lime" size="lg">
            <Link href={ctaHref}>{cta}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
