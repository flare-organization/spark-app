package com.flare.spark.backend.bundles;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "bundles")
public class Bundle {

    public Bundle (UUID id, String name, String slug) {
        this.id = id;
        this.name = name;
        this.slug = slug;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private String slug;

    public UUID getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
}