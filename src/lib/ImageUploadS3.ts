// lib/s3.ts
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
});

export async function uploadToS3(file: File, filename: string): Promise<string> {

  const fileUint8Array = new Uint8Array(await file.arrayBuffer());

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME ? process.env.AWS_BUCKET_NAME : '',
    Key: filename,
    Body: fileUint8Array,
    ContentType: 'image/*',
 };

  const result = await s3.upload(params).promise();
  return result.Location;
}
