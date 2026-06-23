import { cn } from '@/lib/utils'

interface LogoProps {
    size?: number
    withText?: boolean
    className?: string
}

export function Logo({ size = 20, withText = true, className }: LogoProps) {
    return (
        <span className={cn('inline-flex items-center gap-2', className)}>
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"
                    className="fill-primary stroke-primary"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                />
            </svg>
            {withText && (
                <span className="font-mono text-[15px] font-semibold tracking-tight">spark</span>
            )}
        </span>
    )
}
