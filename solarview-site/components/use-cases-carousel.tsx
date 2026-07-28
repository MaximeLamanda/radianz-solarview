"use client";

import { useId } from "react";
import { ArrowUpRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type UseCaseShape =
  | "ribbon"
  | "halves"
  | "circle"
  | "hexagon"
  | "diamond"
  | "rounded-square"
  | "triangle"
  | "ring";

/** Variants de fond texturé (grain + blocs), inspirés d’un dither print. */
export type TexturedGradientVariant =
  | "electric-blue"
  | "lime-mist"
  | "slate-ink"
  | "warm-sand"
  | "teal-fog"
  | "periwinkle";

export interface UseCaseItem {
  title: string;
  variant: TexturedGradientVariant;
  shape: UseCaseShape;
  /** Fond image (mesh / texture) — remplace le rendu CSS de la variante */
  imageSrc?: string;
}

interface UseCasesCarouselProps {
  heading: string;
  description: string;
  items: UseCaseItem[];
  previousLabel: string;
  nextLabel: string;
  className?: string;
}

type VariantConfig = {
  /** Couleur de base (plein) */
  base: string;
  /** Blocs géométriques superposés */
  blocks: Array<{ background: string; className: string }>;
  /** Intensité du grain (0–1 via opacity) */
  grainOpacity: number;
};

const VARIANTS: Record<TexturedGradientVariant, VariantConfig> = {
  "electric-blue": {
    base: "#2f6bff",
    blocks: [
      { background: "#1e4fd6", className: "inset-y-0 right-[18%] left-[42%]" },
      { background: "#7aa2ff", className: "bottom-0 left-0 right-[35%] h-[42%]" },
      { background: "#4d82ff", className: "top-[12%] left-[8%] h-[28%] w-[36%]" },
      { background: "#c5d6ff", className: "bottom-[8%] left-[6%] h-[22%] w-[40%] opacity-80" },
    ],
    grainOpacity: 0.55,
  },
  "lime-mist": {
    base: "#c8e06a",
    blocks: [
      { background: "#9fc42e", className: "inset-y-0 right-[14%] left-[48%]" },
      { background: "#e8f5a8", className: "bottom-0 left-0 right-[28%] h-[46%]" },
      { background: "#b5d84a", className: "top-[10%] left-[10%] h-[30%] w-[34%]" },
      { background: "#f4facc", className: "bottom-[10%] left-[8%] h-[20%] w-[38%] opacity-75" },
    ],
    grainOpacity: 0.5,
  },
  "slate-ink": {
    base: "#5b6b7c",
    blocks: [
      { background: "#3d4a58", className: "inset-y-0 right-[16%] left-[44%]" },
      { background: "#8a98a8", className: "bottom-0 left-0 right-[32%] h-[44%]" },
      { background: "#6d7d8e", className: "top-[14%] left-[8%] h-[26%] w-[36%]" },
      { background: "#c5ced6", className: "bottom-[8%] left-[6%] h-[22%] w-[40%] opacity-70" },
    ],
    grainOpacity: 0.55,
  },
  "warm-sand": {
    base: "#d4a574",
    blocks: [
      { background: "#b8824e", className: "inset-y-0 right-[18%] left-[46%]" },
      { background: "#e8c9a4", className: "bottom-0 left-0 right-[30%] h-[45%]" },
      { background: "#c99660", className: "top-[12%] left-[10%] h-[28%] w-[34%]" },
      { background: "#f3e2d0", className: "bottom-[10%] left-[8%] h-[20%] w-[38%] opacity-75" },
    ],
    grainOpacity: 0.5,
  },
  "teal-fog": {
    base: "#3d9b8f",
    blocks: [
      { background: "#2a7a70", className: "inset-y-0 right-[15%] left-[45%]" },
      { background: "#7ec4bb", className: "bottom-0 left-0 right-[30%] h-[44%]" },
      { background: "#4fafa3", className: "top-[12%] left-[8%] h-[28%] w-[36%]" },
      { background: "#c5e8e3", className: "bottom-[8%] left-[6%] h-[22%] w-[40%] opacity-75" },
    ],
    grainOpacity: 0.52,
  },
  periwinkle: {
    base: "#7b8fd4",
    blocks: [
      { background: "#5a6fb8", className: "inset-y-0 right-[17%] left-[43%]" },
      { background: "#aeb9e4", className: "bottom-0 left-0 right-[33%] h-[43%]" },
      { background: "#8a9cd9", className: "top-[13%] left-[9%] h-[27%] w-[35%]" },
      { background: "#dce2f5", className: "bottom-[9%] left-[7%] h-[21%] w-[39%] opacity-75" },
    ],
    grainOpacity: 0.55,
  },
};

function GrainOverlay({ opacity }: { opacity: number }) {
  const rawId = useId();
  const filterId = `grain-${rawId.replace(/:/g, "")}`;

  return (
    <div
      className="pointer-events-none absolute inset-0 mix-blend-overlay"
      style={{ opacity }}
      aria-hidden
    >
      <svg className="size-full" preserveAspectRatio="none">
        <defs>
          <filter
            id={filterId}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75 0.9"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0.15
                      0 0 0 0 0.15
                      0 0 0 0 0.2
                      0 0 0 0.85 0"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>
      {/* Couche stipple plus fine pour l’effet dither print */}
      <div
        className="absolute inset-0 mix-blend-soft-light opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.35) 0.6px, transparent 0.7px)",
          backgroundSize: "3px 3px",
        }}
      />
    </div>
  );
}

