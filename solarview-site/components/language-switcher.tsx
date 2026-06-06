"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useTransition } from "react";
import { locales } from "@/i18n/config";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FLAG_SRC: Record<string, string> = {
  en: "https://flagcdn.com/w40/gb.png",
  fr: "https://flagcdn.com/w40/fr.png",
};

const LABELS: Record<string, string> = {
  en: "English",
  fr: "Français",
};

function FlagRect({ locale }: { locale: string }) {
  const src = FLAG_SRC[locale] ?? FLAG_SRC.en;
  return (
    <span className="relative block h-4 w-6 shrink-0 overflow-hidden rounded border border-border/50">
      <Image
        src={src}
        alt=""
        width={24}
        height={16}
        className="h-full w-full object-cover"
        unoptimized
      />
    </span>
  );
}

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleSelect(newLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          disabled={isPending}
          className={cn(
            buttonVariants({ size: "fit" }),
            "gap-1 bg-white/10 text-xs font-mono font-medium normal-case tracking-normal text-white",
            "transition-colors hover:bg-white/15",
            "disabled:pointer-events-none disabled:opacity-40",
          )}
          aria-label={LABELS[locale]}
        >
          <FlagRect locale={locale} />
          <ChevronDown className="size-4 shrink-0 opacity-60" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-0 w-[var(--radix-popper-anchor-width)] border-border bg-line p-1 shadow-md"
      >
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleSelect(loc)}
            aria-label={LABELS[loc]}
            className={cn(
              "cursor-pointer justify-center gap-0 rounded-md p-1.5",
              "hover:bg-line-2 focus:bg-line-2",
              loc === locale && "bg-line-2",
            )}
          >
            <FlagRect locale={loc} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
