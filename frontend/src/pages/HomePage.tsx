import { Link } from 'react-router-dom'
import { useTheme } from '@/hooks/use-theme'
import { Button } from '@/components/ui/button'

export default function HomePage() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6">
            <h1 className="text-3xl font-bold">Home</h1>
            <Link to="/about" className="text-primary underline underline-offset-4">
                Go to About
            </Link>
            <div className="flex items-center gap-3">
                <span className="text-muted-foreground text-sm">Theme</span>
                <Button
                    size="sm"
                    variant={theme === 'latte' ? 'default' : 'outline'}
                    onClick={() => setTheme('latte')}
                >
                    Latte
                </Button>
                <Button
                    size="sm"
                    variant={theme === 'mocha' ? 'default' : 'outline'}
                    onClick={() => setTheme('mocha')}
                >
                    Mocha
                </Button>
            </div>
        </div>
    )
}
