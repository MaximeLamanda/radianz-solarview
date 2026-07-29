import { ArrowUpRight } from "lucide-react";

import { ProcessTexturedShape } from "@/components/process-textured-shape";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  illustrationIndex?: number;
}

interface ProcessSectionProps {
  heading: string;
  steps: ProcessStep[];
  cta?: { text: string; href: string };
  className?: string;
}

export function ProcessSection({
  heading,
  steps,
  cta,
  className,
}: ProcessSectionProps) {
  return (
    <section
      className={cn("border-y border-border bg-card py-20 md:py-28", className)}
      id="process"
    >
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16 xl:gap-24">
          <div className="lg:sticky lg:top-28">
            <h2 className="max-w-md text-section text-balance">{heading}</h2>
            {cta ? (
              <Button
                asChild
                variant="lime"
                size="lg"
                className="mt-6 h-12 gap-1.5 rounded-md px-6 text-base font-mono font-medium normal-case tracking-normal"
              >
                <Link href={cta.href} className="inline-flex items-center gap-1.5">
                  {cta.text}
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            ) : null}
          </div>

          <div className="flex flex-col gap-4 md:gap-5">
            {steps.map((step, index) => (
              <article
                key={step.step}
                className="rounded-2xl bg-muted p-6 md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <ProcessTexturedShape
                    index={step.illustrationIndex ?? index}
                  />
                  <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {step.step}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
