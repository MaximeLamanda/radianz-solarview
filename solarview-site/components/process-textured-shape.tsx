"use client";

import { useId } from "react";

import { GALLERY_SHAPE_PATHS } from "@/lib/gallery-shapes";
import { cn } from "@/lib/utils";

type TexturedVariant =
  | "lime-mist"
  | "electric-blue"
  | "warm-sand"
  | "teal-fog"
  | "periwinkle"
  | "slate-ink";

type VariantConfig = {
  base: string;
  blocks: Array<{ background: string; className: string }>;
  grainOpacity: number;
};

const VARIANTS: Record<TexturedVariant, VariantConfig> = {
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
  const filterId = `process-grain-${rawId.replace(/:/g, "")}`;

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

const PROCESS_ILLUSTRATIONS = [
  {
    shapeId: 22,
    variant: "lime-mist" as const,
    imageSrc: "/use-cases/mesh-lime.png",
  },
  {
    shapeId: 8,
    variant: "electric-blue" as const,
    imageSrc: "/use-cases/mesh-cyan.png",
  },
  {
    shapeId: 27,
    variant: "warm-sand" as const,
    imageSrc: "/use-cases/mesh-peach.png",
  },
];

function shapeMaskUrl(pathD: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="${pathD}" fill="black"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export function ProcessTexturedShape({
  index,
  className,
}: {
  index: number;
  className?: string;
}) {
  const illustration =
    PROCESS_ILLUSTRATIONS[index % PROCESS_ILLUSTRATIONS.length];
  const shape = GALLERY_SHAPE_PATHS.find((s) => s.id === illustration.shapeId);
  if (!shape) return null;

  const config = VARIANTS[illustration.variant];
  const mask = shapeMaskUrl(shape.d);

  return (
    <div
      className={cn(
        "relative size-10 shrink-0 overflow-hidden md:size-12",
        className,
      )}
      style={{
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- mesh décoratif masqué */}
      <img
        src={illustration.imageSrc}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      {/* Couches texturées en plus du mesh, comme les cards use-cases */}
      <div
        className="absolute inset-0 mix-blend-soft-light opacity-70"
        style={{ backgroundColor: config.base }}
      />
      {config.blocks.map((block, i) => (
        <div
          key={i}
          className={cn("absolute mix-blend-overlay opacity-80", block.className)}
          style={{ backgroundColor: block.background }}
        />
      ))}
      <GrainOverlay opacity={config.grainOpacity} />
    </div>
  );
}
