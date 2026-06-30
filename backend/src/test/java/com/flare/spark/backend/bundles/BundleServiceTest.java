package com.flare.spark.backend.bundles;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.jpa.domain.Specification;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BundleServiceTest {

    @Mock
    private BundleRepository bundleRepository;

    @InjectMocks
    private BundleService bundleService;

    @Test
    public void testGetAllBundlesReturnsSliceOfBundles() {
        GetBundleParams getBundleParams = GetBundleParamsBuilder.create().build();

        List<Bundle> bundles = List.of(BundleBuilder.create().build());

        int pageNumber = 0;
        int itemsPerPage = 12;
        boolean hasNext = false;

        Pageable firstPageWithAmountOfElements =
                PageRequest.of(pageNumber, itemsPerPage);

        Slice<Bundle> paginatedBundles = new SliceImpl<>(
            bundles,
            PageRequest.of(pageNumber, itemsPerPage),
            hasNext
        );

        when(bundleRepository.findAllBy(
            any(Specification.class),
            eq(firstPageWithAmountOfElements)
        )).thenReturn(paginatedBundles);

        Slice<Bundle> actual = bundleService.getAllBundles(getBundleParams);

        assertEquals(paginatedBundles, actual);
    }
}