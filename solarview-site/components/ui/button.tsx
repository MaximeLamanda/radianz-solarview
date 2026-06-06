import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent font-mono text-xs font-medium uppercase tracking-wide whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-ink-2",
        lime:
          "bg-accent text-accent-foreground hover:bg-lime-hover",
        white:
          "bg-white text-ink hover:bg-white/90 focus-visible:ring-white/30",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border-border bg-card text-foreground hover:bg-muted",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-line",
        ghost:
          "text-foreground hover:bg-muted",
        link: "text-foreground underline-offset-4 normal-case hover:underline",
      },
      size: {
        default: "h-9 min-w-[120px] px-4 has-[>svg]:px-3",
        xs: "h-7 min-w-0 gap-1 rounded-md px-2.5 text-[10px] has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 min-w-[100px] px-3.5 text-[11px] has-[>svg]:px-2.5",
        fit: "h-9 min-w-0 rounded-md px-2.5 text-xs has-[>svg]:px-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 min-w-[140px] px-5 text-sm has-[>svg]:px-4",
        icon: "size-9 min-w-0 w-auto shrink-0",
        "icon-xs": "size-7 min-w-0 w-auto shrink-0 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 min-w-0 w-auto shrink-0",
        "icon-lg": "size-11 min-w-0 w-auto shrink-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
