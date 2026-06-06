import {http} from "@/lib/http/http.ts";
import type {Bundle} from "@openapi/model/bundle.ts";
import type {CreateBundle} from "@openapi/model/createBundle.ts";
import type {PaginatedBundles} from "@openapi/model/paginatedBundles.ts";

export async function getBundles(page: number): Promise<PaginatedBundles> {
    const res = await http.get<PaginatedBundles>('/api/v1/bundles', {
        params: {
            page: page,
        }
    })

    return res.data;
}

export async function createBundle(bundleRequest: CreateBundle): Promise<Bundle> {
    const res = await http.post<Bundle>('/api/v1/bundles', bundleRequest);

    return res.data;
}