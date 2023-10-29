import { ComponentPropsWithoutRef, forwardRef } from "react";
import { BiSolidCamera } from "react-icons/bi";

/**
 * inputタグにCSSを適用したラッパー
 */
export const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(function Input({ className, ...props }, ref) {
  const inputClass = `input input-bordered ${className ?? ""}`;
  return <input className={inputClass} {...props} ref={ref} />;
});

/**
 * textareaタグにCSSを適用したラッパー
 */
export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<"textarea">
>(function Textarea({ className, ...props }, ref) {
  const textareaClass = `textarea textarea-bordered ${className ?? ""}`;
  return <textarea className={textareaClass} {...props} ref={ref} />;
});

/**
 * 画像を選択するinputタグにCSSを適用したラッパー
 * @param id 一意のIDを指定する clientではuseID, serverではcuidを使用する
 * @param props inputタグのattribute
 * @returns label
 */
export const ImageInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(function ImageInput({ className, id, ...props }, ref) {
  const labelClass = `flex cursor-pointer items-center justify-center 
  gap-1 rounded-md border border-red-500 bg-white 
  py-3.5 text-red-500
  hover:bg-red-50 ${className ?? ""}`;
  return (
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
  );
});
