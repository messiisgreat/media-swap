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
  // 変換が必要な場合は、サーバーサイドのAPIを呼び出す
  const convertFiles = async (file: File) => {
    if (file.type === "image/heic" || file.type === "image/heif") {
      // ここでサーバーサイドのAPIを呼び出します。
      const convertedFile = await fetch("/api/convert", {
        method: "POST",
        body: file,
      });
      return convertedFile;
    }
    return file;
  };
  const uploadPromises = files.map(async (file) => {
    const processedFile = await convertFiles(file);
    if (processedFile instanceof File) {
      return uploadSingleFile(
        processedFile,
        env.CLOUDINARY_UPLOAD_URL,
        env.CLOUDINARY_UPLOAD_PRESET,
      );
    }
  });

  return Promise.all(uploadPromises);
}
