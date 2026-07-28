import { cn } from "@/lib/utils";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface ProcessSectionProps {
  heading: string;
  description: string;
  steps: ProcessStep[];
  className?: string;
}

export function ProcessSection({
  heading,
  description,
  steps,
  className,
}: ProcessSectionProps) {
  return (
    <section className={cn("border-y border-border bg-card py-20 md:py-28", className)} id="process">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-section">{heading}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.step} className="relative flex flex-col">
              {index < steps.length - 1 ? (
                <div className="absolute top-6 left-[calc(50%+2rem)] hidden h-px w-[calc(100%-4rem)] bg-border md:block" />
              ) : null}
              <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {step.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
