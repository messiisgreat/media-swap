import { type CloudinaryUploadResponse } from "@/lib/cloudinary/type";
import { env } from "@/utils/serverEnv";

async function uploadSingleFile(
  file: File,
  uploadUrl: string,
  upload_preset: string,
): Promise<string> {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("folder", "swappy");
  formData.append("upload_preset", upload_preset);
  formData.append("fetch_format", "auto");

  try {
    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as CloudinaryUploadResponse;
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
  console.log("files", files);
  const uploadPromises = files.map((file) =>
    uploadSingleFile(
      file,
      env.CLOUDINARY_UPLOAD_URL,
      env.CLOUDINARY_UPLOAD_PRESET,
    ),
  );

  const uploadResults = await Promise.all(uploadPromises);
  return uploadResults.filter((url) => typeof url == "string");
}
