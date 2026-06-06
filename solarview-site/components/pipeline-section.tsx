"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Battery, Eye, Link2, Sun, Table2, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PipelineSectionProps {
  className?: string;
}

type LeadStatus = "ouvert" | "cree";

interface MockLead {
  name: string;
  addr: string;
  kwp: string;
  status: LeadStatus;
  photo: string;
  views: number | null;
  contacts: string[];
  hasBattery: boolean;
  estProd: string;
}

function ViewIndicator({ count }: { count: number | null }) {
  if (count === null) {
    return <span className="font-mono text-[10px] text-muted-foreground">—</span>;
  }

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "size-1.5 rounded-full",
            i < count ? "bg-green-500" : "bg-muted-foreground/20"
          )}
        />
      ))}
      <span className="ml-0.5 min-w-[8px] font-mono text-[10px] text-muted-foreground">
        {count}
      </span>
    </div>
  );
}

function ContactAvatars({ contacts }: { contacts: string[] }) {
  return (
    <div className="flex -space-x-1">
      {contacts.map((initials) => (
        <span
          key={initials}
          className="inline-flex size-5 items-center justify-center rounded-full border border-background bg-muted font-mono text-[8px] font-medium uppercase"
          title={initials}
        >
          {initials}
        </span>
      ))}
    </div>
  );
}

const PipelineSection = ({ className }: PipelineSectionProps) => {
  const t = useTranslations("pipeline");

  const mockLeads: MockLead[] = [
    {
      name: t("lead1"),
      addr: t("addr1"),
      kwp: "420",
      status: "ouvert",
      photo: "/lead-photo-1.png",
      views: 2,
      contacts: ["ML", "JD"],
      hasBattery: true,
    },
    {
      name: t("lead2"),
      addr: t("addr2"),
      kwp: "847",
      status: "cree",
      photo: "/plateform-lyon-natural.png",
      views: 0,
      contacts: ["AS"],
      hasBattery: false,
    },
    {
      name: t("lead3"),
      addr: t("addr3"),
      kwp: "312",
      status: "ouvert",
      photo: "/lead-photo-3.png",
      views: 3,
      contacts: ["PL", "SM", "TK"],
      hasBattery: true,
    },
    {
      name: t("lead4"),
      addr: t("addr4"),
      kwp: "568",
      status: "cree",
      photo: "/lead-photo-4.png",
      views: null,
      contacts: ["RC"],
      hasBattery: false,
    },
    {
      name: t("lead5"),
      addr: t("addr5"),
      kwp: "720",
      status: "ouvert",
      photo: "/lead-photo-5.png",
      views: 1,
      contacts: ["FB", "LC"],
      hasBattery: true,
    },
  ].map((lead) => ({
    ...lead,
    estProd: `${Math.round((Number(lead.kwp) * 1250) / 1000)} MWh`,
  }));

  const statusLabel = (status: LeadStatus) =>
    status === "ouvert" ? t("statusOpen") : t("statusCreated");

  return (
    <section className={cn("pt-8 pb-24 md:pt-24", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="radianz-mockup order-2 lg:order-1">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="w-12 px-2 py-2 font-mono font-medium text-muted-foreground">{t("photo")}</th>
                    <th className="max-w-[90px] px-2 py-2 font-mono font-medium text-muted-foreground">{t("name")}</th>
                    <th className="max-w-[72px] px-2 py-2 font-mono font-medium text-muted-foreground">{t("address")}</th>
                    <th className="w-16 px-2 py-2 text-center font-mono font-medium text-muted-foreground">
                      <span title={t("views")}><Eye className="mx-auto size-3.5" /></span>
                    </th>
                    <th className="w-16 px-2 py-2 font-mono font-medium text-muted-foreground">{t("status")}</th>
                    <th className="w-14 px-2 py-2 font-mono font-medium text-muted-foreground">{t("contacts")}</th>
                    <th className="px-2 py-2 font-mono font-medium text-muted-foreground">kWp</th>
                    <th className="w-10 px-2 py-2 text-center font-mono font-medium text-muted-foreground">
                      <span title={t("inverter")}><Zap className="mx-auto size-3.5" /></span>
                    </th>
                    <th className="w-10 px-2 py-2 text-center font-mono font-medium text-muted-foreground">
                      <span title={t("panel")}><Sun className="mx-auto size-3.5" /></span>
                    </th>
                    <th className="w-10 px-2 py-2 text-center font-mono font-medium text-muted-foreground">
                      <span title={t("battery")}><Battery className="mx-auto size-3.5" /></span>
                    </th>
                    <th className="px-2 py-2 font-mono font-medium text-muted-foreground">{t("estProd")}</th>
                    <th className="w-10 px-2 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeads.map((lead, i) => (
                    <tr key={i} className="border-b border-border">
                      <td className="w-12 px-2 py-2">
                        <img
                          src={lead.photo}
                          alt={lead.name}
                          className="size-8 rounded object-cover"
                        />
                      </td>
                      <td className="max-w-[90px] truncate px-2 py-2 font-medium" title={lead.name}>{lead.name}</td>
                      <td className="max-w-[72px] truncate px-2 py-2 text-muted-foreground" title={lead.addr}>{lead.addr}</td>
                      <td className="w-16 px-2 py-2 text-center">
                        <ViewIndicator count={lead.views} />
                      </td>
                      <td className="w-16 px-2 py-2">
                        <Badge
                          variant="outline"
                          className="rounded-md px-1.5 py-0.5 text-[9px] font-semibold normal-case"
                        >
                          {statusLabel(lead.status)}
                        </Badge>
                      </td>
                      <td className="w-14 px-2 py-2">
                        <ContactAvatars contacts={lead.contacts} />
                      </td>
                      <td className="px-2 py-2 font-mono">{lead.kwp}</td>
                      <td className="w-10 px-2 py-2 text-center">
                        <img
                          src="/inverter.webp"
                          alt={t("inverter")}
                          className="mx-auto size-6 rounded object-cover"
                        />
                      </td>
                      <td className="w-10 px-2 py-2 text-center">
                        <img
                          src="/panel.jpeg"
                          alt={t("panel")}
                          className="mx-auto size-6 rounded object-cover"
                        />
                      </td>
                      <td className="w-10 px-2 py-2 text-center">
                        {lead.hasBattery ? (
                          <img
                            src="/battery.png"
                            alt={t("battery")}
                            className="mx-auto size-6 rounded object-cover"
                          />
                        ) : (
                          <span className="font-mono text-[10px] text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-2 py-2 font-mono text-muted-foreground">{lead.estProd}</td>
                      <td className="w-10 px-2 py-2 text-right">
                        <span
                          className="inline-flex size-7 items-center justify-center rounded-md"
                          aria-hidden="true"
                        >
                          <Link2 className="size-3.5 text-muted-foreground" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <div>
              <h2 className="text-section">{t("title")}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
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
                  <Table2 className="size-4" />
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
