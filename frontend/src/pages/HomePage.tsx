import { Logo } from '@/components/logo'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Kbd } from '@/components/ui/kbd'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination.tsx'
import { getBundles } from '@/services/bundleService'
import type { Bundle } from '@openapi/model/bundle.ts'
import type { PaginatedBundles } from '@openapi/model/paginatedBundles.ts'
import type { SlicedPagination } from '@openapi/model/slicedPagination.ts'
import { SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

function bundleInitials(name: string): string {
    const parts = name.split(/[\s-_]+/).filter(Boolean)
    const letters = parts.length >= 2 ? parts[0][0] + parts[1][0] : name.slice(0, 2)
    return letters.toUpperCase()
}

function BundleCard({ bundle }: { bundle: Bundle }) {
    return (
        <Card className="flex-row items-start gap-3.5 p-5">
            <Avatar size="lg">
                <AvatarFallback>{bundleInitials(bundle.name)}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-primary font-mono text-[15px] leading-none font-semibold tracking-tight">
                    {bundle.name}
                </span>
                {bundle.description && (
                    <CardDescription className="line-clamp-2 text-[13px] leading-relaxed">
                        {bundle.description}
                    </CardDescription>
                )}
            </div>
        </Card>
    )
}

export default function HomePage() {
    const [error, setError] = useState<string | null>(null)
    const [bundles, setBundles] = useState<Bundle[]>([])
    const [paginationDetails, setPaginationDetails] = useState<SlicedPagination>({
        isEmpty: true,
        isFirst: true,
        isLast: true,
        pageNumber: 0,
        pageSize: 0,
    })

    function previousPage(): void {
        if (!paginationDetails.isFirst && paginationDetails.pageNumber > 0) {
            setPaginationDetails((prevState) => ({
                ...prevState,
                pageNumber: paginationDetails.pageNumber - 1,
            }))
        }
    }

    function nextPage(): void {
        if (!paginationDetails.isLast) {
            setPaginationDetails((prevState) => ({
                ...prevState,
                pageNumber: paginationDetails.pageNumber + 1,
            }))
        }
    }

    useEffect(() => {
        getBundles(paginationDetails.pageNumber)
            .then((res: PaginatedBundles) => {
                const { content, ...paginationDetails } = res

                setBundles(content)
                setPaginationDetails(paginationDetails)
            })
            .catch(() => setError('Could not load bundles'))
    }, [paginationDetails.pageNumber])

    return (
        <div className="mx-auto max-w-[1200px] px-6 pt-10 pb-20">
            {/* Hero */}
            <section className="mb-9">
                <div className="mb-3.5 flex items-center gap-3">
                    <Logo size={28} withText={false} />
                    <h1 className="font-mono text-[32px] font-semibold tracking-tight">spark</h1>
                </div>
                <p className="text-muted-foreground mb-[22px] max-w-[560px] text-[17px] leading-normal">
                    The fast, bundle manager.
                    <br />
                    No pm this is a bm.
                </p>

                <div className="relative max-w-[620px]">
                    <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-[17px] -translate-y-1/2" />
                    <Input
                        type="search"
                        placeholder="Search bundles..."
                        className="h-12 rounded-lg pr-14 pl-11 text-[15px]"
                    />
                    <Kbd className="absolute top-1/2 right-3.5 -translate-y-1/2">⌘K</Kbd>
                </div>
            </section>

            {/* Listing */}
            <section>
                <div className="mb-4">
                    <h2 className="font-mono text-lg font-semibold tracking-tight">
                        Discover bundles
                    </h2>
                    <p className="text-muted-foreground mt-1 text-[12.5px]">
                        {bundles.length} bundle{bundles.length === 1 ? '' : 's'} · updated
                        continuously
                    </p>
                </div>

                {error && <p className="text-destructive text-sm">{error}</p>}

                {bundles.length === 0 && !error && (
                    <p className="text-muted-foreground text-sm">No bundles yet.</p>
                )}

                <div className="grid [grid-template-columns:repeat(auto-fill,minmax(340px,1fr))] gap-[18px]">
                    {bundles.map((bundle) => (
                        <BundleCard key={bundle.id} bundle={bundle} />
                    ))}
                </div>

                <Pagination className="mt-7">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={previousPage}
                                isActive={!paginationDetails.isFirst}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                onClick={nextPage}
                                isActive={!paginationDetails.isLast}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </section>
        </div>
    )
}
