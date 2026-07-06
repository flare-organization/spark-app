import { getBundles, getSearchBundles } from '@/services/bundleService'
import type { Bundle } from '@openapi/model/bundle.ts'
import type { SearchBundle } from '@openapi/model/searchBundle.ts'
import type { SlicedPagination } from '@openapi/model/slicedPagination.ts'
import { useEffect, useState } from 'react'

const PAGE_SIZE = 6

interface UseBundlesResult {
    bundles: (Bundle | SearchBundle)[]
    error: string | null
    paginationDetails: SlicedPagination
    previousPage: () => void
    nextPage: () => void
}

export function useBundles(query = ''): UseBundlesResult {
    const [error, setError] = useState<string | null>(null)
    const [bundles, setBundles] = useState<(Bundle | SearchBundle)[]>([])
    const [page, setPage] = useState(0)
    const [prevQuery, setPrevQuery] = useState(query)
    const [paginationDetails, setPaginationDetails] = useState<SlicedPagination>({
        isEmpty: true,
        isFirst: true,
        isLast: true,
        pageNumber: 0,
        pageSize: 0,
    })

    if (query !== prevQuery) {
        setPrevQuery(query)
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
        const request = query ? getSearchBundles(query, page) : getBundles(page, PAGE_SIZE)

        request
            .then((res) => {
                const { content, ...rest } = res

                setBundles(content)
                setPaginationDetails(rest)
                setError(null)
            })
            .catch(() => setError('Could not load bundles'))
    }, [page, query])

    return { bundles, error, paginationDetails, previousPage, nextPage }
}
