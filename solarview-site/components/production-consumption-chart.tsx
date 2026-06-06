import { cn } from "@/lib/utils";

const PRODUCTION_CHART_DATA = [
  { prod: 6, conso: 14 },
  { prod: 7, conso: 14 },
  { prod: 11, conso: 11 },
  { prod: 14, conso: 8 },
  { prod: 18, conso: 6 },
  { prod: 20, conso: 5 },
  { prod: 21, conso: 4 },
  { prod: 19, conso: 5 },
  { prod: 15, conso: 7 },
  { prod: 13, conso: 10 },
  { prod: 8, conso: 13 },
  { prod: 6, conso: 15 },
] as const;

function ProductionConsumptionChart({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-[240px] w-full flex-col gap-2 rounded-md border border-border bg-muted/40 px-4 py-3",
        className,
      )}
    >
      <div className="flex shrink-0 items-center justify-between gap-2">
        <span className="font-mono text-xs font-medium tabular-nums">1.24 MWh/year</span>
        <span className="font-mono text-xs font-semibold tabular-nums">78% auto</span>
      </div>
      <svg viewBox="0 12 200 28" className="min-h-[165px] w-full flex-1" preserveAspectRatio="none" aria-hidden>
        {PRODUCTION_CHART_DATA.map((v, i) => {
          const x = 4 + i * 16;
          const w = 12;
          const yProdTop = 38 - v.prod;
          const yConsoTop = 38 - v.prod - v.conso;
          return (
            <g key={i}>
              <rect x={x} y={yProdTop} width={w} height={v.prod} className="fill-accent" />
              <rect
                x={x}
                y={yConsoTop}
                width={w}
                height={v.conso}
                className="fill-foreground/25"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export { ProductionConsumptionChart };
