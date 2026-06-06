import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

import type { HeroFeatureIconsProps, StatBadge } from "@/lib/hero-feature-icons";

function getCircularPosition(index: number, total: number, radiusPercent: number) {
  const startAngle = -Math.PI / 2;
  const angle = startAngle + (2 * Math.PI * index) / total;

  return {
    left: `${50 + radiusPercent * Math.cos(angle)}%`,
    top: `${50 + radiusPercent * Math.sin(angle)}%`,
  };
}

function applyMobileNudge(pos: { left: string; top: string }, stat: StatBadge) {
  let left = Number.parseFloat(pos.left);
  const top = Number.parseFloat(pos.top);

  if (stat.label === "Bâtiment") left += 7;
  if (stat.live) left += 2;

  return { left: `${left}%`, top: `${top}%` };
}

function applyDesktopNudge(pos: { left: string; top: string }, stat: StatBadge) {
  let left = Number.parseFloat(pos.left);
  let top = Number.parseFloat(pos.top);

  if (stat.label === "Solar") top -= 4;
  if (stat.live) left += 2;

  return { left: `${left}%`, top: `${top}%` };
}

const Hero45 = ({
  heading,
  description,
  badge,
  statBadges,
  features = [],
  images,
  className,
}: HeroFeatureIconsProps) => {
  return (
    <section className={cn("pt-14 pb-0 md:pt-20 md:pb-2", className)}>
      <div className="container overflow-hidden">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          {badge ? (
            <span className="inline-flex rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              {badge}
            </span>
          ) : null}
          <h1 className="max-w-3xl text-5xl font-bold tracking-[-0.035em] md:text-6xl lg:text-7xl">{heading}</h1>
          {description ? (
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>
          ) : null}
        </div>

        <div className="relative mt-10 w-full md:mt-12">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            width={1920}
            height={1080}
            priority
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            className="aspect-video min-h-[320px] max-h-[650px] w-full rounded-xl border border-border object-cover shadow-sm md:min-h-0"
          />

          {statBadges && statBadges.length > 0 ? (
            <div className="pointer-events-none absolute inset-0">
              {statBadges.map((stat, i) => {
                const total = statBadges.length;
                const posM = applyMobileNudge(getCircularPosition(i, total, 32), stat);
                const posD = applyDesktopNudge(getCircularPosition(i, total, 22), stat);

                const TagBlock = ({
                  left,
                  top,
                  visibilityClass,
                }: {
                  left: string;
                  top: string;
                  visibilityClass?: string;
                }) => (
                  <div
                    className={cn(
                      "absolute flex min-w-0 -translate-x-1/2 -translate-y-1/2 flex-col gap-1 md:gap-2",
                      visibilityClass,
                    )}
                    style={{ left, top }}
                  >
                    <span className="inline-flex w-fit rounded-sm bg-accent px-3 py-1 font-mono text-xs font-semibold text-accent-foreground shadow-md ring-1 ring-black/10 md:text-sm">
                      {stat.label}
                      {stat.value ? ` ${stat.value}` : null}
                    </span>
                    {stat.contact ? (
                      <div
                        className="rounded-sm border border-white/20 px-3 py-2 shadow-lg backdrop-blur-md"
                        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[10px] font-semibold uppercase text-accent-foreground md:size-8">
                            {stat.contact.firstName[0]}
                            {stat.contact.lastName[0]}
                          </span>
                          <span className="font-mono text-[10px] font-medium leading-none text-white md:text-xs">
                            {stat.contact.firstName} {stat.contact.lastName}
                          </span>
                        </div>
                      </div>
                    ) : stat.data && stat.data.length > 0 ? (
                      <div
                        className="rounded-sm border border-white/20 px-3 py-2 shadow-lg backdrop-blur-md"
                        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
                      >
                        <div className="flex flex-col gap-1 font-mono text-[10px] leading-relaxed text-white md:gap-1.5 md:text-xs">
                          {stat.data.slice(0, 3).map((d, j) => (
                            <span
                              key={j}
                              className={cn(
                                stat.live && j === 0
                                  ? "inline-flex items-center gap-1.5 leading-none"
                                  : "block",
                              )}
                            >
                              {stat.live && j === 0 ? (
                                <span
                                  className="size-1.5 shrink-0 rounded-full bg-emerald-400"
                                  aria-hidden
                                />
                              ) : null}
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );

                return (
                  <React.Fragment key={stat.label}>
                    <TagBlock left={posM.left} top={posM.top} visibilityClass="md:hidden" />
                    <TagBlock left={posD.left} top={posD.top} visibilityClass="hidden md:block" />
                  </React.Fragment>
                );
              })}
            </div>
          ) : null}

          <div className="absolute -top-28 -right-28 -z-10 aspect-video h-72 w-96 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] [background-size:12px_12px] opacity-40 sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]" />
          <div className="absolute -top-28 -left-28 -z-10 aspect-video h-72 w-96 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] [background-size:12px_12px] opacity-40 sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]" />
        </div>

        {features.length > 0 ? (
          <div className="mt-3 flex w-full flex-col gap-2 md:mt-4 md:flex-row md:gap-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex min-h-[160px] grow basis-0 flex-col justify-between rounded-lg border border-border bg-card px-6 py-6"
              >
                {feature.kpi ? (
                  <>
                    <span className="font-mono text-4xl font-normal tracking-tight lg:text-5xl">
                      {feature.kpi}
                    </span>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </>
                ) : (
                  <>
                    <div className="mb-6 flex size-10 items-center justify-center rounded-full bg-background drop-shadow-lg">
                      <feature.icon className="h-auto w-5" />
                    </div>
                    <h3 className="mb-2 font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export { Hero45 };
