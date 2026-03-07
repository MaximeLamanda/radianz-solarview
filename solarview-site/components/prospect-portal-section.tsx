"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Link2, Eye, Mail, Phone, Share2 } from "lucide-react";

interface ProspectPortalSectionProps {
  className?: string;
}

const ProspectPortalSection = ({ className }: ProspectPortalSectionProps) => {
  const t = useTranslations("prospect");

  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Right: Browser mockup */}
          <div className="order-2 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 lg:order-2">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-red-400" />
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="ml-4 flex-1 rounded-md bg-white px-3 py-1.5 font-mono text-xs text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                app.radianz.io/p/prospect-001
              </div>
              <button
                type="button"
                className="ml-2 flex size-8 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
                aria-label={t("share")}
              >
                <Share2 className="size-4 text-zinc-600 dark:text-zinc-400" />
              </button>
            </div>

            {/* Page content - max height + overflow for cut-off effect */}
            <div className="relative max-h-[420px] space-y-6 overflow-hidden p-6">
              {/* Zone personnalisable : votre logo */}
              <div
                className="absolute right-6 top-6 flex size-12 items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 text-[10px] font-medium text-zinc-500 dark:border-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400"
                title={t("yourLogo")}
              >
                {t("yourLogo")}
              </div>
              {/* Prospect header */}
              <div className="flex flex-col gap-1 pr-24">
                <h3 className="text-xl font-semibold">{t("prospectHeader")}</h3>
                <p className="text-sm text-zinc-500">{t("prospectAddr")}</p>
              </div>

              {/* Bento grid + fake content below */}
              <div className="space-y-2">
              <div className="grid min-h-[280px] grid-cols-2 gap-2 md:grid-cols-3 md:grid-rows-2">
                {/* Photo - mobile: full width 1 row, desktop: spans 2 rows */}
                <div className="relative order-1 col-span-2 row-span-1 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/50 md:order-none md:col-span-1 md:row-span-2">
                  <img
                    src="/top-photo.png"
                    alt="Solar installation"
                    className="size-full object-cover"
                  />
                  <span
                    className="absolute left-2 top-2 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium"
                    style={{ backgroundColor: "#E4FE55", color: "#171717" }}
                  >
                    2356 m²
                  </span>
                </div>
                {/* Metrics - mobile: Saving + Contact référent sous l'image (2 cols) */}
                <div className="order-4 rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50 md:order-none">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    {t("estimatedEnergyBill")}
                  </p>
                  <p className="text-lg font-semibold">135 k€/an</p>
                </div>
                <div className="order-5 rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50 md:order-none">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    {t("solarPotential")}
                  </p>
                  <p className="text-lg font-semibold">847 kWp</p>
                </div>
                <div className="order-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50 md:order-none">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    {t("annualSavings")}
                  </p>
                  <p className="text-lg font-semibold">108 k€</p>
                </div>
                <div className="order-3 flex min-h-[120px] flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50 md:order-none">
                  <p className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    {t("contactReferent")}
                  </p>
                  <div className="mt-auto flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/contact-referent.png"
                        alt={t("referent")}
                        width={36}
                        height={36}
                        className="size-9 shrink-0 rounded-full object-cover object-center"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[11px] font-medium">Marie Dubois</p>
                        <p className="truncate text-[10px] text-zinc-500">Lyon • m.dubois@radianz.io</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <a
                        href="tel:+33123456789"
                        className="flex flex-1 items-center justify-center gap-1 rounded bg-zinc-200 py-1 text-[10px] font-medium hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                        aria-label={t("call")}
                      >
                        <Phone className="size-3" />
                        Call
                      </a>
                      <a
                        href="mailto:m.dubois@radianz.io"
                        className="flex flex-1 items-center justify-center gap-1 rounded bg-zinc-200 py-1 text-[10px] font-medium hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                        aria-label={t("contact")}
                      >
                        <Mail className="size-3" />
                        Mail
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fake content below - partially visible, suggests more info */}
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-14 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/50"
                    />
                  ))}
                </div>
                <div className="h-20 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/50" />
                <div className="flex gap-2">
                  <div className="h-12 flex-1 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/50" />
                  <div className="h-12 flex-1 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/50" />
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Left: Text content */}
          <div className="order-1 flex flex-col gap-8 lg:order-1">
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
                  <Eye className="size-4" style={{ color: "#171717" }} />
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

export { ProspectPortalSection };
