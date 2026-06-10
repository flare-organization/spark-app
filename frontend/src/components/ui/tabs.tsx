'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Tabs as TabsPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

function Tabs({
    className,
    orientation = 'horizontal',
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
    return (
        <TabsPrimitive.Root
            data-slot="tabs"
            data-orientation={orientation}
            className={cn('group/tabs flex gap-2 data-horizontal:flex-col', className)}
            {...props}
        />
    )
}

const tabsListVariants = cva(
    'group/tabs-list inline-flex items-center justify-center text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col',
    {
        variants: {
            variant: {
                default: 'w-fit rounded-lg p-[3px] bg-muted group-data-horizontal/tabs:h-8',
                line: 'w-full rounded-none p-0 bg-transparent border-b border-border',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
)

function TabsList({
    className,
    variant = 'default',
    ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
    return (
        <TabsPrimitive.List
            data-slot="tabs-list"
            data-variant={variant}
            className={cn(tabsListVariants({ variant }), className)}
            {...props}
        />
    )
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
    return (
        <TabsPrimitive.Trigger
            data-slot="tabs-trigger"
            className={cn(
                'relative inline-flex cursor-pointer items-center justify-center gap-1.5 text-sm font-medium whitespace-nowrap transition-colors select-none',
                'focus-visible:ring-ring/50 focus-visible:ring-3 focus-visible:outline-none',
                'disabled:pointer-events-none disabled:opacity-50',
                'has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1',
                "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

                'group-data-[variant=default]/tabs-list:h-[calc(100%-1px)]',
                'group-data-[variant=default]/tabs-list:flex-1',
                'group-data-[variant=default]/tabs-list:rounded-md',
                'group-data-[variant=default]/tabs-list:border group-data-[variant=default]/tabs-list:border-transparent',
                'group-data-[variant=default]/tabs-list:px-2 group-data-[variant=default]/tabs-list:py-0.5',
                'group-data-[variant=default]/tabs-list:text-foreground/60',
                'group-data-[variant=default]/tabs-list:hover:text-foreground',
                'group-data-[variant=default]/tabs-list:data-active:bg-background',
                'group-data-[variant=default]/tabs-list:data-active:text-foreground',
                'group-data-[variant=default]/tabs-list:data-active:shadow-sm',
                'dark:group-data-[variant=default]/tabs-list:text-muted-foreground',
                'dark:group-data-[variant=default]/tabs-list:hover:text-foreground',
                'dark:group-data-[variant=default]/tabs-list:data-active:border-input',
                'dark:group-data-[variant=default]/tabs-list:data-active:bg-input/30',
                'dark:group-data-[variant=default]/tabs-list:data-active:text-foreground',
                'group-data-vertical/tabs:group-data-[variant=default]/tabs-list:w-full',
                'group-data-vertical/tabs:group-data-[variant=default]/tabs-list:justify-start',

                'group-data-[variant=line]/tabs-list:px-3.5 group-data-[variant=line]/tabs-list:py-3',
                'group-data-[variant=line]/tabs-list:rounded-none',
                'group-data-[variant=line]/tabs-list:border-b-2',
                'group-data-[variant=line]/tabs-list:border-transparent',
                'group-data-[variant=line]/tabs-list:-mb-px',
                'group-data-[variant=line]/tabs-list:bg-transparent',
                'group-data-[variant=line]/tabs-list:text-muted-foreground',
                'group-data-[variant=line]/tabs-list:hover:text-foreground',
                'group-data-[variant=line]/tabs-list:data-active:text-primary',
                'group-data-[variant=line]/tabs-list:data-active:border-primary',

                className,
            )}
            {...props}
        />
    )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
    return (
        <TabsPrimitive.Content
            data-slot="tabs-content"
            className={cn('flex-1 text-sm outline-none', className)}
            {...props}
        />
    )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
