import { Logo } from '@/components/logo'
import { Input } from '@/components/ui/input'
import { Kbd } from '@/components/ui/kbd'
import { useSearchHotkey } from '@/hooks/use-search-hotkey'
import { SearchIcon } from 'lucide-react'
import { useRef, useState } from 'react'

interface HeroProps {
    query: string
    onSearch: (value: string) => void
}

export function Hero({ query, onSearch }: HeroProps) {
    const searchRef = useRef<HTMLInputElement>(null)
    useSearchHotkey(searchRef)

    const [input, setInput] = useState(query)
    const [prevQuery, setPrevQuery] = useState(query)

    if (query !== prevQuery) {
        setPrevQuery(query)
        setInput(query)
    }

    return (
        <section className="mb-9">
            <div className="mb-3.5 flex items-center gap-3">
                <Logo size={28} withText={false} />
                <h1 className="font-mono text-3xl font-semibold tracking-tight">spark</h1>
            </div>
            <p className="text-muted-foreground mb-5 max-w-xl text-lg leading-normal">
                The fast, bundle manager.
                <br />
                No pm this is a bm.
            </p>

            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    onSearch(input.trim())
                }}
                role="search"
                className="relative max-w-xl"
            >
                <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2" />
                <Input
                    ref={searchRef}
                    type="search"
                    placeholder="Search bundles..."
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    className="h-12 rounded-lg pr-14 pl-11 text-sm"
                />
                <Kbd className="absolute top-1/2 right-3.5 -translate-y-1/2">⌘K</Kbd>
            </form>
        </section>
    )
}
