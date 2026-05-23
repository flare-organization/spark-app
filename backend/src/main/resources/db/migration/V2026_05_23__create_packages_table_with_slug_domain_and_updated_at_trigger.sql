CREATE DOMAIN slug AS TEXT CHECK (
    VALUE ~ '^[a-z0-9]+(-[a-z0-9]+)*$'
);

CREATE TABLE packages (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    name TEXT UNIQUE NOT NULL,
    slug SLUG UNIQUE NOT NULL,
    readme TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE FUNCTION set_current_timestamp_updated_at()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER packages_set_updated_at
    BEFORE UPDATE ON packages
    FOR EACH ROW
EXECUTE FUNCTION set_current_timestamp_updated_at();