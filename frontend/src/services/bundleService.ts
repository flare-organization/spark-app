import {http} from "@/lib/http/http.ts";
import type {Bundle} from "@openapi/model/bundle.ts";
import type {CreateBundle} from "@openapi/model/createBundle.ts";

export async function getBundles(): Promise<Bundle[]> {
    const res = await http.get<Bundle[]>('/api/v1/bundles')

    return res.data
}

export async function createBundle(bundleRequest: CreateBundle): Promise<Bundle> {
    const res = await http.post<Bundle>('/api/v1/bundles', bundleRequest);

    return res.data
}