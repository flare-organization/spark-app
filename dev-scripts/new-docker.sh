#!/usr/bin/env bash

SCRIPTDIR="$(cd "$(dirname "$0")" && pwd)"

set -x #Enables printing of executed commands to the console

## POSTGRES

docker stop postgres
docker rm -v postgres

echo "Starting Postgres..."

docker run --name postgres \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=toor -d \
  postgres:18.3-alpine

# Wait for postgres to be ready
while ! PGPASSWORD=toor psql -U postgres -p 5432 -h 127.0.0.1 -c "select 1"; do sleep 1; done

PGPASSWORD=toor psql -U postgres -p 5432 -h 127.0.0.1 -c'CREATE DATABASE "local-package-manager";'

echo "Started a fresh Postgres instance ready for development"

## MAILPIT

docker stop mailpit
docker rm -v mailpit

echo "Starting Mailpit..."

docker run -d \
--name=mailpit \
-p 9999:8025 \
-p 1025:1025 \
--env MP_SMTP_AUTH=user1:password1 \
--env MP_SMTP_AUTH_ALLOW_INSECURE=true \
axllent/mailpit

set +x #Disables printing of executed commands to the console
