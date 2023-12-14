"use client";

import { ImagePreview } from "@/ui/form/imageInput/ImagePreview";
import { TestDataButton } from "@/ui/form/imageInput/TestDataButton";
import { fetchImageAndConvertToFile } from "@/ui/form/imageInput/fetcher";
import {
  addFileWithPreview,
  processDroppedFiles,
} from "@/ui/form/imageInput/utils";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import { useDropzone } from "react-dropzone";
import { BiSolidCamera } from "react-icons/bi";

export type FileWithPreview = File & { preview: string };

type Props = Omit<ComponentPropsWithoutRef<"input">, "multiple" | "type"> & {
  labelText?: string;
};

/**
 * 画像を選択するinputタグにCSSを適用したラッパー
 * @param props inputタグのその他の属性
 * @returns label
 */
export function ImageInput({ id, labelText, ...props }: Props) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const inputRef = useRef<HTMLInputElement>(null!);
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
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  });

  // ボタンがクリックされたらpiscum.photosから画像を取得して追加
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (files.length < 10) {
        const target = event.target as HTMLElement;
        if (target.id === "test-button") {
          const dataTransfer = new DataTransfer();
          fetchImageAndConvertToFile()
            .then((file) => {
              const fileWithPreview = Object.assign(file, {
                file,
                preview: URL.createObjectURL(file),
              });
              dataTransfer.items.add(file);
              inputRef.current.files = dataTransfer.files;
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
  }, [files, isDev]);

  const handleRemove = (index: number) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const labelClass = `flex items-center justify-center rounded-md border bg-white
${
  files?.length < 10
    ? "cursor-pointer gap-1 border-red-500 text-red-500 hover:bg-red-50"
    : "cursor-no-drop border-neutral-300 text-neutral-300"
}`;
  return (
    <div className="grid gap-2">
      {labelText && <label>{labelText}</label>}
      <ul className="grid grid-cols-3 gap-2">
        {files.map((file, i) => (
          <li key={file.name} className="relative">
            <ImagePreview index={i} file={file} onRemove={handleRemove} />
          </li>
        ))}
      </ul>
      <label className={labelClass} htmlFor={id}>
        <input
          {...props}
          {...getInputProps()}
          id={id}
          type="file"
          multiple
          ref={inputRef}
          className="hidden"
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
          className="fixed left-3 max-sm:bottom-20 sm:bottom-3"
          id="test-button"
        />
      )}
    </div>
  );
}
