#!/bin/bash
mongorestore --gzip --archive=/docker-entrypoint-initdb.d/dump.gz
mongosh --eval '
rs.initiate({
  _id: "replset",
  members: [
    { _id: 0, host: "mongo-primary:27017", priority: 100 },
    { _id: 1, host: "mongo-secondary:27017", priority: 10 },
    { _id: 2, host: "mongo-arbiter:27017", arbiterOnly: true },
  ],
});
'
