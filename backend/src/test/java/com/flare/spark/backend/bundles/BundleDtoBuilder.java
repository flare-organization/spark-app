package com.flare.spark.backend.bundles;

import lombok.Builder;

import java.util.UUID;

@Builder
public class BundleDtoBuilder {

    @Builder.Default
    private UUID uuid = UUID.fromString("00000000-0000-0000-0000-000000000000");

    @Builder.Default
    private String name = "bundle name";

    @Builder.Default
    private String slug = "bundle-name";

    @Builder.Default
    private String description = "bundle description";

    @Builder.Default
    private BundleStatus status = BundleStatus.PUBLIC;
}