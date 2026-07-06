import { getBundleByName } from '@/services/bundleService'
import type { BundleDetail } from '@openapi/model/bundleDetail.ts'
import axios from 'axios'
import { useEffect, useState } from 'react'

type BundleState =
    | { name: string; status: 'ok'; bundle: BundleDetail }
    | { name: string; status: 'notFound' }
    | { name: string; status: 'error' }

interface UseBundleResult {
    bundle: BundleDetail | null
    loading: boolean
    error: string | null
    notFound: boolean
}

export function useBundle(name: string | undefined): UseBundleResult {
    const [state, setState] = useState<BundleState | null>(null)

    useEffect(() => {
        if (!name) {
            return
        }

        let active = true

        getBundleByName(name)
            .then((bundle) => {
                if (active) setState({ name, status: 'ok', bundle })
            })
            .catch((err) => {
                if (!active) return
                if (axios.isAxiosError(err) && err.response?.status === 404) {
                    setState({ name, status: 'notFound' })
                } else {
                    setState({ name, status: 'error' })
                }
            })

        return () => {
            active = false
        }
    }, [name])

    const loading = !name || state?.name !== name

    return {
        bundle: !loading && state?.status === 'ok' ? state.bundle : null,
        loading,
        error: !loading && state?.status === 'error' ? 'Could not load bundle' : null,
        notFound: !loading && state?.status === 'notFound',
    }
}
