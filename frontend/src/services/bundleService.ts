import { http } from '@/lib/http/http.ts'
import type { Bundle } from '@openapi/model/bundle.ts'
import type { BundleDetail } from '@openapi/model/bundleDetail.ts'
import type { CreateBundle } from '@openapi/model/createBundle.ts'
import type { PaginatedBundles } from '@openapi/model/paginatedBundles.ts'
import type { PaginatedSearchBundles } from '@openapi/model/paginatedSearchBundles.ts'

export async function getBundles(page: number, size?: number): Promise<PaginatedBundles> {
    const res = await http.get<PaginatedBundles>('/api/v1/bundles', {
        params: {
            page: page,
            size: size,
        },
    })

    return res.data
}

export async function getBundleByName(name: string): Promise<BundleDetail> {
    const res = await http.get<BundleDetail>(`/api/v1/bundles/${encodeURIComponent(name)}`)

    return res.data
}

export async function createBundle(bundleRequest: CreateBundle): Promise<Bundle> {
    const res = await http.post<Bundle>('/api/v1/bundles', bundleRequest)

    return res.data
}

export async function getSearchBundles(
    search: string,
    page: number,
): Promise<PaginatedSearchBundles> {
    const res = await http.get<PaginatedSearchBundles>('/api/v1/bundles/search', {
        params: {
            q: search,
            page: page,
        },
    })

    return res.data
}
