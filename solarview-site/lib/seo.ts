import { locales } from "@/i18n/config";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://radianz.tech";

export function localePath(locale: string, path = ""): string {
  return path ? `/${locale}${path}` : `/${locale}`;
}

export function hreflangAlternates(path = ""): Record<string, string> {
  return Object.fromEntries(locales.map((loc) => [loc, localePath(loc, path)]));
}
