package com.flare.spark.backend.bundles;

import com.flare.spark.generated.api.model.BundleDto;
import com.flare.spark.generated.api.model.PaginatedBundlesDto;

import java.util.List;
import java.util.UUID;

public class PaginatedBundlesDtoBuilder {
    private List<BundleDto> content = List.of(BundleDtoBuilder.create().build());
    private int pageNumber = 0;
    private int pageSize = 1;
    private boolean isFirst = true;
    private boolean isLast = true;
    private boolean isEmpty = false;

    public PaginatedBundlesDtoBuilder withContent(List<BundleDto> content) {
        this.content = content;
        return this;
    }

    public PaginatedBundlesDtoBuilder withPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
        return this;
    }

    public PaginatedBundlesDtoBuilder withPageSize(int pageSize) {
        this.pageSize = pageSize;
        return this;
    }

    public PaginatedBundlesDtoBuilder withIsFirst(boolean isFirst) {
        this.isFirst = isFirst;
        return this;
    }

    public PaginatedBundlesDtoBuilder withIsLast(boolean isLast) {
        this.isLast = isLast;
        return this;
    }

    public PaginatedBundlesDtoBuilder withIsEmpty(boolean isEmpty) {
        this.isEmpty = isEmpty;
        return this;
    }

    public static PaginatedBundlesDtoBuilder create() {
        return new PaginatedBundlesDtoBuilder();
    }

    public PaginatedBundlesDto build() {
        return new PaginatedBundlesDto(
            this.content,
            this.pageNumber,
            this.pageSize,
            this.isFirst,
            this.isLast,
            this.isEmpty
        );
    }
}