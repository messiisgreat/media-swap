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
import { useCharacterLimit } from "@/components/formElements/FormElementsHooks";

/**
 * Formの共通型
 */
type FormCommonProps = {
  labelText?: string;
  characterLimit?: number;
};

/**
 * inputタグにCSSを適用したラッパー
 */
export const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input"> & FormCommonProps
>(function Input({ className, labelText, characterLimit, ...props }, ref) {
  const inputClass = `input input-bordered ${className ?? ""}`;
  const { value, error, characterCount, handleChange } = useCharacterLimit(
    "",
    characterLimit,
  );

  return (
    <div className="flex flex-col">
      {labelText && <label>{labelText}</label>}
      <input
        className={inputClass}
        {...props}
        ref={ref}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
      {characterLimit && error ? (
        <div className="flex justify-between">
          <label className="label-text-alt text-error">{error}</label>
          <label className="label-text-alt self-end">
            {characterCount}/{characterLimit}
          </label>
        </div>
      ) : (
        <label className="label-text-alt self-end">
          {characterCount}/{characterLimit}
        </label>
      )}
    </div>
  );
});

/**
 * textareaタグにCSSを適用したラッパー
 */
export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<"textarea"> & FormCommonProps
>(function Textarea({ className, labelText, characterLimit, ...props }, ref) {
  const textareaClass = `textarea textarea-bordered ${className ?? ""}`;
  const { value, error, characterCount, handleChange } = useCharacterLimit(
    "",
    characterLimit,
  );
  return (
    <div className="flex flex-col">
      {labelText && <label>{labelText}</label>}
      <textarea
        className={textareaClass}
        {...props}
        ref={ref}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
      {characterLimit && error ? (
        <div className="flex justify-between">
          <label className="label-text-alt text-error">{error}</label>
          <label className="label-text-alt self-end">
            {characterCount}/{characterLimit}
          </label>
        </div>
      ) : (
        <label className="label-text-alt self-end">
          {characterCount}/{characterLimit}
        </label>
      )}
    </div>
  );
});

/**
 * Selectの型宣言
 */
type SelectProps = FormCommonProps & {
  options: { [key: string | number]: string | number };
};

/**
 * selectタグにCSSを適用したラッパー
 */
export const Select = forwardRef<
  HTMLSelectElement,
  ComponentPropsWithoutRef<"select"> & SelectProps
>(function Select({ className, labelText, options, ...props }, ref) {
  const selectClass = `select select-bordered ${className ?? ""}`;
  return (
    <div className="flex flex-col">
      {labelText && <label>{labelText}</label>}
      <select
        className={selectClass}
        defaultValue={undefined}
        {...props}
        ref={ref}
      >
        <option disabled value={undefined}>
          選択してください
        </option>
        {Object.keys(options)?.map((option, i) => (
          <option key={i} value={option}>
            {options[option]}
          </option>
        ))}
      </select>
    </div>
  );
});

/**
 * ラジオボタン
 * @param props inputタグのattribute
 * @returns div
 */
export const RadioGroup = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input"> & SelectProps
>(function RadioGroup({ className, labelText, options, ...props }, ref) {
  const radioClass = `radio radio-primary ${className ?? ""}`;
  return (
    <div className="flex flex-col">
      {labelText && <label>{labelText}</label>}
      <div className="flex flex-row gap-2">
        {Object.keys(options)?.map((option, i) => (
          <label key={i} className={radioClass}>
            <input
              type="radio"
              value={option}
              {...props}
              ref={ref}
              className="radio"
            />
            <span className="ml-2">{options[option]}</span>
          </label>
        ))}
      </div>
    </div>
  );
});

export const Toggle = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input"> & FormCommonProps
>(function Toggle({ className, labelText, ...props }, ref) {
  const toggleClass = `toggle toggle-primary ${className ?? ""}`;
  return (
    <div className="flex flex-col">
      {labelText && <label>{labelText}</label>}
      <label className={toggleClass}>
        <input type="checkbox" {...props} ref={ref} className="toggle" />
        <span className="toggle-mark"></span>
      </label>
    </div>
  );
});

/**
 * ファイルの型宣言
 */
type FileWithPreview = File & { preview: string };

/**
 * 画像を選択するinputタグにCSSを適用したラッパー
 * @param id 一意のIDを指定する clientではuseID, serverではcuidを使用する
 * @param props inputタグのattribute
 * @returns label
 */
export const ImageInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input"> & FormCommonProps
>(function ImageInput({ id, labelText, ...props }, ref) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

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

  const labelClass =
    files?.length < 10
      ? "flex cursor-pointer items-center justify-center gap-1 rounded-md border border-red-500 bg-white text-red-500 hover:bg-red-50"
      : "flex cursor-no-drop items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-300";

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
});
