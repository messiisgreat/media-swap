import { addGrayBackground } from "@/components/form/imageInput/addGrayBackground";

type FileWithPreview = File & { preview: string };

/**
 * ドロップされたファイルを処理する
 * @param droppedFiles ドロップされたファイル
 * @returns Promise<File>[]
 */
export const processDroppedFiles = async (droppedFiles: File[]) => {
  return Promise.all(
    droppedFiles.map(async (file) => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (ext === "heic" || ext === "heif") {
        try {
          if (typeof window !== "undefined") {
            const heic2any = (await import("heic2any")).default; // 動的import
            const output = await heic2any({
              blob: file,
              toType: "image/jpeg",
              quality: 0.7,
            });
            const outputBlob = Array.isArray(output) ? output[0] : output;
            const newName = file.name.replace(/\.(heic|heif)$/i, "") + ".jpg";
            return new File([outputBlob], newName, {
              type: "image/jpeg",
            });
          }
        } catch (error) {
          console.error("Error converting HEIC/HEIF file:", error);
          return file;
        }
      } else {
        return addGrayBackground(file);
      }
    }),
  ).then((files) => files.filter((file): file is FileWithPreview => !!file));
};

/**
 * ファイルを追加する
 * @param existingFiles 既存のファイル
 * @param newFiles 追加するファイル
 * @param maxFiles 最大ファイル数
 */
export const addFileWithPreview = (
  existingFiles: FileWithPreview[],
  newFiles: FileWithPreview[],
  maxFiles: number,
): FileWithPreview[] => {
  const spaceLeft = maxFiles - existingFiles.length;
  const acceptedFiles = newFiles.slice(0, spaceLeft);
  return [...existingFiles, ...acceptedFiles];
};
