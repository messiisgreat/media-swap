// lib/s3.ts
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// AWS は後々使わないので、eslint-disable-next-line を指定しておく
// eslint-disable-next-line jsdoc/require-jsdoc
export async function uploadToS3(
  file: File,
  filename: string,
): Promise<string> {
  const fileUint8Array = new Uint8Array(await file.arrayBuffer());

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME ? process.env.AWS_BUCKET_NAME : "",
    Key: filename,
    Body: fileUint8Array,
    ContentType: "image/*",
  };

  const result = await s3.upload(params).promise();
  return result.Location;
}
