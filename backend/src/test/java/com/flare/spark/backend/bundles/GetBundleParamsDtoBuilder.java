package com.flare.spark.backend.bundles;

import com.flare.spark.generated.api.model.GetBundleParamsDto;

public class GetBundleParamsDtoBuilder {
    private int page = 0;
    private String search = "search";

    public static GetBundleParamsDtoBuilder create() {
        return new GetBundleParamsDtoBuilder();
    }

    public GetBundleParamsDtoBuilder withPage(int page) {
        this.page = page;
        return this;
    }

    public GetBundleParamsDtoBuilder withSearch(String search) {
        this.search = search;
        return this;
    }

    public GetBundleParamsDto build() {
        return new GetBundleParamsDto()
                .search(this.search)
                .page(this.page);
    }
}
