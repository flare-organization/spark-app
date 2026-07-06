package com.flare.spark.backend.bundles;

import com.flare.spark.backend.tags.Tag;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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

import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "bundles")
@Getter @NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Bundle {

    public Bundle(
        String name,
        String description,
        BundleStatus status
    ) {
        this.name = name;
        this.description = description;
        this.status = status;
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
    @Column(name = "status", columnDefinition = "BundleStatus")
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private BundleStatus status;

    @ManyToMany
    @JoinTable(
        name = "bundle_tags",
        joinColumns = @JoinColumn(name = "bundle_id"),
        inverseJoinColumns = @JoinColumn(name = "tags_id")
    )
    private Set<Tag> tags = new LinkedHashSet<>();

    @CreationTimestamp
    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    @Column(name = "deleted_at")
    private OffsetDateTime deletedAt;
}