"use client";

import Image from "next/image";
import {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useState,
  useRef
} from "react";
import { useDropzone } from "react-dropzone";
import { BiSolidCamera } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

// 画像に灰色の背景を追加して、短い辺を長い辺と同じ長さにする関数
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

        // 灰色の背景を設定
        ctx.fillStyle = '#808080';
        ctx.fillRect(0, 0, maxLength, maxLength);

        // 画像を中央に配置
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

type FileWithPreview = File & { preview: string };
type Props = Omit<ComponentPropsWithoutRef<"input">, "multiple" | "type"> & {
  labelText?: string;
};

/**
 * 画像を選択するinputタグにCSSを適用したラッパー
 * @param props inputタグのその他の属性
 * @returns label
 */
export function ImageInput ({ id, labelText, ...props }: Props) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const inputElem = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(async(droppedFiles: File[]) => {
    const processedFiles = await Promise.all(
      droppedFiles.map(file => addGrayBackground(file))
    );
    setFiles((previousFiles) => {
      const spaceLeft = 10 - previousFiles.length;
      const acceptedFiles = processedFiles.slice(0, spaceLeft);
      const filesWithPreview = acceptedFiles.map((file: File) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ) as FileWithPreview[];
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
    const dataTransfer = new DataTransfer();
    files.forEach(file => {
      dataTransfer.items.add(file);
    });
    if (inputElem.current) {
      inputElem.current.files = dataTransfer.files;
    }
  }, [files]);

  useEffect(() => {
    return () =>
      files.forEach((file: FileWithPreview) =>
        URL.revokeObjectURL(file.preview),
      );
  }, [files]);

  async function fetchImageAndConvertToFile(url: string, fileName: string): Promise<File> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (files.length < 10) {
        const target = event.target as HTMLElement;
        if (target.id === 'test-button') {
          const dataTransfer = new DataTransfer();
          fetchImageAndConvertToFile('https://picsum.photos/200/200', `image-${Math.floor(Math.random() * 100000)}.jpg`)
            .then(file => {
              const fileWithPreview = Object.assign(file, {
                preview: URL.createObjectURL(file),
              }) as FileWithPreview;
              dataTransfer.items.add(file);
              if (inputElem.current) {
                inputElem.current.files = dataTransfer.files;
              }
              setFiles((previousFiles) => [...previousFiles, fileWithPreview]);
            })
            .catch(error => console.error('Error:', error));
        }
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
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
          multiple
          ref={inputElem}
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