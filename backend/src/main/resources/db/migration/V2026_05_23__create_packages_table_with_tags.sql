CREATE TYPE BundleStatus AS ENUM ('PUBLIC', 'PRIVATE');

CREATE TABLE bundles (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    name TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    status BundleStatus NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE bundle_tags (
    bundle_id UUID NOT NULL REFERENCES bundles(id),
    tags_id UUID NOT NULL REFERENCES tags(id),
    PRIMARY KEY (bundle_id, tags_id)
);