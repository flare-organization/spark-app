ALTER TABLE bundle_bundles
    ADD COLUMN user_id UUID,
ADD CONSTRAINT fk_bundle_bundels_user
    FOREIGN KEY (user_id)
    REFERENCES core_users(id);