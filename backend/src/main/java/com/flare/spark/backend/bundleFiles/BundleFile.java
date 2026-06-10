package com.flare.spark.backend.bundleFiles;

import static org.hibernate.annotations.SoftDeleteType.TIMESTAMP;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.ZonedDateTime;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SoftDelete;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "bundle_files")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BundleFile {

    public BundleFile(
            UUID bundleId,
            String fileName,
            String filePath,
            double fileSize
    ) {
        this.bundleId = bundleId;
        this.fileName = fileName;
        this.filePath = filePath;
        this.fileSize = fileSize;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "bundle_id", nullable = false)
    private UUID bundleId;

    @Setter
    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Setter
    @Column(name = "file_path", nullable = false)
    private String filePath;

    @Setter
    @Column(name = "file_size", nullable = false)
    private double fileSize;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private ZonedDateTime updatedAt;

    @Setter
    @SoftDelete(strategy = TIMESTAMP)
    @Column(name = "deleted_at", nullable = true)
    private ZonedDateTime deletedAt;
}
