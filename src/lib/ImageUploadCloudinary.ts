import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
};

async function getSignature(): Promise<{
  timestamp: number;
  signature: string;
}> {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "swappy" },
    cloudinaryConfig.api_secret!,
  );

  return { timestamp, signature };
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
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp.toString());
    formData.append("folder", "swappy");

    const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL!;

    const uploadPromise = fetch(endpoint, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.secure_url) {
          return data.secure_url;
        } else {
          throw new Error("Cloudinary upload failed");
        }
      });

    uploadPromises.push(uploadPromise);
  });

  return Promise.all(uploadPromises);
}
