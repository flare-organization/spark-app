import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardDescription } from '@/components/ui/card'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination.tsx'
import type { Bundle } from '@openapi/model/bundle.ts'
import type { SlicedPagination } from '@openapi/model/slicedPagination.ts'

function bundleInitials(name: string): string {
    return name.slice(0, 2).toUpperCase()
}

function BundleCard({ bundle }: { bundle: Bundle }) {
    return (
        <Card className="flex-row items-start gap-3.5 p-5">
            <Avatar size="lg">
                <AvatarFallback>{bundleInitials(bundle.name)}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-primary font-mono text-sm leading-none font-semibold tracking-tight">
                    {bundle.name}
                </span>
                {bundle.description && (
                    <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                        {bundle.description}
                    </CardDescription>
                )}
            </div>
        </Card>
    )
}

interface BundleListingProps {
    bundles: Bundle[]
    error: string | null
    paginationDetails: SlicedPagination
    onPreviousPage: () => void
    onNextPage: () => void
}

export function BundleListing({
    bundles,
    error,
    paginationDetails,
    onPreviousPage,
    onNextPage,
}: BundleListingProps) {
    return (
        <section>
            <div className="mb-4">
                <h2 className="font-mono text-lg font-semibold tracking-tight">Discover bundles</h2>
                <p className="text-muted-foreground mt-1 text-xs">
                    {bundles.length} bundle{bundles.length === 1 ? '' : 's'} · updated continuously
                </p>
            </div>

            {error && <p className="text-destructive text-sm">{error}</p>}

            {bundles.length === 0 && !error && (
                <p className="text-muted-foreground text-sm">No bundles yet.</p>
            )}

            <div className="grid [grid-template-columns:repeat(auto-fill,minmax(340px,1fr))] gap-4">
                {bundles.map((bundle: Bundle) => (
                    <BundleCard key={bundle.id} bundle={bundle} />
                ))}
            </div>

            <Pagination className="mt-7">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={onPreviousPage} isActive={!paginationDetails.isFirst} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={onNextPage} isActive={!paginationDetails.isLast} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </section>
    )
}
