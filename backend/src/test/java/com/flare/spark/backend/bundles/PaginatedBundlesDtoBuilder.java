package com.flare.spark.backend.bundles;

import com.flare.spark.generated.api.model.BundleDto;
import com.flare.spark.generated.api.model.PaginatedBundlesDto;

import java.util.List;
import java.util.UUID;

public class PaginatedBundlesDtoBuilder {
    private List<BundleDto> content;
    private int pageNumber;
    private int pageSize;
    private boolean isFirst;
    private boolean isLast;
    private boolean isEmpty;

    public PaginatedBundlesDtoBuilder withContent(List<BundleDto> content) {
        this.content = content;
        return this;
    }

    public PaginatedBundlesDtoBuilder withPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
        return this;
    }

    public PaginatedBundlesDtoBuilder pageSize(int pageSize) {
        this.slug = slug;
        return this;
    }

    public PaginatedBundlesDtoBuilder withDescription(String description) {
        this.description = description;
        return this;
    }

    public static PaginatedBundlesDtoBuilder create() {
        return new PaginatedBundlesDtoBuilder();
    }

    public PaginatedBundlesDto build() {
        new PaginatedBundlesDto(

            List.of(BundleDtoBuilder.create().build()),
            0,
            5,
            true,
            true,
            false
        );
    }
}