"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Link2, Sun, Table2, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PipelineSectionProps {
  className?: string;
}

const PipelineSection = ({ className }: PipelineSectionProps) => {
  const t = useTranslations("pipeline");

  const mockLeads = [
    { name: t("lead1"), addr: t("addr1"), kwp: "420", status: "new" as const, photo: "/lead-photo-1.png" },
    { name: t("lead2"), addr: t("addr2"), kwp: "847", status: "add" as const, photo: "/plateform-lyon-natural.png" },
    { name: t("lead3"), addr: t("addr3"), kwp: "312", status: "new" as const, photo: "/lead-photo-3.png" },
    { name: t("lead4"), addr: t("addr4"), kwp: "568", status: "add" as const, photo: "/lead-photo-4.png" },
    { name: t("lead5"), addr: t("addr5"), kwp: "720", status: "new" as const, photo: "/lead-photo-5.png" },
  ].map((lead) => ({
    ...lead,
    estProd: `${Math.round((Number(lead.kwp) * 1250) / 1000)} MWh`,
  }));

  return (
    <section className={cn("pt-8 pb-24 md:pt-24", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Minimalist leads table mockup */}
          <div className="order-2 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 lg:order-1">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px] text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
                    <th className="w-12 px-2 py-2 font-medium text-zinc-500">{t("photo")}</th>
                    <th className="max-w-[100px] px-2 py-2 font-medium text-zinc-500">{t("name")}</th>
                    <th className="max-w-[80px] px-2 py-2 font-medium text-zinc-500">{t("address")}</th>
                    <th className="px-2 py-2 font-medium text-zinc-500">kWp</th>
                    <th className="w-16 px-2 py-2 font-medium text-zinc-500">{t("status")}</th>
                    <th className="w-12 px-2 py-2 text-center font-medium text-zinc-500">
                      <span title={t("inverter")}><Zap className="mx-auto size-3.5" /></span>
                    </th>
                    <th className="w-12 px-2 py-2 text-center font-medium text-zinc-500">
                      <span title={t("panel")}><Sun className="mx-auto size-3.5" /></span>
                    </th>
                    <th className="px-2 py-2 font-medium text-zinc-500">{t("estProd")}</th>
                    <th className="w-12 px-2 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeads.map((lead, i) => (
                    <tr
                      key={i}
                      className="border-b border-zinc-100 dark:border-zinc-800"
                    >
                      <td className="w-12 px-2 py-2">
                        <img
                          src={lead.photo}
                          alt={lead.name}
                          className="size-8 rounded object-cover"
                        />
                      </td>
                      <td className="max-w-[100px] truncate px-2 py-2 font-medium" title={lead.name}>{lead.name}</td>
                      <td className="max-w-[80px] truncate px-2 py-2 text-zinc-500" title={lead.addr}>{lead.addr}</td>
                      <td className="px-2 py-2 font-mono">{lead.kwp}</td>
                      <td className="w-16 px-2 py-2">
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-[10px] font-medium",
                            lead.status === "new" && "bg-zinc-200 dark:bg-zinc-700"
                          )}
                          style={lead.status === "add" ? { backgroundColor: "#E4FE55", color: "#171717" } : undefined}
                        >
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="w-12 px-2 py-2 text-center">
                        <img
                          src="/inverter.webp"
                          alt={t("inverter")}
                          className="mx-auto size-6 rounded object-cover"
                        />
                      </td>
                      <td className="w-12 px-2 py-2 text-center">
                        <img
                          src="/panel.jpeg"
                          alt={t("panel")}
                          className="mx-auto size-6 rounded object-cover"
                        />
                      </td>
                      <td className="px-2 py-2 font-mono text-zinc-500">{lead.estProd}</td>
                      <td className="w-12 px-2 py-2 text-right">
                        <span
                          className="inline-flex size-7 items-center justify-center rounded-md"
                          aria-hidden="true"
                        >
                          <Link2 className="size-3.5 text-zinc-500" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Fenêtre d'illustration (infos de la ligne sélectionnée) */}
          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
                {t("title")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900/50">
                <div
                  className="flex size-8 shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: "#E4FE55" }}
                >
                  <Link2 className="size-4" style={{ color: "#171717" }} />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{t("instantShare")}</h3>
                  <p className="text-xs text-muted-foreground">{t("instantShareDesc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900/50">
                <div
                  className="flex size-8 shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: "#E4FE55" }}
                >
                  <Table2 className="size-4" style={{ color: "#171717" }} />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{t("tableView")}</h3>
                  <p className="text-xs text-muted-foreground">{t("tableViewDesc")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PipelineSection };
