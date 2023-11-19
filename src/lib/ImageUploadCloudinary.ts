import { env } from "@/utils/env";
// import { v2 as cloudinary } from "cloudinary";

// const cloudinaryConfig = {
//   cloud_name: env.CLOUDINARY_CLOUDNAME,
//   upload_preset: env.CLOUDINARY_UPLOAD_PRESET,
//   secure: true,
// };

// async function getSignature(): Promise<{
//   timestamp: number;
//   signature: string;
// }> {
//   const timestamp = Math.round(new Date().getTime() / 1000);

//   const signature = cloudinary.utils.api_sign_request(
//     { timestamp, folder: "swappy" },
//     cloudinaryConfig.api_secret,
//   );

//   return { timestamp, signature };
// }

async function uploadSingleFile(
  file: File,
  uploadUrl: string,
  upload_preset: string,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", "swappy");
  formData.append("upload_preset", upload_preset);

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
export async function uploadToCloudinary(files: File[]) {
  console.log("files", files)
  // const { timestamp, signature } = await getSignature();
  const uploadPromises = files.map((file) =>
    uploadSingleFile(
      file,
      env.CLOUDINARY_UPLOAD_URL,
      env.CLOUDINARY_UPLOAD_PRESET,
    ),
  );

  return Promise.all(uploadPromises);
}
