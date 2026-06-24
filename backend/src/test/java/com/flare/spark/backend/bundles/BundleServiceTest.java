package com.flare.spark.backend.bundles;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(MockitoExtension.class)
class BundleServiceTest {

    @Mock
    private BundleRepository bundleRepository;

    @InjectMocks
    private BundleService bundleService;

    @Test
    public void testGetAllBundles() {
        List<Bundle> bundles = List.of(BundleBuilder.create().build());
        int pageNumber = 1;
        int itemsPerPage = 5;
        boolean hasNext = false;

        Pageable firstPageWithFiveElements =
                PageRequest.of(pageNumber, itemsPerPage);

        Slice<Bundle> paginatedBundles = new SliceImpl<>(
            bundles,
            PageRequest.of(pageNumber, itemsPerPage),
            hasNext
        );

        Mockito.when(bundleRepository.findAllBy(firstPageWithFiveElements))
                .thenReturn(paginatedBundles);

        Slice<Bundle> actual = bundleService.getAllBundles(pageNumber);

        assertEquals(paginatedBundles, actual);
    }


    @Test
    public void testSearchBundlesByNameReturnsSliceFromRepository() {
        List<Bundle> bundles = List.of(BundleBuilder.create().build());
        int pageNumber = 1;
        int itemsPerPage = 5;
        boolean hasNext = false;

        Pageable firstPageWithFiveElements =
                PageRequest.of(pageNumber, itemsPerPage);

        Slice<Bundle> paginatedBundles = new SliceImpl<>(
                bundles,
                PageRequest.of(pageNumber, itemsPerPage),
                hasNext
        );

        Mockito.when(
                bundleRepository.findPublicByNameContainingIgnoreCase(
                    "query",
                    firstPageWithFiveElements
                )
            )
            .thenReturn(paginatedBundles);

        Slice<Bundle> actual = bundleService.searchBundlesByName("query", pageNumber);

        assertEquals(paginatedBundles, actual);
    }

    @Test
    public void testSearchBundlesByNameUsesFiveElementPage() {
        int pageNumber = 3;
        int itemsPerPage = 5;

        Pageable pageWithFiveElements =
                PageRequest.of(pageNumber, itemsPerPage);

        Mockito.when(
                bundleRepository.findPublicByNameContainingIgnoreCase(
                    "query",
                    pageWithFiveElements
                )
            )
            .thenReturn(new SliceImpl<>(List.of()));

        bundleService.searchBundlesByName("query", pageNumber);

        Mockito.verify(bundleRepository, Mockito.times(1))
                .findPublicByNameContainingIgnoreCase("query", pageWithFiveElements);
    }
}