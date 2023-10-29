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

export const ImageInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(function ImageInput({ className, id, ...props }, ref) {
  const labelClass = `flex cursor-pointer items-center justify-center 
  rounded-md border border-red-500 bg-white text-red-500 
  hover:border-rose-400 hover:bg-red-50 hover:text-rose-400 ${className ?? ""}`;
  return (
    <>
      <label className={labelClass} htmlFor={id}>
        <div className="flex flex-row items-center justify-center gap-1 px-3 py-3.5">
          <BiSolidCamera size={20} />
          <p className="font-bold">画像を選択する</p>
        </div>
      </label>
      <input
        required
        type="file"
        accept="image/*"
        id={id}
        className="hidden"
        ref={ref}
        {...props}
      />
    </>
  );
});
