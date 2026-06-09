"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DotIllustration, TARGETING_DOT_PATTERNS } from "@/components/dot-illustration";

interface SearchSectionProps {
  className?: string;
}

const targetingCategories = [
  { key: "searchTargetingRetail", pattern: TARGETING_DOT_PATTERNS.retail },
  { key: "searchTargetingIndustry", pattern: TARGETING_DOT_PATTERNS.industry },
  { key: "searchTargetingTertiary", pattern: TARGETING_DOT_PATTERNS.tertiary },
  { key: "searchTargetingSchool", pattern: TARGETING_DOT_PATTERNS.school },
] as const;

function IllustrativeRangeSlider({
  label,
  minLabel,
  maxLabel,
  rangeStart,
  rangeEnd,
}: {
  label: string;
  minLabel: string;
  maxLabel: string;
  rangeStart: number;
  rangeEnd: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <p className="radianz-label">{label}</p>
        <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
          {minLabel} – {maxLabel}
        </span>
      </div>
      <div className="relative mt-2 h-1.5 rounded-full bg-muted">
        <div
          className="absolute inset-y-0 rounded-full bg-accent/35"
          style={{ left: `${rangeStart}%`, right: `${100 - rangeEnd}%` }}
        />
        <span
          className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-accent shadow-sm"
          style={{ left: `${rangeStart}%` }}
        />
        <span
          className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-accent shadow-sm"
          style={{ left: `${rangeEnd}%` }}
        />
      </div>
    </div>
  );
}

const SearchSection = ({ className }: SearchSectionProps) => {
  const t = useTranslations("pipeline");

  return (
    <section className={cn("pt-8 pb-12 md:pt-16 md:pb-24", className)}>
      <div className="container">
        <div className="mb-8 flex justify-center">
          <Badge variant="outline" className="font-mono text-xs uppercase tracking-wider">
            {t("badge")}
          </Badge>
        </div>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-section">{t("searchTitle")}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {t("searchDescription")}
              </p>
            </div>
            <div className="hidden flex-wrap gap-3 md:flex">
              <div className="radianz-info-card">
                <div className="radianz-highlight">
                  <Search className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{t("searchCard1")}</h3>
                  <p className="text-xs text-muted-foreground">{t("searchCard1Desc")}</p>
                </div>
              </div>
              <div className="radianz-info-card">
                <div className="radianz-highlight">
                  <SlidersHorizontal className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{t("searchCard2")}</h3>
                  <p className="text-xs text-muted-foreground">{t("searchCard2Desc")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-border">
            <img
              src="/search-map-view.webp"
              alt={t("searchTitle")}
              width={1400}
              height={865}
              loading="lazy"
              className="aspect-[4/3] size-full object-cover"
            />

            <div className="absolute bottom-0 left-1/2 z-10 w-[72%] max-w-xs -translate-x-1/2 translate-y-[38%] sm:max-w-sm">
              <div className="rounded-lg border border-border/80 bg-card/95 px-3 py-2.5 shadow-lg backdrop-blur-sm sm:px-4 sm:py-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="size-3.5 shrink-0 text-muted-foreground" />
                  <span className="text-xs font-medium">{t("searchTargetingLabel")}</span>
                </div>

                <div className="mt-2.5 grid grid-cols-4 gap-2">
                  {targetingCategories.map(({ key, pattern }, index) => (
                    <div key={key} className="flex min-w-0 flex-col items-center gap-1.5">
                      <div
                        className={cn(
                          "flex aspect-square w-full max-w-[3.75rem] items-center justify-center rounded-md border sm:max-w-[4.25rem]",
                          index === 0
                            ? "border-accent bg-accent text-accent-foreground"
                            : "border-border bg-muted/40 text-foreground/70",
                        )}
                      >
                        <DotIllustration pattern={pattern} />
                      </div>
                      <span className="w-full text-center text-[10px] font-medium leading-tight sm:text-[11px]">
                        {t(key)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 space-y-3 border-t border-border/60 pt-3">
                  <IllustrativeRangeSlider
                    label={t("searchFilterSurface")}
                    minLabel="500"
                    maxLabel="10 000"
                    rangeStart={18}
                    rangeEnd={72}
                  />
                  <IllustrativeRangeSlider
                    label={t("searchFilterConstructionYear")}
                    minLabel="1980"
                    maxLabel="2024"
                    rangeStart={25}
                    rangeEnd={85}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export { SearchSection };
