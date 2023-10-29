# mongorestoreをリトライ

MONGO_HOST=${MONGO_HOST:-"localhost"}
MONGO_PORT=${MONGO_PORT:-"27018"}

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