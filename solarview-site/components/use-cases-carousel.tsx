"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export type UseCaseShape =
  | "circle"
  | "hexagon"
  | "diamond"
  | "rounded-square"
  | "triangle"
  | "ring";

export interface UseCaseItem {
  title: string;
  gradient: string;
  shape: UseCaseShape;
}

interface UseCasesCarouselProps {
  heading: string;
  description: string;
  items: UseCaseItem[];
  previousLabel: string;
  nextLabel: string;
  className?: string;
}

function GeometricShape({ shape }: { shape: UseCaseShape }) {
  const base = "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2";
  switch (shape) {
    case "circle":
      return (
        <div
          className={cn(base, "size-24 rounded-full bg-white/35 shadow-sm md:size-28")}
          aria-hidden
        />
      );
    case "hexagon":
      return (
        <div
          className={cn(base, "size-24 bg-white/35 md:size-28")}
          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          aria-hidden
        />
      );
    case "diamond":
      return (
        <div
          className={cn(base, "size-20 rotate-45 rounded-md bg-white/35 md:size-24")}
          aria-hidden
        />
      );
    case "rounded-square":
      return (
        <div
          className={cn(base, "size-24 rounded-2xl bg-white/35 md:size-28")}
          aria-hidden
        />
      );
    case "triangle":
      return (
        <div
          className={cn(base, "size-24 bg-white/35 md:size-28")}
          style={{ clipPath: "polygon(50% 8%, 100% 92%, 0% 92%)" }}
          aria-hidden
        />
      );
    case "ring":
      return (
        <div
          className={cn(
            base,
            "size-24 rounded-full border-[14px] border-white/40 bg-transparent md:size-28",
          )}
          aria-hidden
        />
      );
  }
}

export function UseCasesCarousel({
  heading,
  description,
  items,
  previousLabel,
  nextLabel,
  className,
}: UseCasesCarouselProps) {
  return (
    <section
      id="use-cases"
      className={cn("relative py-16 md:py-24", className)}
      aria-labelledby="use-cases-heading"
    >
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <h2
            id="use-cases-heading"
            className="text-2xl font-normal tracking-[-0.03em] text-balance md:text-4xl"
          >
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
            {description}
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: false }}
          className="mx-auto w-full max-w-6xl"
        >
          <CarouselContent className="-ml-4">
            {items.map((item, index) => (
              <CarouselItem
                key={`${item.shape}-${index}`}
                className="basis-full pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <article className="flex h-full flex-col gap-4">
                  <div
                    className={cn(
                      "relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br",
                      item.gradient,
                    )}
                  >
                    <GeometricShape shape={item.shape} />
                  </div>
                  <p className="text-sm leading-snug text-foreground md:text-base">
                    {item.title}
                  </p>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:inline-flex" aria-label={previousLabel} />
          <CarouselNext className="hidden sm:inline-flex" aria-label={nextLabel} />
        </Carousel>
      </div>
    </section>
  );
}
