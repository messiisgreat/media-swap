"use client";
import { ComponentPropsWithoutRef, forwardRef, useState } from "react";
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
 * テキスト入力フィールドの文字数制限を扱うためのフックス
 * @param {string} initialValue - テキスト入力フィールドの初期値
 * @param {number} limit - テキスト入力フィールドで許可される最大文字数（オプション）
 * @returns {object} - テキスト入力フィールドの現在の値、文字数カウント、および値を更新するためのhandleChange関数を含むオブジェクト
 */
function useCharacterLimit(
  initialValue: string,
  limit?: number,
): {
  value: string;
  characterCount: number;
  handleChange: (newValue: string) => void;
} {
  const [value, setValue] = useState(initialValue);
  const [characterCount, setCharacterCount] = useState(initialValue.length || 0);
  const handleChange = (newValue: string) => {
    if (limit && newValue.length > limit) {
      setValue(newValue.substring(0, limit));
      setCharacterCount(limit);
    } else {
      setValue(newValue);
      setCharacterCount(newValue.length);
    }
  };
  return { value, characterCount, handleChange };
}
/**
 * inputタグにCSSを適用したラッパー
 */
export const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input"> & FormCommonProps
>(function Input({ className, labelText, characterLimit, ...props }, ref) {
  const inputClass = `input input-bordered ${className ?? ""}`;
  const { value, characterCount, handleChange } = useCharacterLimit(
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
      {characterLimit && (
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
  const { value, characterCount, handleChange } = useCharacterLimit(
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
      {characterLimit && (
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
  optionItems: (string | number)[];
};

/**
 * selectタグにCSSを適用したラッパー
 */
export const Select = forwardRef<
  HTMLSelectElement,
  ComponentPropsWithoutRef<"select"> & SelectProps
>(function Select({ className, labelText, optionItems, ...props }, ref) {
  const selectClass = `select select-bordered ${className ?? ""}`;
  return (
    <div className="flex flex-col">
      {labelText && <label>{labelText}</label>}
      <select className={selectClass} {...props} ref={ref}>
        {optionItems?.map((optionItem, index) => (
          <option key={optionItem} disabled={index === 0}>
            {optionItem}
          </option>
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
