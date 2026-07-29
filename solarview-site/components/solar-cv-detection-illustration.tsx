import Image from "next/image";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface SolarCvDetectionIllustrationProps {
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
  detectionLabel?: string;
  confidenceLabel?: string;
}

export function SolarCvDetectionIllustration({
  className,
  imageSrc = "/case-studies/solar-panel-detection.jpg",
  imageAlt = "Détection computer vision de panneaux solaires",
  detectionLabel = "Panneau détecté",
  confidenceLabel = "96 %",
}: SolarCvDetectionIllustrationProps) {
  return (
    <div
      className={cn(
        "relative flex w-[78%] flex-col items-center transition-transform duration-500 ease-out group-hover:scale-105 group-focus-within:scale-105",
        className,
      )}
    >
      <div className="relative w-full overflow-hidden rounded-md border border-border shadow-sm">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            quality={100}
            className="object-cover object-center"
            sizes="(max-width: 768px) 70vw, 320px"
          />
        </div>
      </div>

      {/* Pastille descendue : chevauche le bas de la photo, dans le vide */}
      <div className="relative z-10 -mt-5 self-center">
        <div className="inline-flex min-w-[11rem] items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 shadow-md">
          <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
            <Check className="size-2.5" strokeWidth={3} />
          </span>
          <p className="min-w-0 flex-1 text-[10px] font-semibold tracking-tight text-foreground">
            {detectionLabel}
          </p>
          <span className="shrink-0 font-mono text-[10px] font-semibold text-foreground">
            {confidenceLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
