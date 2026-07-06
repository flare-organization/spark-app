import { http } from '@/lib/http/http.ts'
import type { Bundle } from '@openapi/model/bundle.ts'
import type { CreateBundle } from '@openapi/model/createBundle.ts'
import type { PaginatedBundles } from '@openapi/model/paginatedBundles.ts'
import {GetBundleParams} from "@openapi/model/getBundleParams.ts";

export async function getBundles(params: GetBundleParams): Promise<PaginatedBundles> {
    const res = await http.get<PaginatedBundles>('/api/v1/bundles', {
        params
    })

    return res.data
}

export async function createBundle(bundleRequest: CreateBundle): Promise<Bundle> {
    const res = await http.post<Bundle>('/api/v1/bundles', bundleRequest)

    return res.data
}