import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface ComparisonRow {
  label: string;
  radianz: string;
  traditional: string;
}

interface ComparisonSectionProps {
  heading: string;
  description: string;
  columnRadianz: string;
  columnTraditional: string;
  rows: ComparisonRow[];
  highlights: { title: string; description: string }[];
  className?: string;
}

export function ComparisonSection({
  heading,
  description,
  columnRadianz,
  columnTraditional,
  rows,
  highlights,
  className,
}: ComparisonSectionProps) {
  return (
    <section className={cn("border-y border-border bg-card py-20 md:py-28", className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-section">{heading}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-3 border-b border-border bg-muted/50">
            <div className="p-4 md:p-6" />
            <div className="border-x border-border p-4 text-center md:p-6">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                {columnRadianz}
              </span>
            </div>
            <div className="p-4 text-center md:p-6">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {columnTraditional}
              </span>
            </div>
          </div>
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-3 border-b border-border last:border-b-0">
              <div className="flex items-center p-4 md:p-6">
                <span className="text-sm font-medium">{row.label}</span>
              </div>
              <div className="flex items-start gap-2 border-x border-border bg-accent/20 p-4 md:p-6">
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                <span className="text-sm">{row.radianz}</span>
              </div>
              <div className="flex items-start gap-2 p-4 md:p-6">
                <X className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{row.traditional}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {highlights.map((highlight) => (
            <div key={highlight.title} className="rounded-xl border border-border bg-background p-6">
              <h3 className="font-semibold">{highlight.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
