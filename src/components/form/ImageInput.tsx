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

/**
 * ファイルの型宣言
 */
type FileWithPreview = File & { preview: string };

type Props = Omit<ComponentPropsWithoutRef<"input">, "multiple" | "type"> & {
  labelText?: string;
};

/**
 * 画像を選択するinputタグにCSSを適用したラッパー
 * @param id 一意のIDを指定する clientではuseID, serverではcuidを使用する
 * @param props inputタグのattribute
 * @returns label
 */
export function ImageInput ({ id, labelText, ...props }: Props) {

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const inputElem = useRef<any>()
  const inputForDataTransfer = useRef<any>()

  const onDrop = useCallback((droppedFiles: File[]) => {
    setFiles((previousFiles) => {
      const spaceLeft = 10 - previousFiles.length;
      const acceptedFiles = droppedFiles.slice(0, spaceLeft);
      const filesWithPreview = acceptedFiles.map((file: File) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ) as FileWithPreview[];
      return [...previousFiles, ...filesWithPreview];
    });
  }, []);

  console.log(files)

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
    noClick: true,
  });

  const onChange = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    const _dataTransfer = new DataTransfer()
    console.log(inputForDataTransfer)
    console.log(inputElem)
    Array.prototype.forEach.call(inputForDataTransfer.current.files, (file) => {
        _dataTransfer.items.add(file)
    })
    Array.prototype.forEach.call(inputElem.current.files, (file) => {
        _dataTransfer.items.add(file)
    })
    inputElem.current.files = _dataTransfer.files
    inputForDataTransfer.current.files = _dataTransfer.files
  }

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
        <div
          {...getRootProps()}
          className="flex flex-row items-center justify-center gap-1 px-3 py-3.5"
        >
          <BiSolidCamera size={20} />
          <p className="font-bold">画像を選択する</p>
          <input
          {...props}
          {...getInputProps()}
          id={id}
          type="file"
          ref={inputElem}
          multiple={true}
          className="hidden"
          onChange={onChange}
        />
          <input
          {...props}
          {...getInputProps()}
          ref={inputForDataTransfer}
          type='file'
          className="hidden"
          multiple={true}
          />
        </div>
      </label>
    </div>
  );
}