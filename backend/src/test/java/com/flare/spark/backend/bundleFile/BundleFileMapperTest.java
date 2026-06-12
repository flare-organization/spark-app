package com.flare.spark.backend.bundleFile;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import com.flare.spark.backend.bundleFiles.BundleFile;
import com.flare.spark.backend.bundleFiles.BundleFileMapper;
import com.flare.spark.backend.bundleFiles.BundleFileMapperImpl;
import com.flare.spark.generated.api.model.UploadResultDto;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class BundleFileMapperTest {

    private final BundleFileMapper mapper = new BundleFileMapperImpl();

    @Test
    void testToUploadResultMapsBundleId() {
        UUID bundleId = UUID.fromString("55555555-5555-5555-5555-555555555555");
        BundleFile bundleFile = BundleFileBuilder.create()
                .withBundleId(bundleId)
                .buildBundleFile();

        UploadResultDto result = mapper.toUploadResult(bundleFile);

        assertEquals(bundleId, result.getBundleId());
    }

    @Test
    void testToUploadResultReturnsNullWhenBundleFileIsNull() {
        assertNull(mapper.toUploadResult(null));
    }
}
