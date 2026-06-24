import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Kbd } from '@/components/ui/kbd'
import { useSearchHotkey } from '@/hooks/use-search-hotkey'
import { useTheme } from '@/hooks/use-theme'
import { MoonIcon, SearchIcon, SunIcon } from 'lucide-react'
import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()
    const isDark = theme === 'mocha'

    return (
        <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(isDark ? 'latte' : 'mocha')}
            aria-label={`Theme: ${isDark ? 'Mocha · dark' : 'Latte · light'}`}
        >
            {isDark ? <MoonIcon /> : <SunIcon />}
        </Button>
    )
}

export function SiteNavbar() {
    const searchRef = useRef<HTMLInputElement>(null)
    useSearchHotkey(searchRef)

    const isHome = useLocation().pathname === '/'

    return (
        <header className="bg-background/85 border-border sticky top-0 z-40 flex h-14 items-center gap-6 border-b px-6 backdrop-blur-md">
            <Link to="/" className="flex items-center" aria-label="Spark home">
                <Logo />
            </Link>

            <div className="mx-auto flex w-full max-w-md flex-1 justify-center">
                {!isHome && (
                    <div className="relative w-full">
                        <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                        <Input
                            ref={searchRef}
                            type="search"
                            placeholder="Search bundles"
                            className="h-9 pr-12 pl-9 text-sm"
                        />
                        <Kbd className="absolute top-1/2 right-2.5 -translate-y-1/2">⌘K</Kbd>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2">
                <ThemeSwitcher />
                <Button variant="ghost" size="sm" asChild>
                    <Link to="/login">Sign in</Link>
                </Button>
                <Button size="sm" asChild>
                    <Link to="/signup">Register</Link>
                </Button>
            </div>
        </header>
    )
}
