CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email_verified_at TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE user_roles (
    user_id UUID REFERENCES users(id),
    role_id UUID REFERENCES roles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE organization_invites (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    organization_id UUID REFERENCES organizations(id),
    role_id UUID REFERENCES roles(id),
    email TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE packages (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    organization_id UUID REFERENCES organizations(id),
    name TEXT UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE package_versions (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    package_id UUID REFERENCES packages(id),
    uploaded_by UUID REFERENCES users(id),
    version TEXT,
    readme TEXT,
    changelog TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE package_dependencies (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    package_version_id UUID REFERENCES package_versions(id),
    dependency_package_id UUID REFERENCES package_dependencies(id),
    version_constraint TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE package_stars (
    package_id UUID REFERENCES packages(id),
    user_id UUID REFERENCES users(id)
);

CREATE TABLE package_files (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    package_version_id UUID REFERENCES package_versions(id),
    file_name TEXT,
    storage_path TEXT,
    file_size INTEGER,
    uploaded_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ
);

CREATE TABLE organization_members (
    organization_id UUID REFERENCES packages(id),
    user_id UUID REFERENCES packages(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    name TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE package_tags (
    package_id UUID REFERENCES packages(id),
    tags_id UUID REFERENCES tags(id)
);

CREATE TABLE package_tags (
    package_id UUID REFERENCES packages(id),
    tags_id UUID REFERENCES tags(id)
);

-- triggers and function

CREATE FUNCTION validated_email()
    RETURNS TRIGGER AS
$$
BEGIN
    IF NEW.email NOT LIKE '%@%' THEN
        RAISE EXCEPTION 'The email does not container an @ sign';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER valid_user_email_trigger
    BEFORE INSERT OR UPDATE
    ON users
    FOR EACH ROW
EXECUTE FUNCTION validated_email();

---

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

CREATE TRIGGER roles_set_updated_at
    BEFORE UPDATE ON roles
    FOR EACH ROW
EXECUTE FUNCTION set_current_timestamp_updated_at();

CREATE TRIGGER roles_set_updated_at
    BEFORE UPDATE ON roles
    FOR EACH ROW
EXECUTE FUNCTION set_current_timestamp_updated_at();

CREATE TRIGGER packages
    BEFORE UPDATE ON packages
    FOR EACH ROW
EXECUTE FUNCTION set_current_timestamp_updated_at();

CREATE TRIGGER package_versions
    BEFORE UPDATE ON package_versions
    FOR EACH ROW
EXECUTE FUNCTION set_current_timestamp_updated_at();

CREATE TRIGGER package_dependencies
    BEFORE UPDATE ON package_dependencies
    FOR EACH ROW
EXECUTE FUNCTION set_current_timestamp_updated_at();