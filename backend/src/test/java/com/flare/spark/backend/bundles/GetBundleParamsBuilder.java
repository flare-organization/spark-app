package com.flare.spark.backend.bundles;

public class GetBundleParamsBuilder {
    private int page = 0;
    private String search = "search";

    public static GetBundleParamsBuilder create() {
        return new GetBundleParamsBuilder();
    }

    public GetBundleParamsBuilder withPage(int page) {
        this.page = page;
        return this;
    }

    public GetBundleParamsBuilder withSearch(String search) {
        this.search = search;
        return this;
    }

    public GetBundleParams build() {
        return new GetBundleParams(
            this.page,
            this.search
        );
    }
}
