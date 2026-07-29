"use client";

import * as React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface Logos18Logo {
  src: string;
  alt: string;
  srcDark?: string;
  className?: string;
  href?: string;
  /** Titre affiché dans le popover (défaut: alt) */
  title?: string;
  /** Texte template du popover */
  description?: string;
}

interface Logos18Props {
  logos?: Logos18Logo[];
  className?: string;
}

/** Combien de fois on répète le set dans chaque demi-piste (boucle fluide). */
const SET_REPEATS = 3;

const DEFAULT_LOGOS: Logos18Logo[] = [
  {
    src: "/stack/mistral.svg",
    alt: "Mistral",
    title: "Mistral",
    description: "LLMs européens pour apps et workflows en production.",
    className: "size-7",
  },
  {
    src: "/stack/claude.svg",
    alt: "Claude",
    title: "Claude",
    description: "Modèles Anthropic pour raisonnement et agents complexes.",
    className: "size-7",
  },
  {
    src: "/stack/openai.svg",
    alt: "OpenAI",
    title: "OpenAI",
    description: "Modèles GPT pour agents, rédaction et automatisation.",
    className: "size-7",
  },
  {
    src: "/stack/vercel.svg",
    alt: "Vercel",
    title: "Vercel",
    description: "Déploiement, edge et infra pour apps Next.js.",
    className: "size-7",
  },
  {
    src: "/stack/react.svg",
    alt: "React",
    title: "React",
    description: "Interfaces modernes, composants et UX produit.",
    className: "size-7",
  },
];

function LogoMarqueeItem({
  logo,
  open,
  onOpenChange,
}: {
  logo: Logos18Logo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const title = logo.title ?? logo.alt;
  const description =
    logo.description ?? "Technologie utilisée dans nos livraisons web & IA.";

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "group flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2",
            "outline-none transition-colors duration-200",
            "hover:bg-accent focus-visible:bg-accent focus-visible:ring-2 focus-visible:ring-ring",
            open && "bg-accent",
          )}
          onMouseEnter={() => onOpenChange(true)}
          onMouseLeave={() => onOpenChange(false)}
          onFocus={() => onOpenChange(true)}
          onBlur={() => onOpenChange(false)}
          aria-label={title}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.src}
            alt=""
            aria-hidden="true"
            className={cn(
              logo.className,
              "shrink-0 object-contain opacity-45 grayscale transition duration-200",
              "group-hover:opacity-100 group-hover:grayscale-0",
              open && "opacity-100 grayscale-0",
            )}
          />
          <span
            className={cn(
              "font-mono text-xs font-medium tracking-normal text-foreground/45 transition duration-200",
              "group-hover:text-foreground",
              open && "text-foreground",
            )}
          >
            {title}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        sideOffset={10}
        className="w-64 border-border bg-popover p-4 shadow-md"
        onMouseEnter={() => onOpenChange(true)}
        onMouseLeave={() => onOpenChange(false)}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-1.5">
          <p className="font-mono text-sm font-medium text-foreground">{title}</p>
          <p className="text-sm leading-snug text-muted-foreground">{description}</p>
          {logo.href ? (
            <a
              href={logo.href}
              className="mt-1 font-mono text-xs text-foreground underline-offset-4 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              En savoir plus
            </a>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function LogoSet({
  logos,
  activeKey,
  setActiveKey,
  keyPrefix,
  ariaHidden,
}: {
  logos: Logos18Logo[];
  activeKey: string | null;
  setActiveKey: (key: string | null) => void;
  keyPrefix: string;
  ariaHidden?: boolean;
}) {
  const items = React.useMemo(
    () => Array.from({ length: SET_REPEATS }, () => logos).flat(),
    [logos],
  );

  return (
    <div
      className="flex shrink-0 items-center gap-4 pr-4 sm:gap-6 sm:pr-6 md:gap-8 md:pr-8"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((logo, index) => {
        const key = `${keyPrefix}-${logo.src}-${index}`;
        return (
          <LogoMarqueeItem
            key={key}
            logo={logo}
            open={!ariaHidden && activeKey === key}
            onOpenChange={(open) => {
              if (ariaHidden) return;
              setActiveKey(open ? key : null);
            }}
          />
        );
      })}
    </div>
  );
}

const Logos18 = ({ logos = DEFAULT_LOGOS, className }: Logos18Props) => {
  const [activeKey, setActiveKey] = React.useState<string | null>(null);
  const paused = activeKey !== null;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-transparent py-0",
        // Fade via mask (pas de bande blanche qui casse le fond pointillé)
        "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        "[-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
      aria-label="Notre stack"
    >
      <div
        className={cn(
          "logos18-marquee flex w-max items-center",
          paused && "logos18-marquee-paused",
        )}
      >
        <LogoSet
          logos={logos}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          keyPrefix="a"
        />
        <LogoSet
          logos={logos}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          keyPrefix="b"
          ariaHidden
        />
      </div>
    </div>
  );
};

export { Logos18 };
