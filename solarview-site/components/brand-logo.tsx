import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/constants";

interface BrandLogoProps {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  wordmark?: string;
}

export function BrandLogo({
  className,
  markClassName,
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
        <span className="text-inherit font-medium tracking-tight">{wordmark}</span>
      ) : null}
    </span>
  );
}
