#!/bin/bash
echo "Restoring MongoDB data..."
mongorestore --gzip --archive=/docker-entrypoint-initdb.d/dump.gz
echo "Restore completed."
