source .env
mongodump --uri $MONGO_URI --gzip --archive=dump.gz