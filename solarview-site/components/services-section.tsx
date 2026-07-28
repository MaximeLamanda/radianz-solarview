import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface Service {
  title: string;
  description: string;
}

interface ServicesSectionProps {
  badge: string;
  heading: string;
  description: string;
  services: Service[];
  cta: string;
  ctaHref: string;
  className?: string;
}

export function ServicesSection({
  badge,
  heading,
  description,
  services,
  cta,
  ctaHref,
  className,
}: ServicesSectionProps) {
  return (
    <section className={cn("py-20 md:py-28", className)} id="services">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="radianz-label mb-4 inline-block">{badge}</span>
          <h2 className="text-section">{heading}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md md:p-8"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
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
