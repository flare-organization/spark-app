import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-[22px] w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border border-transparent px-2 py-0.5 font-mono text-[11px] font-medium tracking-[0.01em] whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
        tag: "border-primary/25 bg-primary/15 text-primary [a]:hover:bg-primary/25",
        success:
          "border-success/30 bg-success/15 text-success [a]:hover:bg-success/25",
        info: "border-info/30 bg-info/15 text-info [a]:hover:bg-info/25",
        warning:
          "border-warning/30 bg-warning/15 text-warning [a]:hover:bg-warning/25",
      },
      interactive: {
        true: "cursor-pointer",
        false: "",
      },
    },
    compoundVariants: [
      { variant: "default", interactive: true, class: "hover:bg-primary/80" },
      {
        variant: "secondary",
        interactive: true,
        class: "hover:bg-secondary/80",
      },
      {
        variant: "destructive",
        interactive: true,
        class: "hover:bg-destructive/20",
      },
      {
        variant: "outline",
        interactive: true,
        class: "hover:bg-muted hover:text-muted-foreground",
      },
      { variant: "tag", interactive: true, class: "hover:bg-primary/25" },
      { variant: "success", interactive: true, class: "hover:bg-success/25" },
      { variant: "info", interactive: true, class: "hover:bg-info/25" },
      { variant: "warning", interactive: true, class: "hover:bg-warning/25" },
    ],
    defaultVariants: {
      variant: "default",
      interactive: false,
    },
  },
)

function Badge({
  className,
  variant = "default",
  interactive = false,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant, interactive }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
