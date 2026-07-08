package com.flare.spark.backend.bundles;

public class BundleBuilder {
    private String name = "bundle name";
    private String description = "bundle description";
    private BundleVisibility visibility = BundleVisibility.PUBLIC;

    public BundleBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public BundleBuilder withDescription(String description) {
        this.description = description;
        return this;
    }

    public BundleBuilder withStatus(BundleVisibility visibility) {
        this.visibility = visibility;
        return this;
    }

    public static BundleBuilder create() {
        return new BundleBuilder();
    }

    public Bundle build() {
        return new Bundle(
            this.name,
            this.description,
            this.visibility
        );
    }
}