import { addGrayBackground } from "@/components/form/imageInput/addGrayBackground";

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
  );
};