function GeometricShape({ shape }: { shape: UseCaseShape }) {
  const base = "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2";
  const svgClass = cn(base, "size-28 text-white/45 md:size-32");

  switch (shape) {
    case "ribbon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          fill="none"
          className={svgClass}
          aria-hidden
        >
          <path
            d="M 180 0 C 221.974 0 256 34.026 256 76 L 256 256 L 208 256 L 208 76 C 208 60.536 195.464 48 180 48 C 164.536 48 152 60.536 152 76 L 152 180 C 152 221.974 117.974 256 76 256 C 34.026 256 0 221.974 0 180 L 0 0 L 48 0 L 48 180 C 48 195.464 60.536 208 76 208 C 91.464 208 104 195.464 104 180 L 104 76 C 104 34.026 138.026 0 180 0 Z"
            fill="currentColor"
          />
        </svg>
      );
    case "halves":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          fill="none"
          className={svgClass}
          aria-hidden
        >
          <path
            d="M 0 0 C 70.692 0 128 57.308 128 128 C 128 198.692 70.692 256 0 256 Z M 256 256 C 185.308 256 128 198.692 128 128 C 128 57.308 185.308 0 256 0 Z"
            fill="currentColor"
          />
        </svg>
      );
    case "circle":
      return (
        <div
          className={cn(base, "size-24 rounded-full bg-white/40 shadow-sm backdrop-blur-[1px] md:size-28")}
          aria-hidden
        />
      );
    case "hexagon":
      return (
        <div
          className={cn(base, "size-24 bg-white/40 md:size-28")}
          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          aria-hidden
        />
      );
    case "diamond":
      return (
        <div
          className={cn(base, "size-20 rotate-45 rounded-md bg-white/40 md:size-24")}
          aria-hidden
        />
      );
    case "rounded-square":
      return (
        <div
          className={cn(base, "size-24 rounded-2xl bg-white/40 md:size-28")}
          aria-hidden
        />
      );
    case "triangle":
      return (
        <div
          className={cn(base, "size-24 bg-white/40 md:size-28")}
          style={{ clipPath: "polygon(50% 8%, 100% 92%, 0% 92%)" }}
          aria-hidden
        />
      );
    case "ring":
      return (
        <div
          className={cn(
            base,
            "size-24 rounded-full border-[14px] border-white/50 bg-transparent md:size-28",
          )}
          aria-hidden
        />
      );
  }
}

function TexturedGradientCard({
  title,
  variant,
  shape,
  imageSrc,
  href = "/contact",
}: {
  title: string;
  variant: TexturedGradientVariant;
  shape: UseCaseShape;
  imageSrc?: string;
  href?: string;
}) {
  const config = VARIANTS[variant];

  return (
    <Link
      href={href}
      aria-label={title}
      className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2"
    >
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element -- asset décoratif plein cadre
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          aria-hidden
        />
      ) : (
        <>
          <div className="absolute inset-0" style={{ backgroundColor: config.base }} />
          {config.blocks.map((block, i) => (
            <div
              key={i}
              className={cn("absolute", block.className)}
              style={{ backgroundColor: block.background }}
              aria-hidden
            />
          ))}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${config.base}55 48%, #ffffff88 100%)`,
            }}
            aria-hidden
          />
          <GrainOverlay opacity={config.grainOpacity} />
        </>
      )}
      <GeometricShape shape={shape} />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 via-black/20 to-transparent"
        aria-hidden
      />

      <span
        className="absolute top-4 right-4 z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 group-hover:bg-white/20 md:top-5 md:right-5"
        aria-hidden
      >
        <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>

      <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5">
        <p className="w-full text-sm leading-snug text-white text-balance md:text-base">
          {title}
        </p>
      </div>
    </Link>
  );
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
      className={cn("relative overflow-x-clip bg-white py-16 md:py-24", className)}
      aria-labelledby="use-cases-heading"
    >
      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <div className="container mb-10 flex items-start justify-between gap-6 md:mb-14">
          <div className="max-w-2xl text-left md:max-w-3xl">
            <h2
              id="use-cases-heading"
              className="text-2xl font-normal tracking-[-0.03em] text-balance md:text-3xl lg:text-4xl"
            >
              {heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground text-balance md:text-lg lg:text-xl">
              {description}
            </p>
          </div>
          <div className="hidden shrink-0 items-center gap-2 pt-1 sm:flex">
            <CarouselPrevious
              className="static top-auto left-auto size-10 translate-x-0 translate-y-0"
              aria-label={previousLabel}
            />
            <CarouselNext
              className="static top-auto right-auto size-10 translate-x-0 translate-y-0"
              aria-label={nextLabel}
            />
          </div>
        </div>

        {/* Aligne à gauche avec le container, déborde jusqu’au bord droit de l’écran */}
        <div className="pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
          <CarouselContent className="-ml-4">
            {items.map((item, index) => (
              <CarouselItem
                key={`${item.variant}-${index}`}
                className="basis-[70%] pl-4 sm:basis-[42%] md:basis-[34%] lg:basis-[26%]"
              >
                <article className="h-full">
                  <TexturedGradientCard
                    title={item.title}
                    variant={item.variant}
                    shape={item.shape}
                    imageSrc={item.imageSrc}
                  />
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </section>
  );
}
