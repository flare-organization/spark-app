import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const pulseDotVariants = cva('shrink-0 rounded-full animate-[pulse-ring_2s_ease-in-out_infinite]', {
    variants: {
        variant: {
            online: 'bg-success [--pulse-color:var(--color-success)]',
            offline: 'bg-muted-foreground [animation:none]',
            busy: 'bg-destructive [--pulse-color:var(--color-destructive)]',
            away: 'bg-[oklch(0.799_0.1526_52)] dark:bg-[oklch(0.9139_0.099_87)] [--pulse-color:oklch(0.799_0.1526_52)]',
        },
        size: {
            sm: 'size-1.5',
            default: 'size-2',
            lg: 'size-2.5',
        },
    },
    defaultVariants: {
        variant: 'online',
        size: 'default',
    },
})

function PulseDot({
    className,
    variant,
    size,
    ...props
}: React.ComponentProps<'span'> & VariantProps<typeof pulseDotVariants>) {
    return (
        <span
            data-slot="pulse-dot"
            data-variant={variant}
            className={cn(pulseDotVariants({ variant, size }), className)}
            {...props}
        />
    )
}

export { PulseDot }
