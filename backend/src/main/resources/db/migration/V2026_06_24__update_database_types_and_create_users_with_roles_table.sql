ALTER TYPE roles RENAME VALUE 'admin' TO 'ADMIN';
ALTER TYPE roles RENAME VALUE 'member' TO 'MEMBER';
ALTER TYPE roles RENAME VALUE 'owner' TO 'OWNER';

ALTER TYPE roles RENAME TO bundle_roles;
CREATE TYPE core_roles as ENUM('USER', 'ADMIN');

CREATE TABLE core_users(
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE bundle_user_roles(
    username TEXT NOT NULL REFERENCES core_users(username),
    role core_roles NOT NULL,
    PRIMARY KEY (username, role)
);

ALTER TABLE bundles RENAME TO bundle_bundles;
ALTER TABLE bundle_tags RENAME TO bundle_bundle_tags;
ALTER TABLE tags RENAME TO bundle_tags;

ALTER TYPE BundleStatus RENAME TO bundle_visibility;
ALTER TABLE bundle_bundles RENAME COLUMN status TO visibility;