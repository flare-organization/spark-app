package com.flare.spark.backend.bundles;

import com.flare.spark.generated.api.model.BundleDto;
import java.util.UUID;

public class BundleDtoBuilder {

    private UUID uuid = null;
    private String name = "bundle name";
    private String description = "bundle description";
    private BundleVisibility visibility = BundleVisibility.PUBLIC;

    public BundleDtoBuilder withUuid(UUID uuid) {
        this.uuid = uuid;
        return this;
    }

    public BundleDtoBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public BundleDtoBuilder withDescription(String description) {
        this.description = description;
        return this;
    }

    public BundleDtoBuilder withVisibility(BundleVisibility visibility) {
        this.visibility = visibility;
        return this;
    }

    public static BundleDtoBuilder create() {
        return new BundleDtoBuilder();
    }

    public BundleDto build() {
        return new BundleDto(
            this.uuid,
            this.name,
            this.description
        );
    }
}