package com.flare.spark.backend.bundles;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.OffsetDateTime;

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
@Table(name = "bundle_bundles")
@Getter @NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Bundle {

    public Bundle(
        String name,
        String description,
        BundleVisibility visibility
    ) {
        this.name = name;
        this.description = description;
        this.visibility = visibility;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Setter
    @Column(unique = true)
    private String name;

    @Setter
    private String description;

    @Setter
    @Column(name = "visibility")
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private BundleVisibility visibility;

    @CreationTimestamp
    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    @Column(name = "deleted_at")
    private OffsetDateTime deletedAt;
}