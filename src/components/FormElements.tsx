import { ComponentPropsWithoutRef, forwardRef } from "react";
import { BiSolidCamera } from "react-icons/bi";

type FormCommonProps = {
  labelText?: string;
  labelFooter?: string;
};

/**
 * inputタグにCSSを適用したラッパー
 */
export const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input"> & FormCommonProps
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
export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<"textarea"> & FormCommonProps
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
 * Select用の型宣言
 */
type SelectProps = FormCommonProps & {
  optionItems?: (string | number)[];
};
/**
 * selectタグにCSSを適用したラッパー
 */
export const Select = forwardRef<
  HTMLSelectElement,
  ComponentPropsWithoutRef<"select"> & SelectProps
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
