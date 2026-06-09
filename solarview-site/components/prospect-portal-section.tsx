"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ProductionConsumptionChart } from "@/components/production-consumption-chart";
import { ArrowUpRight, Building2, Eye, Link2, Map, Share2 } from "lucide-react";

interface ProspectPortalSectionProps {
  className?: string;
}

const NAV_ITEMS = ["navRecap", "navBill", "navProject", "navFinance", "navContact"] as const;

const ProspectPortalSection = ({ className }: ProspectPortalSectionProps) => {
  const t = useTranslations("prospect");

  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="radianz-mockup order-2 max-md:max-h-[360px] lg:order-2">
            <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-3">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-red-400" />
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="ml-4 min-w-0 flex-1 truncate rounded-md bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground">
                app.radianz.io/p/prospect-001
              </div>
              <button
                type="button"
                className="ml-2 flex size-8 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-secondary"
                aria-label={t("share")}
              >
                <Share2 className="size-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex max-h-[280px] overflow-hidden md:max-h-[420px]">
              <aside className="hidden w-[132px] shrink-0 flex-col border-r border-border bg-muted/40 p-3 md:flex">
                <p className="radianz-label text-[9px]">{t("summary")}</p>
                <nav className="mt-3 space-y-2.5">
                  {NAV_ITEMS.map((key, i) => (
                    <p
                      key={key}
                      className={cn(
                        "text-[11px] leading-tight",
                        i === 0 ? "font-medium text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {t(key)}
                    </p>
                  ))}
                </nav>
                <button
                  type="button"
                  className="mt-auto flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-2 text-left transition-colors hover:bg-muted"
                >
                  <Image
                    src="/alexislej.jpeg"
                    alt={t("referent")}
                    width={28}
                    height={28}
                    className="size-7 shrink-0 rounded-full object-cover"
                  />
                  <span className="min-w-0 flex-1 truncate text-[10px] font-medium">{t("contact")}</span>
                  <ArrowUpRight className="size-3 shrink-0 text-muted-foreground" />
                </button>
              </aside>

              <div className="min-w-0 flex-1 space-y-2 overflow-hidden p-3">
                <div
                  className="relative overflow-hidden rounded-md bg-foreground px-3 py-3"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
                    backgroundSize: "8px 8px",
                  }}
                >
                  <p className="font-mono text-[8px] uppercase tracking-widest text-background/60">
                    RADIANZ
                  </p>
                  <p className="mt-1.5 text-lg font-medium tracking-tight text-background">
                    {t("hello")} <span aria-hidden="true">👋</span>
                  </p>
                  <p className="mt-0.5 text-[10px] text-background/70">{t("welcomePortal")}</p>
                </div>

                <div className="flex gap-2">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted sm:size-16">
                    <img
                      src="/amazon-plateform-lyon.webp"
                      alt={t("prospectHeader")}
                      width={64}
                      height={64}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-xs font-semibold uppercase tracking-wide">
                      {t("prospectHeader")}
                    </h3>
                    <p className="truncate text-[9px] text-muted-foreground">{t("prospectAddr")}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      <MetricPill value="1059" unit={t("annualProduction")} />
                      <MetricPill value="2,5" unit={t("co2Savings")} />
                      <MetricPill value="847" unit="kWp" />
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-1.5 border-t border-border pt-2">
                      <SurfaceStat
                        icon={<Building2 className="size-3 text-muted-foreground" />}
                        value="2356 m²"
                        label={t("surfaceBuilding")}
                      />
                      <SurfaceStat
                        icon={<Map className="size-3 text-muted-foreground" />}
                        value="4520 m²"
                        label={t("surfaceParcel")}
                      />
                    </div>
                  </div>
                </div>

                <ProductionConsumptionChart className="min-h-[88px] px-2.5 py-2 md:min-h-[120px] [&_span]:text-[9px] [&_svg]:min-h-[56px] md:[&_svg]:min-h-[72px]" />
              </div>
            </div>
          </div>

          <div className="order-1 flex flex-col gap-8 lg:order-1">
            <div>
              <h2 className="text-section">{t("title")}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
            </div>
            <div className="hidden flex-wrap gap-3 md:flex">
              <div className="radianz-info-card">
                <div className="radianz-highlight">
                  <Link2 className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{t("instantShare")}</h3>
                  <p className="text-xs text-muted-foreground">{t("instantShareDesc")}</p>
                </div>
              </div>
              <div className="radianz-info-card">
                <div className="radianz-highlight">
                  <Eye className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{t("liveView")}</h3>
                  <p className="text-xs text-muted-foreground">{t("liveViewDesc")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function MetricPill({ value, unit }: { value: string; unit: string }) {
  return (
    <span className="inline-flex items-baseline gap-0.5 rounded-full bg-foreground px-1.5 py-px font-mono text-[8px] text-background">
      <span className="font-semibold">{value}</span>
      <span className="text-background/70">{unit}</span>
    </span>
  );
}

function SurfaceStat({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {icon}
      <div className="min-w-0">
        <p className="text-[10px] font-medium leading-tight">{value}</p>
        <p className="radianz-label text-[7px] leading-tight">{label}</p>
      </div>
    </div>
  );
}

export { ProspectPortalSection };
