"use client";

import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface SiriOrbProps {
  size?: string;
  className?: string;
  colors?: {
    bg?: string;
    c1?: string;
    c2?: string;
    c3?: string;
  };
  animationDuration?: number;
}

export function SiriOrb({
  size = "96px",
  className,
  colors,
  animationDuration = 20,
}: SiriOrbProps) {
  const finalColors = {
    bg: "transparent",
    c1: "oklch(75% 0.15 350)",
    c2: "oklch(80% 0.12 200)",
    c3: "oklch(78% 0.14 280)",
    ...colors,
  };

  const sizeValue = Number.parseInt(size.replace("px", ""), 10) || 96;
  const blurAmount = Math.max(sizeValue * 0.08, 8);
  const contrastAmount = Math.max(sizeValue * 0.003, 1.8);

  return (
    <div
      className={cn("siri-orb", className)}
      aria-hidden
      style={
        {
          width: size,
          height: size,
          "--bg": finalColors.bg,
          "--c1": finalColors.c1,
          "--c2": finalColors.c2,
          "--c3": finalColors.c3,
          "--animation-duration": `${animationDuration}s`,
          "--blur-amount": `${blurAmount}px`,
          "--contrast-amount": contrastAmount,
        } as CSSProperties
      }
    />
  );
}
