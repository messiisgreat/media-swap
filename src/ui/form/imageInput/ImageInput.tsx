"use client";

import { ImagePreview } from "@/ui/form/imageInput/ImagePreview";
import { TestDataButton } from "@/ui/form/imageInput/TestDataButton";
import { fetchImageAndConvertToFile } from "@/ui/form/imageInput/fetcher";
import {
  addFileWithPreview,
  processDroppedFiles,
} from "@/ui/form/imageInput/utils";
import { Label } from "@/ui/form/inputs/Label";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import { useDropzone } from "react-dropzone";
import { BiSolidCamera } from "react-icons/bi";

export type FileWithPreview = { file: File; preview: string };

type Props = Omit<ComponentPropsWithoutRef<"input">, "multiple" | "type"> & {
  labelText?: string;
};

/**
 * 画像を選択するinputタグにCSSを適用したラッパー
 * @param props inputタグのその他の属性
 * @returns label
 */
export const ImageInput = ({ labelText, required, ...props }: Props) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const id = useId();
  const ref = useRef<HTMLInputElement | null>(null);
  const isDev = process.env.NODE_ENV !== "production";
  const onDrop = useCallback(async (droppedFiles: File[]) => {
    const processedFiles = await processDroppedFiles(droppedFiles);
    setFiles((prevFiles) => addFileWithPreview(prevFiles, processedFiles, 10));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      ".heic": [],
      ".heif": [],
    },
    multiple: true,
    noClick: true,
  });

  // アンマウント時に画像のプレビューを削除してメモリリークを防ぐ
  useEffect(
    () => () => files.forEach((file) => URL.revokeObjectURL(file.preview)),
  );

  // ボタンがクリックされたらpiscum.photosから画像を取得して追加
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (files.length < 10) {
        // eslint-disable-next-line no-restricted-syntax
        const target = event.target as HTMLElement;
        if (target.id === `${id}-test`) {
          fetchImageAndConvertToFile()
            .then((file) => {
              const fileWithPreview = {
                file,
                preview: URL.createObjectURL(file),
              };
              setFiles((previousFiles) => [...previousFiles, fileWithPreview]);
            })
            .catch((error) => console.error("Error:", error));
        }
      }
    };
    if (isDev) {
      document.addEventListener("click", handleClick);
    }
    return () => {
      if (isDev) {
        document.removeEventListener("click", handleClick);
      }
    };
  }, [files, id, isDev]);

  // inputタグに選択されたすべての画像を追加する
  useEffect(() => {
    const dataTransfer = new DataTransfer();
    files.forEach((fileWithPreview) => {
      dataTransfer.items.add(fileWithPreview.file);
    });
    if (ref.current) {
      ref.current.files = dataTransfer.files;
    }
  }, [files]);

  const handleRemove = useCallback((index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  }, []);

  const labelClass = `flex items-center justify-center rounded-md border bg-white
${
  files?.length < 10
    ? "cursor-pointer gap-1 border-red-500 text-red-500 hover:bg-red-50"
    : "cursor-no-drop border-neutral-300 text-neutral-300"
}`;
  return (
    <div className="grid">
      {labelText && <Label required={required}>{labelText}</Label>}
      <ul className="grid grid-cols-3 gap-2">
        {files.map((fileWithPreview, i) => (
          <li key={fileWithPreview.file.name} className="relative">
            <ImagePreview
              index={i}
              fileWithPreview={fileWithPreview}
              onRemove={handleRemove}
            />
          </li>
        ))}
      </ul>
      <label className={labelClass} htmlFor={id}>
        <input
          {...getInputProps()}
          type="file"
          multiple
          className="hidden"
          {...{ ref, id, ...props }}
        />
        <div
          {...getRootProps()}
          className="flex flex-row items-center justify-center gap-1 px-3 py-3.5"
        >
          <BiSolidCamera size={20} />
          <p className="font-bold">画像を選択する</p>
        </div>
      </label>
      {isDev && (
        <TestDataButton
          className="fixed left-3 max-md:bottom-16 md:bottom-3"
          id={`${id}-test`}
        />
      )}
    </div>
  );
};
