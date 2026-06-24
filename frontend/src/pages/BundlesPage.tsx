import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Search } from '@/components/ui/search'
import { getBundles, getSearchBundles } from '@/services/bundleService'
import type { Bundle } from '@openapi/model/bundle.ts'
import type { SearchBundle } from '@openapi/model/searchBundle.ts'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination.tsx'
import type { SlicedPagination } from '@openapi/model/slicedPagination.ts'

export default function BundlesPage() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') ?? ''
    const [page, setPage] = useState(0)
    const [error, setError] = useState<string | null>(null)

    const [bundles, setBundles] = useState<(Bundle | SearchBundle)[]>([])
    const [paginationDetails, setPaginationDetails] = useState<SlicedPagination>({
        isEmpty: true,
        isFirst: true,
        isLast: true,
        pageNumber: 0,
        pageSize: 0,
    })

    const [searchInput, setSearchInput] = useState(query)
    const [prevQuery, setPrevQuery] = useState(query)

    if (query !== prevQuery) {
        setPrevQuery(query)
        setSearchInput(query)
        setPage(0)
    }

    function previousPage(): void {
        if (!paginationDetails.isFirst && page > 0) {
            setPage(page - 1)
        }
    }

    function nextPage(): void {
        if (!paginationDetails.isLast) {
            setPage(page + 1)
        }
    }

    useEffect(() => {
        const request = query ? getSearchBundles(query, page) : getBundles(page)

        request
            .then((res) => {
                const { content, ...paginationDetails } = res

                setBundles(content)
                setPaginationDetails(paginationDetails)
            })
            .catch(() => setError('Could not load bundles'))
    }, [page, query])

    return (
        <div className="mx-auto flex max-w-2xl flex-col gap-6 p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Bundles</h1>
                <Link to="/bundles/create">
                    <Button>Create bundle</Button>
                </Link>
            </div>

            <Search value={searchInput} onValueChange={setSearchInput} className={'w-full'} />

            {error && <p className="text-red-500">{error}</p>}

            {bundles.length === 0 && !error && (
                <p className="text-muted-foreground">No bundles yet.</p>
            )}

            <ul className="flex flex-col gap-2">
                {bundles.map((bundle) => (
                    <li
                        key={'id' in bundle ? bundle.id : bundle.name}
                        className="border-border bg-card hover:border-ring/40 flex flex-col gap-0.5 rounded-xl border px-4 py-3 transition-colors"
                    >
                        <span className="text-sm font-medium">{bundle.name}</span>
                        {bundle.description && (
                            <span className="text-muted-foreground line-clamp-2 text-xs">
                                {bundle.description}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={previousPage}
                            isActive={!paginationDetails.isFirst}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={nextPage} isActive={!paginationDetails.isLast} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
