import { v2 as cloudinary } from "cloudinary";
import { env } from "@/utils/env";

const cloudinaryConfig = {
  cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  api_key: env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
};

async function getSignature(): Promise<{
  timestamp: number;
  signature: string;
}> {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "swappy" },
    cloudinaryConfig.api_secret,
  );

  return { timestamp, signature };
}

async function uploadSingleFile(
  file: File,
  timestamp: number,
  signature: string,
  apiKey: string,
  uploadUrl: string,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp.toString());
  formData.append("folder", "swappy");

  try {
    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error("Cloudinary upload failed");
    }
  } catch {
    throw new Error("Failed to upload file");
  }
}

/**
 * 画像をCloudinaryにアップロードする
 * @param files ユーザーがドロップしたファイル
 * @returns Promise<string>[]
 */
export async function uploadToCloudinary(files: File[]): Promise<string[]> {
  const { timestamp, signature } = await getSignature();

  const uploadPromises: Promise<string>[] = [];

  files.forEach((file) => {
    const uploadPromise = uploadSingleFile(
      file,
      timestamp,
      signature,
      cloudinaryConfig.api_key,
      env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL,
    );

    uploadPromises.push(uploadPromise);
  });

  return Promise.all(uploadPromises);
}
