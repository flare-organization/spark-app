package com.flare.spark.backend.bundles;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.OffsetDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcType;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.dialect.type.PostgreSQLEnumJdbcType;

import java.util.UUID;

@Entity
@Table(name = "bundles")
@Getter @NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Bundle {

    public Bundle(
        String name,
        String slug,
        String description,
        BundleStatus status
    ) {
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.status = status;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Setter
    @Column(unique = true)
    @NotBlank
    private String name;

    @Setter
    @Column(unique = true)
    private String slug;

    @Setter
    private String description;

    @Setter
    @NotNull
    @Column(name = "status", columnDefinition = "BundleStatus")
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private BundleStatus status;

    @CreationTimestamp
    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    @Column(name = "deleted_at")
    private OffsetDateTime deletedAt;
}