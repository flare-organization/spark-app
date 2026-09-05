CREATE TABLE bundle_versions (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    bundle_id UUID NOT NULL REFERENCES bundles(id),
    version TEXT NOT NULL,
    readme TEXT,
    file_size BIGINT,
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (bundle_id, version)
);

CREATE INDEX idx_bundle_versions_bundle_id ON bundle_versions(bundle_id);
