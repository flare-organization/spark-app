package com.flare.spark.backend.bundleFiles;

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
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "bundle_files")
@Getter @NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BundleFile {

    public BundleFile(
            String fileName,
            String filePath,
            double fileSize
    ) {
        this.fileName = fileName;
        this.filePath = filePath;
        this.fileSize = fileSize;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Setter
    @Column(name = "file_name")
    private String fileName;

    @Setter
    @Column(name = "file_path")
    private String filePath;

    @Setter
    @Column(name = "file_size")
    private double fileSize;

    @CreationTimestamp
    @Column(name = "created_at")
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @Setter
    @Column(name = "deleted_at")
    private ZonedDateTime deletedAt;
}
