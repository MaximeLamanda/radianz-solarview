import type { Locale } from "@/i18n/config";

export const SERVICE_IDS = ["audit-ia"] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const SERVICES: Record<
  ServiceId,
  {
    pathByLocale: Record<Locale, string>;
    primaryKeywordFr: string;
    primaryKeywordEn: string;
  }
> = {
  "audit-ia": {
    pathByLocale: {
      fr: "/services/audit-ia",
      en: "/services/ai-audit",
    },
    primaryKeywordFr: "audit IA",
    primaryKeywordEn: "AI audit",
  },
};

export function servicePath(locale: Locale, id: ServiceId): string {
  return SERVICES[id].pathByLocale[locale];
}
