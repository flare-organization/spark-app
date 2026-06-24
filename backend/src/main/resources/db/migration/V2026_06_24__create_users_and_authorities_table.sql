CREATE TABLE users(
    username TEXT NOT NULL PRIMARY KEY,
    password TEXT NOT NULL,
    enabled BOOLEAN NOT NULL
);

CREATE TABLE authorities (
    username TEXT NOT NULL,
    authority TEXT NOT NULL,
    CONSTRAINT fk_authorities_users FOREIGN KEY(username) REFERENCES USERS(username)
);

CREATE UNIQUE INDEX ix_auth_username ON authorities (username,authority);