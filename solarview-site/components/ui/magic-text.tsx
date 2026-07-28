"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { cn } from "@/lib/utils";

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  reducedMotion: boolean;
}

function Word({ word, progress, start, end, reducedMotion }: WordProps) {
  const opacity = useTransform(progress, [start, end], [0, 1]);

  if (reducedMotion) {
    return <span className="text-ink">{word}</span>;
  }

  return (
    <span className="relative">
      <span aria-hidden className="select-none text-ink/15">
        {word}
      </span>
      <motion.span
        style={{ opacity }}
        className="absolute left-0 top-0 text-ink"
      >
        {word}
      </motion.span>
    </span>
  );
}

interface MagicTextProps {
  text: string;
  className?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
}

export function MagicText({ text, className, containerRef }: MagicTextProps) {
  const fallbackRef = useRef<HTMLParagraphElement>(null);
  const target = containerRef ?? fallbackRef;

  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={containerRef ? undefined : fallbackRef}
      className={cn(
        "flex flex-wrap justify-center gap-x-2.5 gap-y-1 text-center text-2xl leading-relaxed tracking-[-0.03em] text-ink md:text-3xl lg:text-4xl",
        className,
      )}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word
            key={`${word}-${i}`}
            word={word}
            progress={scrollYProgress}
            start={start}
            end={end}
            reducedMotion={!!reducedMotion}
          />
        );
      })}
    </p>
  );
}
