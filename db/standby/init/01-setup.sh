#!/bin/bash
set -e

echo "Waiting for primary to be ready..."
until pg_isready -h pg-primary -p 5432; do
  sleep 1
done

pg_ctl stop -D /var/lib/postgresql/data || true

rm -rf "$PGDATA"/*

echo "Running base backup..."
PGPASSWORD=replicator_pass pg_basebackup -h pg-primary -D "$PGDATA" -U replicator -Fp -Xs -P -R

sleep 10

# Ensure correct permissions
chown -R postgres:postgres "$PGDATA"

exec postgres