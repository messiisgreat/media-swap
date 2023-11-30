"use client";

import { ImagePreview } from "@/components/form/imageInput/ImagePreview";
import { addGrayBackground } from "@/components/form/imageInput/addGrayBackground";
import { fetchImageAndConvertToFile } from "@/components/form/imageInput/fetcher";
import {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { BiSolidCamera } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

type FileWithPreview = File & { preview: string };

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
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(async (droppedFiles: File[]) => {
    const processedFiles = await Promise.all(
      droppedFiles.map(async (file) => {
        const ext = file?.name.split(".").pop()?.toLowerCase();
        if (ext === "heic" || ext === "heif") {
          try {
            if (typeof window !== "undefined") {
              const heic2any = (await import("heic2any")).default; // 動的import
              const output = await heic2any({
                blob: file,
                toType: "image/jpeg",
                quality: 0.7,
              });
              const outputBlob = Array.isArray(output) ? output[0] : output; // outputがBlobの配列かどうかをチェックする
              const newName = file.name.replace(/\.(heic|heif)$/i, "") + ".jpg"; // 拡張子をheic/heifからjpgに変更する
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
    setFiles((previousFiles) => {
      const spaceLeft = 10 - previousFiles.length;
      const acceptedFiles = processedFiles.slice(0, spaceLeft);
      const filesWithPreview = acceptedFiles.map((file: File | undefined) =>
        file
          ? Object.assign(file, { preview: URL.createObjectURL(file) })
          : undefined,
      ) as FileWithPreview[];
      return [
        ...previousFiles,
        ...filesWithPreview.filter(
          (file): file is FileWithPreview => file !== undefined,
        ),
      ];
    });
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

  useEffect(() => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
    if (inputRef.current) {
      inputRef.current.files = dataTransfer.files;
    }
  }, [files]);

  useEffect(() => {
    return () =>
      files.forEach((file: FileWithPreview) =>
        URL.revokeObjectURL(file.preview),
      );
  }, [files]);

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
                preview: URL.createObjectURL(file),
              }) as FileWithPreview;
              dataTransfer.items.add(file);
              if (inputRef.current) {
                inputRef.current.files = dataTransfer.files;
              }
              setFiles((previousFiles) => [...previousFiles, fileWithPreview]);
            })
            .catch((error) => console.error("Error:", error));
        }
      }
    };
    if (process.env.NODE_ENV !== "production") {
      document.addEventListener("click", handleClick);
    }
    return () => {
      if (process.env.NODE_ENV !== "production") {
        document.removeEventListener("click", handleClick);
      }
    };
  }, [files]);

  const removeFile = (name: string) => {
    setFiles(files.filter((file) => file.name !== name));
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
        {files.map((file) => (
          <li key={file.name} className="relative">
            <button
              type="button"
              className="absolute right-4 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-700 opacity-75"
              onClick={() => removeFile(file.name)}
            >
              <FaTimes color="white" />
            </button>
            <ImagePreview file={file} />
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
    </div>
  );
}
