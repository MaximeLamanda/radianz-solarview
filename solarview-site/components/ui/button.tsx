import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl text-sm font-semibold tracking-wide whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#E4FE55]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[#E4FE55] text-[#171717] hover:bg-[#d7f24f]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-zinc-700 bg-transparent text-zinc-200 hover:border-[#E4FE55]/50 hover:bg-[#E4FE55]/5",
        secondary:
          "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700",
        ghost:
          "hover:bg-[#E4FE55]/10 hover:text-foreground",
        link: "text-[#E4FE55] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 min-w-[140px] px-5 py-3 has-[>svg]:px-4",
        xs: "h-8 min-w-0 gap-1 rounded-lg px-2.5 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-10 min-w-[100px] px-4 py-2.5 gap-1.5 rounded-xl has-[>svg]:px-3",
        lg: "h-12 min-w-[160px] px-6 py-3 rounded-xl has-[>svg]:px-5",
        icon: "size-10 min-w-0 w-auto shrink-0 rounded-xl",
        "icon-xs": "size-7 min-w-0 w-auto shrink-0 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9 min-w-0 w-auto shrink-0 rounded-xl",
        "icon-lg": "size-11 min-w-0 w-auto shrink-0 rounded-xl",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        size: "icon",
        className: "border-0 bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600",
      },
      {
        variant: "outline",
        size: "icon-sm",
        className: "border-0 bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600",
      },
      {
        variant: "outline",
        size: "icon-lg",
        className: "border-0 bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600",
      },
    ],
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
