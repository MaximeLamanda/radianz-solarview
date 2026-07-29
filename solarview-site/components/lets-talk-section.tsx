"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CalEmbed } from "@/components/cal-embed";
import { getCalLink } from "@/lib/cal";

interface LetsTalkSectionProps {
  className?: string;
  success?: boolean;
  error?: "config" | "send";
  locale?: string;
  asPageTitle?: boolean;
}

export function LetsTalkSection({ className, asPageTitle = false }: LetsTalkSectionProps) {
  const t = useTranslations("contact");
  const calLink = getCalLink();
  const HeadlineTag = asPageTitle ? "h1" : "p";

  return (
    <section className={cn("bg-white py-16 md:py-24", className)}>
      <div className="container">
        <div className="mb-8 flex justify-center">
          <Badge variant="outline" className="shrink-0 font-mono text-xs uppercase tracking-wider">
            {t("badge")}
          </Badge>
        </div>

        <div className="flex w-full flex-col overflow-hidden rounded-[1.75rem] bg-black text-white">
          <div className="grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-stretch">
            <div className="flex flex-col justify-between gap-8 border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8 2xl:p-10">
              <HeadlineTag className="text-3xl font-light leading-[1.04] tracking-[-0.04em] md:text-4xl 2xl:text-[2.75rem]">
                {t("headline1")}
                <br />
                <span className="text-white/62">{t("headline2")}</span>
              </HeadlineTag>
              <p className="max-w-md text-sm leading-relaxed text-white/55">{t("introText")}</p>
              <div
                aria-hidden="true"
                className="min-h-48 flex-1 rounded-2xl border border-white/10 bg-white/[0.04] md:min-h-64"
              />
            </div>

            <div className="flex flex-col p-4 md:p-6 2xl:p-8">
              {calLink ? (
                <CalEmbed calLink={calLink} />
              ) : (
                <div className="flex min-h-[320px] flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-6 text-center text-sm text-white/60">
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
