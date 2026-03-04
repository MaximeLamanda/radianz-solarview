import { HandHelping, Users, Zap } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

import type { HeroFeatureIconsProps } from "@/lib/hero-feature-icons";

const Hero45 = ({
  badge = "shadcnblocks.com",
  heading = "Blocks built with Shadcn & Tailwind",
  images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      alt: "placeholder",
    },
  ],
  features = [
    {
      icon: HandHelping,
      title: "Flexible Support",
      description:
        "Benefit from around-the-clock assistance to keep your business running smoothly.",
    },
    {
      icon: Users,
      title: "Collaborative Tools",
      description:
        "Enhance teamwork with tools designed to simplify project management and communication.",
    },
    {
      icon: Zap,
      title: "Lightning Fast Speed",
      description:
        "Experience the fastest load times with our high performance servers.",
    },
  ],
  description,
  statBadges,
  className,
}: HeroFeatureIconsProps) => {
  return (
    <section className={cn("pt-16 pb-16", className)}>
      <div className="container overflow-hidden">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <Badge variant="outline" className="font-mono text-xs uppercase tracking-wider">
            {badge}
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold lg:text-5xl">{heading}</h1>
          {description && (
            <p className="max-w-2xl text-lg text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="relative w-full">
          <img
            src={images[0].src}
            alt={images[0].alt}
            className="aspect-video max-h-[650px] w-full rounded-xl object-cover"
          />
          {statBadges && statBadges.length > 0 && (
            <div className="pointer-events-none absolute inset-0">
              {statBadges.map((stat, i) => {
                const positions = [
                  { left: "40%", top: "40%" },
                  { left: "62%", top: "32%" },
                  { left: "40%", top: "62%" },
                  { left: "64%", top: "52%" },
                ];
                const pos = positions[i % positions.length];
                return (
                  <span
                    key={stat.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md px-3 py-1.5 font-mono text-xs font-medium"
                    style={{
                      backgroundColor: "#E4FE55",
                      color: "#171717",
                      left: pos.left,
                      top: pos.top,
                    }}
                  >
                    {stat.label} {stat.value}
                  </span>
                );
              })}
            </div>
          )}
          <div className="absolute -top-28 -right-28 -z-10 aspect-video h-72 w-96 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] [background-size:12px_12px] opacity-40 sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]"></div>
          <div className="absolute -top-28 -left-28 -z-10 aspect-video h-72 w-96 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] [background-size:12px_12px] opacity-40 sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]"></div>
        </div>
        <div className="mt-3 flex w-full flex-col gap-2 md:flex-row md:gap-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex min-h-[160px] grow basis-0 flex-col justify-between rounded-md bg-zinc-100 px-6 py-6 dark:bg-zinc-800"
            >
              {feature.kpi ? (
                <>
                  <span className="font-mono text-4xl font-semibold lg:text-5xl">
                    {feature.kpi}
                  </span>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </>
              ) : (
                  <>
                    <div className="mb-6 flex size-10 items-center justify-center rounded-full bg-background drop-shadow-lg">
                      <feature.icon className="h-auto w-5" />
                    </div>
                    <h3 className="mb-2 font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </>
                )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Hero45 };
