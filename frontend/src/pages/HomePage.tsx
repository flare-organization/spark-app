import { BundleListing } from '@/components/home/bundle-listing'
import { Hero } from '@/components/home/hero'
import { useBundles } from '@/hooks/use-bundles'
import { useSearchParams } from 'react-router-dom'

export default function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get('q') ?? ''

    const { bundles, error, paginationDetails, previousPage, nextPage } = useBundles(query)

    function handleSearch(value: string): void {
        setSearchParams(value ? { q: value } : {})
    }

    return (
        <div className="mx-auto max-w-6xl px-6 pt-10 pb-20">
            <Hero query={query} onSearch={handleSearch} />
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
