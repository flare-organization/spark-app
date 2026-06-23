import { cn } from '@/lib/utils'
import { SparklesIcon, UploadIcon, type LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface NavItem {
    to: string
    label: string
    icon: LucideIcon
    end?: boolean
}

const NAV_ITEMS: NavItem[] = [
    { to: '/', label: 'Discover', icon: SparklesIcon, end: true },
    { to: '/bundles/create', label: 'Publish', icon: UploadIcon },
]

export function SiteSidebar() {
    return (
        <nav className="bg-sidebar border-border sticky top-14 flex h-[calc(100vh-3.5rem)] w-[220px] shrink-0 flex-col gap-[18px] border-r px-3.5 py-5">
            <div className="text-muted-foreground px-2 font-mono text-[10.5px] tracking-[0.08em] uppercase">
                Navigation
            </div>

            <div className="flex flex-col gap-1">
                {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={({ isActive }) =>
                            cn(
                                'flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors',
                                isActive
                                    ? 'bg-primary/15 text-primary'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                            )
                        }
                    >
                        <Icon className="size-[15px]" />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </div>

            <div className="border-border mt-auto border-t px-2 pt-3.5">
                <div className="text-muted-foreground font-mono text-[10.5px]">
                    spark · team flare
                </div>
            </div>
        </nav>
    )
}
