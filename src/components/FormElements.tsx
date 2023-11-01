import { ComponentPropsWithoutRef, forwardRef } from "react";
import { BiSolidCamera } from "react-icons/bi";

/**
 * Formの共通型
 */
type FormCommonProps = {
  labelText?: string;
  optionItems?: (string | number)[];
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
  return (
    <div className="flex flex-col">
      {labelText && <label>{labelText}</label>}
      <input className={inputClass} {...props} ref={ref} />
      {characterLimit && <></>}
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
  return (
    <div className="flex flex-col">
      {labelText && <label>{labelText}</label>}
      <textarea className={textareaClass} {...props} ref={ref} />
      {characterLimit && <></>}
    </div>
  );
});

/**
 * selectタグにCSSを適用したラッパー
 */
export const Select = forwardRef<
  HTMLSelectElement,
  ComponentPropsWithoutRef<"select"> & FormCommonProps
>(function Select({ className, labelText, optionItems, ...props }, ref) {
  const selectClass = `select select-bordered ${className ?? ""}`;
  const sliceNumber = 1;
  const reOptionItems = optionItems?.slice(sliceNumber);
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
export const ImageInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input"> & FormCommonProps
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
