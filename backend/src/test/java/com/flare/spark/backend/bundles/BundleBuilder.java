package com.flare.spark.backend.bundles;

public class BundleBuilder {
    private String name = "bundle name";
    private String description = "bundle description";
    private BundleStatus status = BundleStatus.PUBLIC;

    public BundleBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public BundleBuilder withDescription(String description) {
        this.description = description;
        return this;
    }

    public BundleBuilder withStatus(BundleStatus status) {
        this.status = status;
        return this;
    }

    public static BundleBuilder create() {
        return new BundleBuilder();
    }

    public Bundle build() {
        return new Bundle(
            this.name,
            this.description,
            this.status
        );
    }
}