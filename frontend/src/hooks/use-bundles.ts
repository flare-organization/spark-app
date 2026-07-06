import { getBundles } from '@/services/bundleService'
import type { Bundle } from '@openapi/model/bundle.ts'
import type { SlicedPagination } from '@openapi/model/slicedPagination.ts'
import { useEffect, useState } from 'react'
import {GetBundleParams} from "@openapi/model/getBundleParams.ts";
import {PaginatedBundles} from "@openapi/model/paginatedBundles.ts";

interface UseBundlesResult {
    bundles: Bundle[]
    getBundleParams: Required<GetBundleParams>
    error: string | null
    paginationDetails: SlicedPagination
    previousPage: () => void
    nextPage: () => void
    search: (input: string) => void
}

export function useBundles(): UseBundlesResult {
    const [error, setError] = useState<string | null>(null)
    const [bundles, setBundles] = useState<Bundle[]>([])
    const [params, setParams] = useState<Required<GetBundleParams>>({
        page: 0,
        search: "",
    })

    const [paginationDetails, setPaginationDetails] = useState<SlicedPagination>({
        isEmpty: true,
        isFirst: true,
        isLast: true,
        pageNumber: 0,
        pageSize: 0,
    })

    function previousPage(): void {
        if (!paginationDetails.isFirst && params.page > 0) {
            setParams((prevState) => ({
                ...prevState,
                page: prevState.page - 1
            }))
        }
    }

    function nextPage(): void {
        if (!paginationDetails.isLast) {
            setParams((prevState) => ({
                ...prevState,
                page: prevState.page + 1
            }))
        }
    }

    function search(input: string): void {
        setParams((prevState) => ({
            ...prevState,
            search: input,
            page: 0,
        }))
    }

    useEffect(() => {
        console.log("rerender")
        const request = getBundles(params);

        request.then((response: PaginatedBundles) => {
            const { content, ...paginationDetails } = response;

            setBundles(content)
            setPaginationDetails(paginationDetails)
            setError(null)
        })
        .catch(() => setError('Could not load bundles'))
    }, [params])

    return { bundles, getBundleParams: params, error, paginationDetails, previousPage, nextPage, search }
}
