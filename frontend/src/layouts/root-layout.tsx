import { SiteNavbar } from '@/components/layout/site-navbar'
import { SiteSidebar } from '@/components/layout/site-sidebar'
import { Logo } from '@/components/logo'
import { PulseDot } from '@/components/ui/pulse-dot'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteNavbar />

            <div className="flex flex-1">
                <SiteSidebar />

                <main className="min-w-0 flex-1">
                    <Outlet />
                </main>
            </div>

            <footer className="bg-card border-border mt-auto border-t py-6">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6">
                    <div className="flex items-center gap-3.5">
                        <Logo />
                        <span className="text-muted-foreground text-xs">by Team Flare</span>
                    </div>
                    <div className="text-muted-foreground flex gap-[18px] text-[12.5px]">
                        <span className="inline-flex items-center gap-1.5">
                            <PulseDot size="sm" /> Status
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}
