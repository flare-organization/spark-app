import { BundleListing } from '@/components/home/bundle-listing'
import { Hero } from '@/components/home/hero'
import { useBundles } from '@/hooks/use-bundles'

export default function HomePage() {
    const { bundles, getBundleParams, error, paginationDetails, previousPage, nextPage, search } = useBundles()

    return (
        <div className="mx-auto max-w-6xl px-6 pt-10 pb-20">
            <Hero query={getBundleParams.search} onSearch={search} />
            <BundleListing
                bundles={bundles}
                error={error}
                paginationDetails={paginationDetails}
                onPreviousPage={previousPage}
                onNextPage={nextPage}
            />
        </div>
    )
}
