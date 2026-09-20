import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button arrow-shift inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] border border-transparent type-ui whitespace-nowrap outline-none select-none transition-[background-color,color,border-color,transform] duration-[160ms] ease-[var(--ease-state)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring motion-safe:active:scale-[0.985] motion-safe:active:duration-100 disabled:pointer-events-none disabled:bg-surface-muted disabled:text-ink-muted disabled:border-line [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-ink text-canvas hover:bg-dark-surface",
        citron: "bg-citron text-ink hover:bg-citron-hover",
        secondary:
          "bg-transparent text-ink border-control-line hover:bg-surface-muted",
        "secondary-dark":
          "bg-transparent text-canvas border-dark-muted/60 hover:bg-dark-surface hover:border-dark-muted",
        ghost: "bg-transparent text-ink hover:bg-surface-muted",
        text: "h-auto! px-0! text-ink link-underline rounded-none",
      },
      size: {
        default: "h-12 px-5",
        compact: "h-11 px-5",
        hero: "h-13 px-5",
        icon: "size-11 rounded-[8px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
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
