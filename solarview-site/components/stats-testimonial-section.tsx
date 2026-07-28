import { cn } from "@/lib/utils";

interface StatsTestimonialSectionProps {
  heading: string;
  description: string;
  stats: { value: string; label: string; sublabel?: string }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  className?: string;
}

export function StatsTestimonialSection({
  heading,
  description,
  stats,
  testimonial,
  className,
}: StatsTestimonialSectionProps) {
  return (
    <section className={cn("py-20 md:py-28", className)} id="resultats">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-section">{heading}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{description}</p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span className="font-mono text-4xl font-normal tracking-tight lg:text-5xl">
                    {stat.value}
                  </span>
                  <p className="mt-2 font-semibold">{stat.label}</p>
                  {stat.sublabel ? (
                    <p className="mt-1 text-sm text-muted-foreground">{stat.sublabel}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <blockquote className="rounded-xl border border-border bg-card p-8 md:p-10">
              <p className="text-lg leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
              <footer className="mt-6 flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-accent font-mono text-sm font-semibold">
                  {testimonial.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
