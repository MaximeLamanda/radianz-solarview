import type { JSX, ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface CaseStudyItem {
  client: string;
  category?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  illustration?: ReactNode;
  href?: string;
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
      className={cn("bg-card py-20 md:py-28", className)}
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

        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {items.map((item, index) => (
            <article
              key={`${item.client}-${item.category ?? index}`}
              tabIndex={0}
              className={cn(
                "group relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-muted outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              {item.illustration ? (
                item.illustration
              ) : item.imageSrc ? (
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt ?? item.client}
                  width={item.imageWidth ?? 1024}
                  height={item.imageHeight ?? 530}
                  quality={100}
                  className="w-[72%] h-auto rounded-md transition-transform duration-500 ease-out group-hover:scale-110 group-focus-within:scale-110"
                  sizes="(max-width: 768px) 70vw, 320px"
                />
              ) : null}

              {item.category ? (
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 z-10 flex justify-start p-4 md:p-5",
                    "transition-transform duration-500 ease-out",
                    "translate-y-0",
                    "md:-translate-y-[calc(100%+0.5rem)] md:group-hover:translate-y-0 md:group-focus-within:translate-y-0",
                  )}
                >
                  <p className="rounded-lg bg-foreground/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-background backdrop-blur-sm md:text-xs">
                    {item.category}
                  </p>
                </div>
              ) : null}

              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-4 md:p-5",
                  "transition-transform duration-500 ease-out",
                  "translate-y-0",
                  "md:translate-y-[calc(100%+0.5rem)] md:group-hover:translate-y-0 md:group-focus-within:translate-y-0",
                )}
              >
                <h3 className="min-w-0 rounded-xl bg-foreground/55 px-3.5 py-2 text-sm font-semibold tracking-tight text-background backdrop-blur-sm md:text-base">
                  {item.client}
                </h3>

                <Link
                  href={item.href ?? "/contact"}
                  aria-label={item.client}
                  className={cn(
                    "inline-flex size-10 shrink-0 items-center justify-center rounded-xl",
                    "bg-foreground/55 text-background backdrop-blur-sm",
                    "transition-colors hover:bg-foreground/70",
                  )}
                >
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
