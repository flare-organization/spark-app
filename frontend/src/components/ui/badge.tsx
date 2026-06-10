import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
    'group/badge inline-flex h-[22px] w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm border border-transparent px-2 text-[11px] font-medium tracking-wide whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30',
                outline: 'border-border text-foreground hover:bg-muted hover:text-muted-foreground',
                ghost: 'hover:bg-muted hover:text-muted-foreground',
                version: 'bg-muted text-muted-foreground font-mono tracking-normal',
                latest: 'border-success/30 bg-success/15 text-success',
                tag: 'border-primary/20 bg-primary/10 text-primary hover:bg-primary/15 hover:border-primary/30',
                deprecated: 'border-destructive/25 bg-destructive/10 text-destructive',
                info: 'border-info/30 bg-info/15 text-info',
                trending: 'border-primary/20 bg-primary/10 text-primary font-medium',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
)

function Badge({
    className,
    variant = 'default',
    asChild = false,
    ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
    const Comp = asChild ? Slot.Root : 'span'

    return (
        <Comp
            data-slot="badge"
            data-variant={variant}
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        />
    )
}

export { Badge, badgeVariants }
