import { addGrayBackground } from "@/ui/form/imageInput/addGrayBackground";

type FileWithPreview = { file: File; preview: string };

/**
 * ドロップされたファイルの画質を下げてサイズを小さくする
 * @param file ドロップされたファイル
 */
export const reduceImageQuality = async (
  file: File,
): Promise<FileWithPreview | undefined> => {
  const splitFileName = file.name.split(".");
  const ext = splitFileName[splitFileName.length - 1]?.toLowerCase();
  if (ext === "heic" || ext === "heif") {
    try {
      if (typeof window !== "undefined") {
        const heic2any = (await import("heic2any")).default;
        const output = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.7,
        });
        const outputBlob = Array.isArray(output) ? output[0] : output;
        if (!outputBlob) throw Error;

        const newName = `${file.name.replace(/\.(heic|heif)$/i, "")}.jpg`;
        const reducedFile = new File([outputBlob], newName, {
          type: "image/jpeg",
        });
        const preview = URL.createObjectURL(reducedFile);
        const fileWithPreview = Object.assign(
          {},
          structuredClone(reducedFile),
          {
            file,
            preview,
          },
        );
        return fileWithPreview;
      }
    } catch (error) {
      throw new Error(`Failed to convert image file: ${file.name}`);
    }
  } else {
    const grayBackgroundFile = await addGrayBackground(file);
    const preview = URL.createObjectURL(grayBackgroundFile);
    const fileWithPreview = Object.assign(
      {},
      structuredClone(grayBackgroundFile),
      {
        file,
        preview,
      },
    );
    return fileWithPreview;
  }
};

/**
 * ドロップされたファイルを処理する
 * @param droppedFiles ドロップされたファイル
 * @returns Promise<FileWithPreview>[]
 */
export const processDroppedFiles = async (
  droppedFiles: File[],
): Promise<FileWithPreview[]> => {
  const processedFiles = await Promise.all(
    droppedFiles.map(reduceImageQuality),
  );
  return processedFiles.filter(
    (file): file is FileWithPreview => file !== undefined,
  );
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
