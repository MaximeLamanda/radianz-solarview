"use client";

import { useCallback, useMemo, useTransition } from "react";
import { useSearchParams } from "next/navigation";

import { usePathname, useRouter } from "@/i18n/navigation";
import {
  getUseCasesForFilter,
  type IndustryFilterId,
  parseIndustryParam,
  type IndustryUseCase,
} from "@/lib/industries";
import { cn } from "@/lib/utils";
import {
  resolveUseCaseGalleryPath,
  UseCaseDetailDialog,
  UseCaseMeshVisual,
} from "@/components/use-case-detail-dialog";

export type IndustryTab = {
  id: IndustryFilterId;
  title: string;
};

export type IndustryCaseCopy = {
  id: string;
  title: string;
  description: string;
  detail: string;
};

type IndustriesHubProps = {
  heading: string;
  description: string;
  emptyLabel: string;
  stackLabel: string;
  ctaLabel: string;
  industries: IndustryTab[];
  cases: IndustryCaseCopy[];
  className?: string;
};

function UseCaseCard({
  title,
  description,
  detail,
  stack,
  stackLabel,
  ctaLabel,
  imageSrc,
  galleryShapeId,
}: {
  title: string;
  description: string;
  detail: string;
  stack: readonly string[];
  stackLabel: string;
  ctaLabel: string;
  imageSrc: string;
  galleryShapeId: number;
}) {
  const pathD = resolveUseCaseGalleryPath(galleryShapeId);

  return (
    <UseCaseDetailDialog
      title={title}
      description={description}
      detail={detail}
      stack={stack}
      stackLabel={stackLabel}
      ctaLabel={ctaLabel}
      imageSrc={imageSrc}
      galleryShapeId={galleryShapeId}
      trigger={
        <button
          type="button"
          aria-label={title}
          className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2"
        >
          <UseCaseMeshVisual
            imageSrc={imageSrc}
            pathD={pathD}
            className="absolute inset-0"
            iconClassName="left-4 top-4 size-10 md:left-5 md:top-5 md:size-11"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 z-10 w-full space-y-1.5 p-4 md:p-5">
            <p className="text-base leading-tight text-white md:text-lg">{title}</p>
            <p className="text-sm leading-relaxed text-white/75">{description}</p>
          </div>
        </button>
      }
    />
  );
}

export function IndustriesHub({
  heading,
  description,
  emptyLabel,
  stackLabel,
  ctaLabel,
  industries,
  cases,
  className,
}: IndustriesHubProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const activeId = parseIndustryParam(searchParams.get("secteur"));

  const copyById = useMemo(() => {
    const map = new Map<string, IndustryCaseCopy>();
    for (const item of cases) map.set(item.id, item);
    return map;
  }, [cases]);

  const visibleCases = useMemo(() => {
    return getUseCasesForFilter(activeId)
      .map((meta: IndustryUseCase) => {
        const copy = copyById.get(meta.id);
        if (!copy) return null;
        return { meta, copy };
      })
      .filter(
        (item): item is { meta: IndustryUseCase; copy: IndustryCaseCopy } =>
          item != null,
      );
  }, [activeId, copyById]);

  const selectIndustry = useCallback(
    (id: IndustryFilterId) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("secteur", id);
      const query = params.toString();
      startTransition(() => {
        router.replace(query ? `${pathname}?${query}` : pathname, {
          scroll: false,
        });
      });
    },
    [pathname, router, searchParams],
  );

  return (
    <section
      className={cn("relative bg-white py-16 md:py-24", className)}
      aria-labelledby="industries-heading"
    >
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h1
            id="industries-heading"
            className="text-section text-foreground"
          >
            {heading}
          </h1>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>

        <div
          role="tablist"
          aria-label={heading}
          className="mb-10 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:mb-12 [&::-webkit-scrollbar]:hidden"
        >
          {industries.map((industry) => {
            const selected = industry.id === activeId;
            return (
              <button
                key={industry.id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`industry-tab-${industry.id}`}
                onClick={() => selectIndustry(industry.id)}
                className={cn(
                  "shrink-0 cursor-pointer rounded-md border px-3.5 py-2 font-mono text-xs font-medium uppercase tracking-wide transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2",
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-foreground hover:bg-muted",
                )}
              >
                {industry.title}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          aria-labelledby={`industry-tab-${activeId}`}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleCases.length === 0 ? (
            <p className="col-span-full text-sm text-muted-foreground">
              {emptyLabel}
            </p>
          ) : (
            visibleCases.map(({ meta, copy }) => (
              <UseCaseCard
                key={meta.id}
                title={copy.title}
                description={copy.description}
                detail={copy.detail}
                stack={meta.stack}
                stackLabel={stackLabel}
                ctaLabel={ctaLabel}
                imageSrc={meta.imageSrc}
                galleryShapeId={meta.galleryShapeId}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
