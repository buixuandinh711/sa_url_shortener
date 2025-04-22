#!/bin/bash
set -e

echo "Configuring primary..."

cat >> "$PGDATA/postgresql.conf" <<EOF
wal_level = replica
max_wal_senders = 10
wal_keep_size = 128
# archive_mode = on
# archive_command = 'sudo cp %p /var/lib/postgresql/archive/%f'
listen_addresses = '*'
EOF

cat >> "$PGDATA/pg_hba.conf" <<EOF
host replication replicator all md5
EOF
