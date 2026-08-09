import { Check } from "lucide-react";

import { SiriOrb } from "@/components/siri-orb";
import { cn } from "@/lib/utils";

type UrlRow = {
  url: string;
  status: "done" | "pending";
  statusLabel: string;
};

interface AgentUrlAnalyzerIllustrationProps {
  className?: string;
  panelLabel?: string;
  urls?: UrlRow[];
}

const DEFAULT_URLS: UrlRow[] = [
  {
    url: "articles/loi-aper-2026",
    status: "done",
    statusLabel: "Analysé",
  },
  {
    url: "articles/audit-ia-entreprise-2026",
    status: "done",
    statusLabel: "Analysé",
  },
  {
    url: "articles/autoconsommation-pme",
    status: "pending",
    statusLabel: "En cours",
  },
];

export function AgentUrlAnalyzerIllustration({
  className,
  panelLabel = "Agent · Articles",
  urls = DEFAULT_URLS,
}: AgentUrlAnalyzerIllustrationProps) {
  return (
    <div
      className={cn(
        "flex w-[68%] flex-col items-center transition-transform duration-500 ease-out group-hover:scale-105 group-focus-within:scale-105",
        className,
      )}
    >
      <div className="relative z-0 -mb-7 -translate-y-3">
        <SiriOrb size="88px" animationDuration={18} className="drop-shadow-md" />
      </div>

      <div className="relative z-10 w-full rounded-md border border-border bg-card p-1.5 shadow-sm">
        <p className="mb-1.5 px-1 font-mono text-[8px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {panelLabel}
        </p>
        <ul className="flex flex-col gap-1">
          {urls.map((row) => (
            <li
              key={row.url}
              className="flex items-center gap-1.5 rounded-md bg-muted/80 px-1.5 py-1"
            >
              {row.status === "done" ? (
                <span className="inline-flex size-3.5 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                  <Check className="size-2" strokeWidth={3} />
                </span>
              ) : (
                <span className="size-3.5 shrink-0 rounded-full border border-foreground/30 bg-transparent" />
              )}
              <span className="min-w-0 flex-1 truncate font-mono text-[9px] text-foreground/80">
                {row.url}
              </span>
              <span
                className={cn(
                  "shrink-0 font-mono text-[8px] uppercase tracking-wide",
                  row.status === "done"
                    ? "text-muted-foreground"
                    : "text-foreground",
                )}
              >
                {row.statusLabel}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
