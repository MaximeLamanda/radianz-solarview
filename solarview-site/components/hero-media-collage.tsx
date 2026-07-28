"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export type HeroMediaSlot = {
  id: string;
  label: string;
  src?: string;
  alt?: string;
  /** Classes de position/taille desktop (absolute) */
  desktopClassName: string;
};

function MediaSlotFace({
  slot,
  className,
}: {
  slot: HeroMediaSlot;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-muted/70",
        className,
      )}
    >
      {slot.src ? (
        <Image
          src={slot.src}
          alt={slot.alt ?? slot.label}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 180px"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,var(--muted)_0%,transparent_55%)]">
          <span className="font-mono text-xs text-muted-foreground">{slot.label}</span>
        </div>
      )}
    </div>
  );
}

/** Un seul bloc au-dessus du titre, rotation 3s */
export function HeroMediaCollageMobile({ slots }: { slots: HeroMediaSlot[] }) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion || slots.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slots.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, [reduceMotion, slots.length]);

  const active = slots[index] ?? slots[0];
  if (!active) return null;

  return (
    <div className="relative mx-auto size-40 sm:size-44">
      <MediaSlotFace
        key={active.id}
        slot={active}
        className="absolute inset-0 transition-opacity duration-500"
      />
    </div>
  );
}

/** Collage flottant autour du texte (md+) */
export function HeroMediaCollageDesktop({ slots }: { slots: HeroMediaSlot[] }) {
  return (
    <>
      {slots.map((slot) => (
        <MediaSlotFace
          key={slot.id}
          slot={slot}
          className={slot.desktopClassName}
        />
      ))}
    </>
  );
}
