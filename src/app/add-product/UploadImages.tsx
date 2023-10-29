"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { useDropzone } from "react-dropzone"
import { BiSolidCamera } from "react-icons/bi"
import { FaXmark } from "react-icons/fa6"

type FileWithPreview = File & { preview: string };

/**
 * 画像アップロードボタンを取りまとめるコンポーネント
 * @returns 画像をアップロードするボタン
 */
export const UploadImages = () => {
  
  const [files, setFiles] = useState<FileWithPreview[]>([])

  const onDrop = useCallback((droppedFiles: File[]) => {
    if (droppedFiles?.length){
      if (files?.length + droppedFiles.length > 10) {
        const acceptedFiles = droppedFiles.slice(0, 10 - files.length);
        const filesWithPreview = acceptedFiles.map((file: File) => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })) as FileWithPreview[];
        setFiles((previousFiles: FileWithPreview[]) => [
          ...previousFiles,
          ...filesWithPreview
        ])
      } else {
        const filesWithPreview = droppedFiles.map((file: File) => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })) as FileWithPreview[];
        setFiles((previousFiles: FileWithPreview[]) => [
          ...previousFiles,
          ...filesWithPreview
        ])
      }
    }
  }, [files])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": []
    },
    multiple: true,
  })

  useEffect(() => {
    return () => files.forEach((file: FileWithPreview) => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = (name: File["name"]) => {
    setFiles((files: FileWithPreview[]) => files.filter((file: File) => file.name !== name))
  }

  return (
    <>
      <div>
        <h2 className="font-semibold" >出品画像 (最大10枚)</h2>
        <ul className="grid grid-cols-4">
          {files.map((file: FileWithPreview) => (
            <li
              key={file.name}
              className="relative"
            >
              <button
                type='button'
                className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-700 opacity-50"
                onClick={() => removeFile(file.name)}
              >
                <FaXmark color="white" />
              </button>
              <Image 
                src={file.preview}
                alt={file.name}
                width={80}
                height={80}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
                className="object-contain p-2"
              />
            </li>
          ))}
        </ul>
      </div>
      {files?.length < 10 ?
        (<div 
          {...getRootProps()}
          className="mb-3 flex cursor-pointer items-center justify-center rounded-md border border-red-500 bg-white text-red-500 hover:border-rose-400 hover:bg-red-50" >
          <input {...getInputProps({ name: "imageFile" })} />
          <div className="flex flex-row items-center justify-center gap-1 px-3 py-3.5" >
            <BiSolidCamera size={20}/>
            <p className="font-bold" >画像を選択する</p>
          </div>
        </div>) :
        (<div  className="mb-3 flex cursor-no-drop items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-300" >
          <div className="flex flex-row items-center justify-center gap-1 px-3 py-3.5" >
            <BiSolidCamera size={20}/>
            <p className="font-bold" >画像を選択する</p>
          </div>
        </div>)
      }
    </>
  )
}
