import type { JSX } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface CaseStudyItem {
  client: string;
  sector: string;
  challenge: string;
  result: string;
  metric: string;
}

export interface CaseStudiesSectionProps {
  heading: string;
  description?: string;
  items: CaseStudyItem[];
  className?: string;
}

export function CaseStudiesSection({
  heading,
  description,
  items,
  className,
}: CaseStudiesSectionProps): JSX.Element {
  return (
    <section
      className={cn("border-y border-border bg-card py-20 md:py-28", className)}
      id="case-studies"
      aria-labelledby="case-studies-heading"
    >
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-section" id="case-studies-heading">
            {heading}
          </h2>
          {description ? (
            <p className="mt-4 text-lg text-muted-foreground">{description}</p>
          ) : null}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
          {items.map((item) => (
            <article
              key={item.client}
              className="rounded-2xl bg-muted p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <Badge variant="outline">{item.sector}</Badge>
                <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {item.metric}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-semibold tracking-tight">
                {item.client}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {item.challenge}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                {item.result}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
