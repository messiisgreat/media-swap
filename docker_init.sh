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

# mongorestoreをリトライ
for i in {1..10}; do
    OUTPUT=$(mongorestore --host $MONGO_HOST --port $MONGO_PORT --gzip --archive=./dump.gz 2>&1)

    if [ $? -eq 0 ]; then
        echo "Mongo restore completed successfully on attempt $i."
        exit 0
    else
        ERROR_MSG=$(echo "$OUTPUT" | grep 'Failed:')
        echo "Failed to restore MongoDB on attempt $i.\n$ERROR_MSG"
        sleep 5 # 5秒待機して再試行
    fi
done

echo "Failed to complete tasks after 5 attempts."
exit 1
