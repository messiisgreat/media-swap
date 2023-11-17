"use client";

import Image from "next/image";
import {
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { BiSolidCamera } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

/**
 * ファイルの型宣言
 */
type FileWithPreview = File & { preview: string };

type Props = Omit<ComponentPropsWithoutRef<"input">, "multiple" | "type"> & {
  labelText?: string;
};

/**
 * 画像に灰色の背景を追加して, 短い辺を長い辺と同じ長さにする関数
 * @param file アップロードされた画像ファイル 
 * @returns file 灰色の背景が追加された画像ファイル
 */
async function addGrayBackground(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (!event.target || !event.target.result) {
        reject("FileReader did not load the file.");
        return;
      }

      const img = new window.Image();
      img.src = event.target.result as string;
      img.onload = () => {
        const maxLength = Math.max(img.width, img.height);
        const canvas = document.createElement('canvas');
        canvas.width = maxLength;
        canvas.height = maxLength;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject("Could not create canvas context.");
          return;
        }

        ctx.fillStyle = '#f5f5f5'; // メルカリに合わせた
        ctx.fillRect(0, 0, maxLength, maxLength);

        const offsetX = (maxLength - img.width) / 2;
        const offsetY = (maxLength - img.height) / 2;
        ctx.drawImage(img, offsetX, offsetY, img.width, img.height);

        canvas.toBlob((blob) => {
          if (!blob) {
            reject("Canvas toBlob failed.");
            return;
          }
          resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
        }, 'image/jpeg', 1);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * 画像を選択するinputタグにCSSを適用したラッパー
 * @param id 一意のIDを指定する clientではuseID, serverではcuidを使用する
 * @param props inputタグのattribute
 * @returns label
 */
export const ImageInput = forwardRef<HTMLInputElement, Props>(
  function ImageInput({ id, labelText, ...props }, ref) {
    const [files, setFiles] = useState<FileWithPreview[]>([]);

    const onDrop = useCallback(async (droppedFiles: File[]) => {
      const processedFiles = await Promise.all(
        droppedFiles.map(file => addGrayBackground(file))
      );
    
      setFiles((previousFiles) => {
        const spaceLeft = 10 - previousFiles.length;
        const acceptedFiles = processedFiles.slice(0, spaceLeft);
        const filesWithPreview = acceptedFiles.map((file: File) => ({
          ...file,
          preview: URL.createObjectURL(file),
        })) as FileWithPreview[];
        return [...previousFiles, ...filesWithPreview];
      });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: {
        "image/*": [],
      },
      multiple: true,
      noClick: true,
    });

    useEffect(() => {
      return () =>
        files.forEach((file: FileWithPreview) =>
          URL.revokeObjectURL(file.preview),
        );
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
      <div>
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
              <Image
                src={file.preview}
                alt={file.name}
                width={80}
                height={80}
                className="p-2"
              />
            </li>
          ))}
        </ul>
        <label className={labelClass} htmlFor={id}>
          <input
            {...props}
            {...getInputProps()}
            id={id}
            type="file"
            ref={ref}
            multiple
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
  },
);
