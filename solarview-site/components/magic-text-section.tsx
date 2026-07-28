"use client";

import { useRef } from "react";

import { MagicText } from "@/components/ui/magic-text";
import { cn } from "@/lib/utils";

interface MagicTextSectionProps {
  text: string;
  className?: string;
}

export function MagicTextSection({ text, className }: MagicTextSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="statement"
      className={cn("relative bg-canvas", className)}
    >
      <div ref={containerRef} className="h-[160vh] md:h-[180vh]">
        <div className="sticky top-0 flex min-h-[100svh] items-center">
          <div className="container mx-auto max-w-3xl px-6 py-24">
            <MagicText text={text} containerRef={containerRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
