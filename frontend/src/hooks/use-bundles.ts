import { getBundles } from '@/services/bundleService'
import type { Bundle } from '@openapi/model/bundle.ts'
import type { PaginatedBundles } from '@openapi/model/paginatedBundles.ts'
import type { SlicedPagination } from '@openapi/model/slicedPagination.ts'
import { useEffect, useState } from 'react'

interface UseBundlesResult {
    bundles: Bundle[]
    error: string | null
    paginationDetails: SlicedPagination
    previousPage: () => void
    nextPage: () => void
}

export function useBundles(): UseBundlesResult {
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

    return { bundles, error, paginationDetails, previousPage, nextPage }
}
