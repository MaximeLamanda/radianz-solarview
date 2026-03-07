"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { locales } from "@/i18n/config";

export function LocaleHtmlUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    const segment = pathname?.split("/")[1];
    const locale = segment && locales.includes(segment as "en" | "fr") ? segment : "en";
    document.documentElement.lang = locale;
  }, [pathname]);

  return null;
}
