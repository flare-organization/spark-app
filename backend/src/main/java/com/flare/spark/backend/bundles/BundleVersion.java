package com.flare.spark.backend.bundles;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.OffsetDateTime;
import java.util.UUID;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(
    name = "bundle_versions",
    uniqueConstraints = @UniqueConstraint(columnNames = {"bundle_id", "version"})
)
@Getter @NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BundleVersion {

    public BundleVersion(
        Bundle bundle,
        String version,
        String readme,
        Long fileSize
    ) {
        this.bundle = bundle;
        this.version = version;
        this.readme = readme;
        this.fileSize = fileSize;
        this.publishedAt = OffsetDateTime.now();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "bundle_id", nullable = false)
    private Bundle bundle;

    @Setter
    private String version;

    @Setter
    private String readme;

    @Setter
    @Column(name = "file_size")
    private Long fileSize;

    @Setter
    @Column(name = "published_at")
    private OffsetDateTime publishedAt;

    @CreationTimestamp
    @Column(name = "created_at")
    private OffsetDateTime createdAt;
}
