package com.flare.spark.backend.bundles;

import org.springframework.data.jpa.domain.PredicateSpecification;

public class BundleSpecification {
    static PredicateSpecification<Bundle> statusPublic() {
        return (from, builder) -> builder.equal(from.get("status"), BundleStatus.PUBLIC);
    }

    static PredicateSpecification<Bundle> nameLike(String name) {
        return (from, builder) -> builder.like(
            builder.lower(from.get("name")),
            "%" + name.toLowerCase() + "%"
        );
    }
}
