package com.flare.spark.backend.bundles;

import com.flare.spark.generated.api.model.CreateBundleDto;

public class CreateBundleDtoBuilder {
    private String name = "bundle-name";
    private String description = "bundle description";
    private CreateBundleDto.StatusEnum status = CreateBundleDto.StatusEnum.PUBLIC;

    public CreateBundleDtoBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public CreateBundleDtoBuilder withDescription(String description) {
        this.description = description;
        return this;
    }

    public CreateBundleDtoBuilder withStatus(CreateBundleDto.StatusEnum status) {
        this.status = status;
        return this;
    }

    public static CreateBundleDtoBuilder create() {
        return new CreateBundleDtoBuilder();
    }

    public CreateBundleDto build() {
        return new CreateBundleDto(
            this.name,
            this.description,
            this.status
        );
    }
}