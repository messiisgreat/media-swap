import { ComponentPropsWithoutRef, forwardRef } from "react";
import { BiSolidCamera } from "react-icons/bi";

/**
 * inputタグにCSSを適用したラッパー
 */
type InputProps = {
  labelText?: string;
  labelFooter?: string;
};
export const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input"> & InputProps
>(function Input({ className, labelText, labelFooter, ...props }, ref) {
  const inputClass = `input input-bordered ${className ?? ""}`;
  return (
    <div className="flex flex-col">
      {labelText && <label>{labelText}</label>}
      <input className={inputClass} {...props} ref={ref} />
      {labelFooter && (
        <label className="label-text-alt self-end">{labelFooter}</label>
      )}
    </div>
  );
});

/**
 * textareaタグにCSSを適用したラッパー
 */
type TextareaProps = {
  labelText?: string;
  labelFooter?: string;
};
export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<"textarea"> & TextareaProps
>(function Textarea({ className, labelText, labelFooter, ...props }, ref) {
  const textareaClass = `textarea textarea-bordered ${className ?? ""}`;
  return (
    <div className="flex flex-col">
      {labelText && <label>{labelText}</label>}
      <textarea className={textareaClass} {...props} ref={ref} />
      {labelFooter && (
        <label className="label-text-alt self-end">{labelFooter}</label>
      )}
    </div>
  );
});

/**
 * selectタグにCSSを適用したラッパー
 */
type SelectProps = {
  labelText?: string;
  optionItems?: (string | number)[];
};
export const Select = forwardRef<
  HTMLSelectElement,
  ComponentPropsWithoutRef<"select"> & SelectProps
>(function Select({ className, labelText, optionItems, ...props }, ref) {
  const selectClass = `select select-bordered ${className ?? ""}`;
  const sliceNumver = 1;
  const reOptionItems = optionItems?.slice(sliceNumver);
  return (
    <div className="flex flex-col">
      {labelText && <label>{labelText}</label>}
      <select className={selectClass} {...props} ref={ref}>
        <option selected disabled>
          {optionItems?.[0]}
        </option>
        {reOptionItems?.map((optionItem) => (
          <option key={optionItem}>{optionItem}</option>
        ))}
      </select>
    </div>
  );
});

/**
 * 画像を選択するinputタグにCSSを適用したラッパー
 * @param id 一意のIDを指定する clientではuseID, serverではcuidを使用する
 * @param props inputタグのattribute
 * @returns label
 */
type ImageInputProps = {
  labelText?: string;
};
export const ImageInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input"> & ImageInputProps
>(function ImageInput({ className, id, labelText, ...props }, ref) {
  const labelClass = `flex cursor-pointer items-center justify-center 
  gap-1 rounded-md border border-red-500 bg-white 
  py-3.5 text-red-500
  hover:bg-red-50 ${className ?? ""}`;
  return (
    <div>
      {labelText && <label>{labelText}</label>}
      <label className={labelClass} htmlFor={id}>
        <BiSolidCamera size={20} />
        <p className="font-bold">画像を選択する</p>
        <input
          required
          type="file"
          accept="image/*"
          id={id}
          className="hidden"
          ref={ref}
          {...props}
        />
      </label>
    </div>
  );
});
