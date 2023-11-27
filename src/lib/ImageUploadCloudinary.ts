import { env } from "@/utils/serverEnv";
import convert from "heic-convert";

/**
 * HEIF/HEIC形式の画像をJPEGに変換する関数
 * @param file 変換前の画像
 * @returns 変換後の画像
 */
// HEIF/HEIC形式の画像をJPEGに変換する関数
// HEIF/HEICフォーマットをJPEGに変換する関数
async function convertHeicToJpeg(file: File) {
  const inputBuffer = await file.arrayBuffer();
  const outputBuffer = await convert({
    buffer: inputBuffer,
    format: "JPEG",
    quality: 1,
  });
  return new File([outputBuffer], file.name.replace(/\..+$/, ".jpg"), {
    type: "image/jpeg",
  });
}

async function uploadSingleFile(
  file: File,
  uploadUrl: string,
  upload_preset: string,
): Promise<string> {
  const formData = new FormData();

  // 画像の変換処理(HEIF/HEIC -> JPEG)
  if (file.type === "image/heic" || file.type === "image/heif") {
    file = await convertHeicToJpeg(file);
  }

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
  console.log("files", files);
  const uploadPromises = files.map((file) =>
    uploadSingleFile(
      file,
      env.CLOUDINARY_UPLOAD_URL,
      env.CLOUDINARY_UPLOAD_PRESET,
    ),
  );

  return Promise.all(uploadPromises);
}
