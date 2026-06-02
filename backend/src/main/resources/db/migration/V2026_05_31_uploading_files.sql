CREATE TABLE bundle_files
(
    id         UUID PRIMARY KEY     DEFAULT UUIDV7(),
    file_name  TEXT NOT NULL,
    file_path  TEXT NOT NULL,
    file_size  FLOAT NOT NULL,
    checksum   TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);