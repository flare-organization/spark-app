package com.flare.spark.backend.bundles;

import com.flare.spark.backend.tags.Tag;
import com.flare.spark.generated.api.model.BundleDetailDto;
import com.flare.spark.generated.api.model.BundleDto;
import com.flare.spark.generated.api.model.BundleVersionDetailDto;
import com.flare.spark.generated.api.model.BundleVersionSummaryDto;
import com.flare.spark.generated.api.model.CreateBundleDto;
import com.flare.spark.generated.api.model.SearchBundleDto;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BundleMapper {
    BundleDto bundleToDto(Bundle bundle);
    Bundle bundleDtoToBundle(CreateBundleDto bundleDto);
    SearchBundleDto bundleToSearchBundleDto(Bundle bundle);

    default BundleDetailDto bundleToDetailDto(Bundle bundle, List<BundleVersion> versions) {
        List<String> tagNames = bundle.getTags().stream()
            .map(Tag::getName)
            .toList();

        List<BundleVersionSummaryDto> summaries = versions.stream()
            .map(version -> new BundleVersionSummaryDto(version.getVersion(), version.getPublishedAt()))
            .toList();

        BundleVersionDetailDto latestVersion = versions.isEmpty()
            ? null
            : new BundleVersionDetailDto(versions.getFirst().getVersion(), versions.getFirst().getPublishedAt())
                .readme(versions.getFirst().getReadme())
                .fileSize(versions.getFirst().getFileSize());

        return new BundleDetailDto(
            bundle.getId(),
            bundle.getName(),
            bundle.getDescription(),
            BundleDetailDto.StatusEnum.fromValue(bundle.getStatus().name()),
            tagNames,
            summaries
        ).latestVersion(latestVersion);
    }
}
