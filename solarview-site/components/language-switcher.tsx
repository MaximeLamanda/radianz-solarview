"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useTransition } from "react";
import { locales } from "@/i18n/config";
import Image from "next/image";

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
    <span className="relative block w-6 h-4 rounded overflow-hidden shrink-0 border border-border/50">
      <Image
        src={src}
        alt=""
        width={24}
        height={16}
        className="object-cover w-full h-full"
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
        <Button
          variant="outline"
          size="xs"
          className="h-9 min-w-0 !px-2 gap-1.5 border-0 bg-zinc-200 text-black hover:bg-zinc-300 [&_svg]:text-black"
          disabled={isPending}
        >
          <FlagRect locale={locale} />
          <ChevronDown className="size-4 text-black" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-0 bg-zinc-200 shadow-md p-1 min-w-0 w-[var(--radix-popper-anchor-width)]">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleSelect(loc)}
            aria-label={LABELS[loc]}
            className="gap-0 justify-center p-1.5 cursor-pointer hover:bg-zinc-300 focus:bg-zinc-300 rounded"
          >
            <FlagRect locale={loc} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
