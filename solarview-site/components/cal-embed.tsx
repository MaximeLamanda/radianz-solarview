"use client";

import * as React from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { cn } from "@/lib/utils";

interface CalEmbedProps {
  calLink: string;
  className?: string;
}

export function CalEmbed({ calLink, className }: CalEmbedProps) {
  React.useEffect(() => {
    void (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          light: {},
          dark: {
            "cal-brand": "#eff9ba",
            "cal-brand-emphasis": "#e5f09e",
            "cal-brand-text": "#0a0a0a",
            "cal-brand-accent": "#0a0a0a",
            "cal-bg": "#000000",
            "cal-bg-emphasis": "#171717",
            "cal-bg-subtle": "#0a0a0a",
            "cal-bg-muted": "#0a0a0a",
            "cal-text": "#fafafa",
            "cal-text-emphasis": "#ffffff",
            "cal-text-subtle": "rgba(255,255,255,0.64)",
            "cal-text-muted": "rgba(255,255,255,0.45)",
            "cal-border": "rgba(255,255,255,0.10)",
            "cal-border-booker": "rgba(255,255,255,0.10)",
            radius: "0.75rem",
          },
        },
      });
    })();
  }, []);

  return (
    <div className={cn("min-h-[560px] w-full overflow-hidden", className)}>
      <Cal
        calLink={calLink}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", theme: "dark" }}
      />
    </div>
  );
}
