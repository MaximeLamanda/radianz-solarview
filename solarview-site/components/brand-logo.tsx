import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/constants";

interface BrandLogoProps {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  showWordmark?: boolean;
  wordmark?: string;
}

export function BrandLogo({
  className,
  markClassName,
  wordmarkClassName,
  showWordmark = true,
  wordmark = BRAND.logoAlt,
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-foreground", className)}>
      <img
        src={BRAND.logoSrc}
        alt={BRAND.logoAlt}
        width={28}
        height={20}
        className={cn("h-5 w-auto shrink-0", markClassName)}
      />
      {showWordmark ? (
        <span className={cn("font-semibold tracking-tight", wordmarkClassName)}>{wordmark}</span>
      ) : null}
    </span>
  );
}
