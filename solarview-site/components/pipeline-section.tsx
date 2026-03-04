"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, MapPin, Sun, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PipelineSectionProps {
  className?: string;
}

const PipelineSection = ({ className }: PipelineSectionProps) => {
  // Est. prod ≈ 1200-1300 kWh/kWp/an en France (en MWh)
  const mockLeads = [
    { name: "Entrepôt Logistique Lyon", addr: "Lyon • Auvergne-Rhône-Alpes", kwp: "420", status: "new" as const, photo: "/lead-photo-1.png" },
    { name: "Plateforme Amazon Lyon", addr: "Saint-Priest • 69", kwp: "847", status: "add" as const, photo: "/lead-photo-2.png" },
    { name: "Zone Industrielle Nantes", addr: "Nantes • Pays de la Loire", kwp: "312", status: "new" as const, photo: "/lead-photo-3.png" },
    { name: "Agroalimentaire Lille", addr: "Lille • Hauts-de-France", kwp: "568", status: "add" as const, photo: "/lead-photo-4.png" },
    { name: "Entrepôt Carrefour Toulouse", addr: "Toulouse • Occitanie", kwp: "720", status: "new" as const, photo: "/lead-photo-5.png" },
  ].map((lead) => ({
    ...lead,
    estProd: `${Math.round((Number(lead.kwp) * 1250) / 1000)} MWh`,
  }));

  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Minimalist leads table mockup */}
          <div className="order-2 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 lg:order-1">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px] text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
                    <th className="w-12 px-2 py-2 font-medium text-zinc-500">Photo</th>
                    <th className="max-w-[100px] px-2 py-2 font-medium text-zinc-500">Nom</th>
                    <th className="max-w-[80px] px-2 py-2 font-medium text-zinc-500">Adresse</th>
                    <th className="px-2 py-2 font-medium text-zinc-500">kWp</th>
                    <th className="w-16 px-2 py-2 font-medium text-zinc-500">Statut</th>
                    <th className="w-12 px-2 py-2 text-center font-medium text-zinc-500">
                      <Zap className="mx-auto size-3.5" title="Onduleur" />
                    </th>
                    <th className="w-12 px-2 py-2 text-center font-medium text-zinc-500">
                      <Sun className="mx-auto size-3.5" title="Panel" />
                    </th>
                    <th className="px-2 py-2 font-medium text-zinc-500">Est. prod</th>
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
                          alt="Onduleur"
                          className="mx-auto size-6 rounded object-cover"
                        />
                      </td>
                      <td className="w-12 px-2 py-2 text-center">
                        <img
                          src="/panel.jpeg"
                          alt="Panel"
                          className="mx-auto size-6 rounded object-cover"
                        />
                      </td>
                      <td className="px-2 py-2 font-mono text-zinc-500">{lead.estProd}</td>
                      <td className="w-12 px-2 py-2 text-right">
                        <a
                          href="#"
                          className="inline-flex size-7 items-center justify-center rounded-md transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          aria-label="Voir"
                        >
                          <ArrowUpRight className="size-3.5 text-zinc-500" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Text content */}
          <div className="order-1 flex flex-col gap-8 lg:order-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
                From lead to pipeline in one view
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Track your solar prospects with a unified pipeline. Building data, kWp, inverter and panel specs, and estimated production — all in one place.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900/50">
                <div
                  className="flex size-8 shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: "#E4FE55" }}
                >
                  <MapPin className="size-4" style={{ color: "#171717" }} />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Location-first</h3>
                  <p className="text-xs text-muted-foreground">Address and region at a glance</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900/50">
                <div
                  className="flex size-8 shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: "#E4FE55" }}
                >
                  <Zap className="size-4" style={{ color: "#171717" }} />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Tech specs</h3>
                  <p className="text-xs text-muted-foreground">kWp, inverter & panel details</p>
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
