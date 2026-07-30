"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { CalEmbed } from "@/components/cal-embed";
import { getCalLink } from "@/lib/cal";

interface LetsTalkSectionProps {
  className?: string;
  asPageTitle?: boolean;
}

export function LetsTalkSection({ className, asPageTitle = false }: LetsTalkSectionProps) {
  const t = useTranslations("contact");
  const calLink = getCalLink();
  const HeadlineTag = asPageTitle ? "h1" : "p";

  return (
    <section className={cn("bg-white py-16 md:py-24", className)}>
      <div className="container">
        <div className="flex w-full flex-col overflow-hidden rounded-[1.75rem] bg-black text-white">
          <div className="grid md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] md:items-stretch">
            <div className="flex flex-col justify-between gap-8 border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8 2xl:p-10">
              <HeadlineTag className="text-3xl font-light leading-[1.04] tracking-[-0.04em] md:text-4xl 2xl:text-[2.75rem]">
                {t("headline1")}
                <br />
                <span className="text-white/62">{t("headline2")}</span>
              </HeadlineTag>
              <p className="max-w-md text-sm leading-relaxed text-white/55">{t("introText")}</p>
              <div className="relative min-h-48 flex-1 overflow-hidden rounded-2xl border border-white/10 md:min-h-64">
                {/* eslint-disable-next-line @next/next/no-img-element -- mesh décoratif plein cadre */}
                <img
                  src="/use-cases/mesh-roi.png"
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/70 via-black/35 to-transparent"
                  aria-hidden
                />
                <div className="relative z-10 flex h-full min-h-48 flex-col justify-end gap-2 p-6 md:min-h-64 md:p-8">
                  <p className="text-6xl font-light leading-none tracking-tight text-white md:text-7xl 2xl:text-8xl">
                    {t("roiPanel.figure")}
                  </p>
                  <p className="text-sm text-white/80 md:text-base">{t("roiPanel.label")}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 md:p-6 2xl:p-8">
              {calLink ? (
                <CalEmbed calLink={calLink} className="max-w-[360px]" />
              ) : (
                <div className="flex min-h-[320px] w-full max-w-[360px] flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-6 text-center text-sm text-white/60">
                  {t("bookingUnavailable")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
