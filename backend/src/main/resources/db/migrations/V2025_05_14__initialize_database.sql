CREATE TYPE roles as ENUM ('owner', 'admin', 'member', );

CREATE DOMAIN version_constraint AS TEXT CHECK (
    VALUE ~ '^(\^|~|>=|<=|>|<|=)?\d+(\.\d+){0,2}(,\s*(\^|~|>=|<=|>|<|=)?\d+(\.\d+){0,2})*$'
);

CREATE DOMAIN slug AS TEXT CHECK (
    VALUE ~ '^[a-z0-9]+(-[a-z0-9]+)*$'
);

CREATE DOMAIN email AS TEXT CHECK (
    VALUE ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\\.[A-Za-z]{2,}$'
);

CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    file_name TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    file_size BIGINT NOT NULL CHECK (file_size >= 0),
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    profile_picture_file_id UUID REFERENCES files(id),
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email EMAIL UNIQUE NOT NULL,
    email_verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    profile_picture_file_id UUID REFERENCES files(id),
    name TEXT UNIQUE NOT NULL,
    slug SLUG UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE organization_members (
    organization_id UUID REFERENCES organizations(id),
    user_id UUID REFERENCES users(id),
    role roles NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (organization_id, user_id)
);

CREATE TABLE organization_invites (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    organization_id UUID REFERENCES organizations(id),
    invited_by_user_id UUID NOT NULL REFERENCES users(id),
    invited_username TEXT REFERENCES users(username),
    invited_user_email EMAIL,
    role roles NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    accepted_at TIMESTAMPTZ,
    CHECK (
        (
            invited_username IS NOT NULL
                AND invited_user_email IS NULL
        )
        OR
        (
            invited_username IS NULL
                AND invited_user_email IS NOT NULL
        )
    )
);

CREATE TABLE packages (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    organization_id UUID REFERENCES organizations(id),
    name TEXT UNIQUE NOT NULL,
    readme TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE package_versions (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    package_id UUID REFERENCES packages(id),
    uploaded_by UUID REFERENCES users(id),
    version TEXT NOT NULL,
    deprecated BOOLEAN NOT NULL DEFAULT FALSE,
    readme TEXT,
    changelog TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    PRIMARY KEY (package_id, version)
);

CREATE TABLE package_version_downloads (
    package_versions_id UUID REFERENCES package_versions(id),
    downloaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE package_dependencies (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    package_version_id UUID REFERENCES package_versions(id),
    version_constraint VERSION_CONSTRAINT NOT NULL,
    dev_dependency BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE package_files (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    package_version_id UUID REFERENCES package_versions(id),
    file_id UUID REFERENCES files(id)
);

CREATE TABLE package_stars (
    package_id UUID REFERENCES packages(id),
    user_id UUID REFERENCES users(id),
    PRIMARY KEY (package_id, user_id)
);

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE package_tags (
    package_id UUID REFERENCES packages(id),
    tags_id UUID REFERENCES tags(id),
    PRIMARY KEY (package_id, tags_id)
);

-- triggers and function
CREATE FUNCTION set_current_timestamp_updated_at()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_set_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
EXECUTE FUNCTION set_current_timestamp_updated_at();

CREATE TRIGGER organizations_set_updated_at
    BEFORE UPDATE ON organizations
    FOR EACH ROW
EXECUTE FUNCTION set_current_timestamp_updated_at();

CREATE TRIGGER organization_members_set_updated_at
    BEFORE UPDATE ON organization_members
    FOR EACH ROW
EXECUTE FUNCTION set_current_timestamp_updated_at();

CREATE TRIGGER packages_set_updated_at
    BEFORE UPDATE ON packages
    FOR EACH ROW
EXECUTE FUNCTION set_current_timestamp_updated_at();

CREATE TRIGGER package_versions_set_updated_at
    BEFORE UPDATE ON package_versions
    FOR EACH ROW
EXECUTE FUNCTION set_current_timestamp_updated_at();

CREATE TRIGGER package_dependencies_set_updated_at
    BEFORE UPDATE ON package_dependencies
    FOR EACH ROW
EXECUTE FUNCTION set_current_timestamp_updated_at();