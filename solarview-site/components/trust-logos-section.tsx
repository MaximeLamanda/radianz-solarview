import { cn } from "@/lib/utils";

interface TrustLogosSectionProps {
  title: string;
  logos: { name: string }[];
  className?: string;
}

export function TrustLogosSection({ title, logos, className }: TrustLogosSectionProps) {
  return (
    <section className={cn("border-y border-border bg-card py-12 md:py-16", className)}>
      <div className="container">
        <p className="radianz-label mb-8 text-center">{title}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
          {logos.map((logo) => (
            <span
              key={logo.name}
              className="font-mono text-sm font-medium tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground md:text-base"
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
