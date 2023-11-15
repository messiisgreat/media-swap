"use client";
import { ComponentPropsWithoutRef, forwardRef } from "react";

/**
 * Formの共通型
 */
type FormCommonProps = {
  labelText?: string;
  characterLimit?: number;
  hideLimit?: boolean;
};

/**
 * inputタグにCSSを適用したラッパー
 */
export const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input"> & FormCommonProps
>(function Input(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { className, labelText, characterLimit, hideLimit = false, ...props },
  ref,
) {
  const inputClass = `input input-bordered ${className ?? ""}`;
  return (
    <div className="flex w-full flex-col">
      {labelText && <label>{labelText}</label>}
      <input className={inputClass} {...props} ref={ref} />
      {/* {characterLimit && error ? (
        <div className="flex justify-between">
          <label className="label-text-alt text-error">{error}</label>
          {hideLimit ? null : (
            <label className="label-text-alt self-end">
              {characterCount}/{characterLimit}
            </label>
          )}
        </div>
      ) : characterLimit && !hideLimit ? (
        <label className="label-text-alt self-end">
          {characterCount}/{characterLimit}
        </label>
      ) : null} */}
    </div>
  );
});

/**
 * textareaタグにCSSを適用したラッパー
 */
export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<"textarea"> & FormCommonProps
>(function Textarea(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { className, labelText, characterLimit, hideLimit = false, ...props },
  ref,
) {
  const textareaClass = `textarea textarea-bordered ${className ?? ""}`;
  return (
    <div className="flex w-full flex-col">
      {labelText && <label>{labelText}</label>}
      <textarea className={textareaClass} {...props} ref={ref} />
      {/* {characterLimit && error ? (
        <div className="flex justify-between">
          <label className="label-text-alt text-error">{error}</label>
          {hideLimit ? null : (
            <label className="label-text-alt self-end">
              {characterCount}/{characterLimit}
            </label>
          )}
        </div>
      ) : characterLimit && !hideLimit ? (
        <label className="label-text-alt self-end">
          {characterCount}/{characterLimit}
        </label>
      ) : null} */}
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
      <select className={selectClass} {...props} ref={ref}>
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
