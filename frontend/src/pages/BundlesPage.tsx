import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Button} from '@/components/ui/button'
import {getBundles} from '@/services/bundleService'
import type {Bundle} from "@openapi/model/bundle.ts";
import type {PaginatedBundles} from "@openapi/model/paginatedBundles.ts";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import type {SlicedPagination} from "@openapi/model/slicedPagination.ts";

export default function BundlesPage() {
    const [error, setError] = useState<string | null>(null);
    const [bundles, setBundles] = useState<Bundle[]>([]);
    const [paginationDetails, setPaginationDetails] = useState<SlicedPagination>({
        isEmpty: true,
        isFirst: true,
        isLast: true,
        pageNumber: 0,
        pageSize: 0
    });

    function previousPage(): void {
        if (!paginationDetails.isFirst && paginationDetails.pageNumber > 0) {
            setPaginationDetails(prevState => ({
                ...prevState,
                pageNumber: paginationDetails.pageNumber - 1,
            }));
        }
    }

    function nextPage(): void {
        if (!paginationDetails.isLast) {
            setPaginationDetails(prevState => ({
                ...prevState,
                pageNumber: paginationDetails.pageNumber + 1,
            }));
        }
    }

    useEffect(() => {
        getBundles(paginationDetails.pageNumber)
            .then((res: PaginatedBundles) => {
                const {content, ...paginationDetails} = res;

                setBundles(res.content);
                setPaginationDetails(paginationDetails);
            })
            .catch(() => setError('Could not load bundles'))
    }, [paginationDetails.pageNumber]);

    return (
        <div className="max-w-2xl mx-auto p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Bundles</h1>
                <Link to="/bundles/create">
                    <Button>Create bundle</Button>
                </Link>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {bundles.length === 0 && !error && (
                <p className="text-muted-foreground">No bundles yet.</p>
            )}

            <ul className="flex flex-col gap-2">
                {bundles.map((bundle) => (
                    <li
                        key={bundle.id}
                        className="border rounded-md px-4 py-3 text-sm"
                    >
                        {bundle.name}
                    </li>
                ))}
            </ul>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={previousPage} isActive={!paginationDetails.isFirst} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={nextPage} isActive={!paginationDetails.isLast} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}