"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { useDropzone } from "react-dropzone"
import { BiSolidCamera } from "react-icons/bi"
import { FaXmark } from "react-icons/fa6"

type FileWithPreview = File & { preview: string };

export const UploadImages = () => {
  
  const [files, setFiles] = useState<FileWithPreview[]>([])

  const onDrop = useCallback((droppedFiles: File[]) => {
    if (droppedFiles?.length){
      const filesWithPreview = droppedFiles.map((file: File) => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })) as FileWithPreview[];
      setFiles((previousFiles: FileWithPreview[]) => [
        ...previousFiles,
        ...filesWithPreview
      ])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": []
    },
    multiple: true,
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file: FileWithPreview) => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = (name: File["name"]) => {
    setFiles((files: FileWithPreview[]) => files.filter((file: File) => file.name !== name))
  }

  return (
    <>
      { /* Preview */ }
      <section>
        <h2 className='font-semibold' >出品画像 (最大10枚)</h2>
        <ul className='mt-1 grid grid-cols-4'>
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
                className='p-2 object-contain'
              />
            </li>
          ))}
        </ul>
      </section>
      {files?.length < 10 ?
        (<div 
          {...getRootProps()}
          className='flex items-center justify-center bg-white text-red-500 border border-red-500 rounded-md hover:border-rose-400 hover:bg-red-50 cursor-pointer mt-3 mb-3'>
          <input {...getInputProps({ name: 'file' })} />
          <div className="px-3 py-3.5 flex flex-row items-center justify-center gap-1" >
            <BiSolidCamera size={20}/>
            <p className="font-bold" >画像を選択する</p>
          </div>
        </div>) :
        (<div  className="flex items-center justify-center bg-white text-neutral-300 border border-neutral-300 rounded-md cursor-no-drop">
          <div className='px-3 py-3.5 flex flex-row items-center justify-center gap-1' >
            <BiSolidCamera size={20}/>
            <p className="font-bold" >画像を選択する</p>
          </div>
        </div>)
      }
    </>
  )
}
