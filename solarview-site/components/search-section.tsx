"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SearchSectionProps {
  className?: string;
}

const SearchSection = ({ className }: SearchSectionProps) => {
  const t = useTranslations("pipeline");

  return (
    <section className={cn("py-24", className)}>
      <div className="mb-36 flex justify-center pt-4">
        <Badge variant="outline" className="font-mono text-xs uppercase tracking-wider">
          {t("badge")}
        </Badge>
      </div>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: titre + description + 2 cartes */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
                {t("searchTitle")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {t("searchDescription")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900/50">
                <div
                  className="flex size-8 shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: "#E4FE55" }}
                >
                  <Search className="size-4" style={{ color: "#171717" }} />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{t("searchCard1")}</h3>
                  <p className="text-xs text-muted-foreground">{t("searchCard1Desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900/50">
                <div
                  className="flex size-8 shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: "#E4FE55" }}
                >
                  <SlidersHorizontal className="size-4" style={{ color: "#171717" }} />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{t("searchCard2")}</h3>
                  <p className="text-xs text-muted-foreground">{t("searchCard2Desc")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: illustration - image + blocs 1 et 3 en absolute */}
          <div className="relative min-h-[280px] rounded-xl lg:min-h-[360px]">
            {/* Bloc 2 - Image (base) */}
            <img
              src="/amazon-plateform-lyon.png"
              alt=""
              className="size-full rounded-xl object-cover"
            />
            {/* Bloc 1 - UI Recherche (absolute left) */}
            <div className="absolute -left-2 -bottom-12 w-[175px] min-w-[175px] rounded-lg border border-zinc-200 bg-white p-2 dark:border-zinc-700 dark:bg-white lg:bottom-auto lg:top-4 lg:w-[220px] lg:min-w-[220px] lg:rounded-xl lg:p-3">
              <div className="mb-1.5 flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-1.5 py-1 dark:border-zinc-700 dark:bg-zinc-800/50 lg:mb-3 lg:gap-2 lg:px-2 lg:py-1.5">
                <Search className="size-3 shrink-0 text-zinc-500 lg:size-3.5" />
                <span className="text-[9px] text-zinc-400 lg:text-[10px]">{t("searchPlaceholder")}</span>
              </div>
              <div className="mb-1.5 flex items-center gap-1 lg:mb-3 lg:gap-2">
                <button
                  type="button"
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400 lg:h-5 lg:w-5"
                  aria-label="Filtres"
                >
                  <SlidersHorizontal className="size-2.5 lg:size-3" />
                </button>
                <div className="flex flex-wrap gap-1">
                  <Badge className="text-[10px]" style={{ backgroundColor: "#E4FE55", color: "#171717" }}>
                    {t("searchType1")}
                  </Badge>
                  <Badge variant="secondary" className="text-[10px]">
                    {t("searchType2")}
                  </Badge>
                </div>
              </div>
              <p className="mb-1 text-[9px] font-medium text-zinc-600 dark:text-zinc-400 lg:mb-2 lg:text-[10px]">{t("searchResultsCount")}</p>
              <div className="space-y-1 lg:space-y-2">
                <div className="flex items-center gap-1.5 rounded border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-700 dark:bg-zinc-800/50 lg:gap-2 lg:p-1.5">
                  <img src="/lead-photo-1.png" alt="" className="size-6 shrink-0 rounded object-cover lg:size-8" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-medium">{t("lead1")}</p>
                    <p className="truncate text-[9px] text-zinc-500">{t("addr1")}</p>
                    <div className="mt-0.5 flex flex-wrap gap-0.5">
                      <Badge variant="secondary" className="px-1 py-0 text-[8px]">72%</Badge>
                      <Badge variant="secondary" className="px-1 py-0 text-[8px]">81%</Badge>
                      <Badge variant="secondary" className="px-1 py-0 text-[8px]">88%</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded border border-zinc-300 bg-zinc-200 p-1 dark:border-zinc-600 dark:bg-zinc-700/80 lg:gap-2 lg:p-1.5">
                  <img src="/plateform-lyon-natural.png" alt="" className="size-6 shrink-0 rounded object-cover lg:size-8" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-medium">{t("lead2")}</p>
                    <p className="truncate text-[9px] text-zinc-500">{t("addr2")}</p>
                    <div className="mt-0.5 flex flex-wrap gap-0.5">
                      <Badge variant="secondary" className="px-1 py-0 text-[8px]">85%</Badge>
                      <Badge variant="secondary" className="px-1 py-0 text-[8px]">78%</Badge>
                      <Badge variant="secondary" className="px-1 py-0 text-[8px]">92%</Badge>
                    </div>
                  </div>
                </div>
                <div className="hidden items-center gap-2 rounded border border-zinc-200 bg-zinc-50 p-1.5 dark:border-zinc-700 dark:bg-zinc-800/50 lg:flex">
                  <img src="/lead-photo-3.png" alt="" className="size-8 shrink-0 rounded object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-medium">{t("lead3")}</p>
                    <p className="truncate text-[9px] text-zinc-500">{t("addr3")}</p>
                    <div className="mt-0.5 flex flex-wrap gap-0.5">
                      <Badge variant="secondary" className="px-1 py-0 text-[8px]">65%</Badge>
                      <Badge variant="secondary" className="px-1 py-0 text-[8px]">90%</Badge>
                      <Badge variant="secondary" className="px-1 py-0 text-[8px]">75%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Bloc 3 - Infos bâtiment (absolute right) */}
            <div className="absolute -right-2 -bottom-16 w-[150px] min-w-[150px] rounded-lg border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-white lg:bottom-4 lg:-right-6 lg:w-[210px] lg:min-w-[210px] lg:rounded-xl lg:p-3">
              <h3 className="text-[10px] font-semibold leading-tight lg:text-xs">{t("lead2")}</h3>
              <p className="mt-0.5 text-[9px] text-zinc-500 lg:text-[10px]">{t("addr2")}</p>
              <div className="mt-1 flex flex-wrap gap-0.5 lg:mt-1.5">
                <Badge variant="secondary" className="px-1 py-0 text-[7px] lg:text-[8px]">85%</Badge>
                <Badge variant="secondary" className="px-1 py-0 text-[7px] lg:text-[8px]">78%</Badge>
                <Badge variant="secondary" className="px-1 py-0 text-[7px] lg:text-[8px]">92%</Badge>
              </div>
              <div className="my-1 lg:my-2">
                <svg viewBox="0 0 180 48" className="h-10 w-full lg:h-16" preserveAspectRatio="none" aria-hidden>
                  {[
                    { prod: 5, conso: 12 },
                    { prod: 7, conso: 11 },
                    { prod: 12, conso: 10 },
                    { prod: 18, conso: 0 },
                    { prod: 24, conso: 0 },
                    { prod: 28, conso: 0 },
                    { prod: 26, conso: 0 },
                    { prod: 22, conso: 0 },
                    { prod: 14, conso: 9 },
                    { prod: 8, conso: 11 },
                  ].map((v, i) => {
                    const x = 2 + i * 18;
                    const w = 14;
                    const maxH = 42;
                    const hProd = (v.prod / 28) * maxH;
                    const hConso = v.conso > 0 ? (v.conso / 12) * (maxH / 4) : 0;
                    const yProdTop = 48 - hProd;
                    const yConsoTop = 48 - hProd - hConso;
                    return (
                      <g key={i}>
                        <rect x={x} y={yProdTop} width={w} height={hProd} fill="#E4FE55" rx={1} />
                        {hConso > 0 && (
                          <rect x={x} y={yConsoTop} width={w} height={hConso} fill="rgba(0,0,0,0.08)" rx={1} />
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
              <div className="my-1 h-px bg-zinc-200 dark:bg-zinc-700 lg:my-1.5" />
              <div className="flex justify-between text-[9px] lg:text-[10px]">
                <span className="text-zinc-500">kWp</span>
                <span>847</span>
              </div>
              <div className="my-1 h-px bg-zinc-200 dark:bg-zinc-700 lg:my-1.5" />
              <div className="flex justify-between text-[9px] lg:text-[10px]">
                <span className="text-zinc-500">MWh</span>
                <span>1059</span>
              </div>
              <div className="my-1 h-px bg-zinc-200 dark:bg-zinc-700 lg:my-1.5" />
              <div className="flex justify-between text-[9px] lg:text-[10px]">
                <span className="text-zinc-500">Surface</span>
                <span>13 000 m²</span>
              </div>
              <button
                type="button"
                className="mt-2 flex w-full items-center justify-center gap-1 rounded-md px-1.5 py-1 text-[9px] font-medium transition-colors lg:mt-3 lg:gap-1.5 lg:px-2 lg:py-1.5 lg:text-[10px]"
                style={{ backgroundColor: "#E4FE55", color: "#171717" }}
              >
                <Plus className="size-3" />
                {t("searchAddToPipeline")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SearchSection };
