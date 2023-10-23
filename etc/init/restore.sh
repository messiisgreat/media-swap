#!/bin/bash
mongorestore --gzip --archive=/docker-entrypoint-initdb.d/dump.gz
