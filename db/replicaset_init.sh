#!/bin/bash

# MongoDB接続情報
MONGO_HOST=${MONGO_HOST:-"localhost"}
MONGO_PORT=${MONGO_PORT:-"27018"}

# レプリカセットの初期化をリトライ
for i in {1..5}; do
    OUTPUT=$(mongosh --quiet --host $MONGO_HOST --port $MONGO_PORT --eval 'rs.initiate({ _id: "replset", members: [ { _id: 0, host: "mongo-primary:27017", priority: 100 }, { _id: 1, host: "mongo-secondary:27017", priority: 10 }, { _id: 2, host: "mongo-arbiter:27017", arbiterOnly: true } ] });' 2>&1)
    STATUS=$?

   if [ $STATUS -eq 0 ]; then
        echo "Replica set initiated successfully on attempt $i."
        break
    else
        echo "Failed to initiate replica set on attempt $i.\n$OUTPUT"
        sleep 5 # 5秒待機して再試行
    fi
done
