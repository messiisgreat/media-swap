import { env } from "@/utils/serverEnv";
import heic2any from "heic2any";

/**
 * HEIF/HEIC形式の画像をJPEGに変換する関数
 * @param imageFile 変換前の画像
 * @returns 変換後の画像
 */
// HEIF/HEIC形式の画像をJPEGに変換する関数
export const convertImage = async (imageFile: File): Promise<Blob> => {
  if (imageFile.type === "image/heif" || imageFile.type === "image/heic") {
    const output = await heic2any({
      blob: imageFile,
      toType: "image/jpeg",
    });

    // output が Blob[] の場合は最初の Blob を使用
    if (Array.isArray(output)) {
      return output[0];
    }

    return output;
  }
  return imageFile;
};

async function uploadSingleFile(
  file: File,
  uploadUrl: string,
  upload_preset: string,
): Promise<string> {
  const formData = new FormData();

  // 画像の変換処理(HEIF/HEIC -> JPEG)
  const convertedFile = await convertImage(file);

  formData.append("file", convertedFile);
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
