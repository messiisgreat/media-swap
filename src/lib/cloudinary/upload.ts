import { type CloudinaryUploadResponse } from "@/lib/cloudinary/type";
import { failure, success, type Result } from "@/lib/result";
import { fetchResult } from "@/utils/fetcher";
import { env } from "@/utils/serverEnv";
import { isURLString } from "@/utils/typeGuard";
import { type URLString } from "@/utils/types";

const uploadSingleFile = async (
  file: File,
  uploadUrl: URLString,
  upload_preset: string,
): Promise<Result<string, string>> => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("folder", "swappy");
  formData.append("upload_preset", upload_preset);
  formData.append("fetch_format", "auto");

  const result = await fetchResult<CloudinaryUploadResponse>(uploadUrl, {
    method: "POST",
    body: formData,
  });

  if (result.isFailure) {
    return failure(result.error.title);
  } else {
    const secureURL = result.value.secure_url;
    if (isURLString(secureURL)) {
      return success(secureURL);
    } else {
      return failure("invalid url");
    }
  }
};

/**
 * 画像をCloudinaryにアップロードする
 * @param files ユーザーがドロップしたファイル
 * @returns アップロードされた画像のURL配列
 */
export const uploadToCloudinary = async (files: File[]) => {
  const uploadPromises = files.map((file) =>
    uploadSingleFile(
      file,
      env.CLOUDINARY_UPLOAD_URL,
      env.CLOUDINARY_UPLOAD_PRESET,
    ),
  );

  const uploadResults = await Promise.all(uploadPromises);
  const successResults = uploadResults.reduce<string[]>((acc, result) => {
    if (result.isSuccess) {
      return [...acc, result.value];
    } else {
      return acc;
    }
  }, []);

  return successResults;
};
