import { ComponentPropsWithoutRef, forwardRef } from "react";

type CommonProps = {
  labelText?: string;
};

/**
 * inputタグにCSSを適用したラッパー
 */
export const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input"> & CommonProps
>(function Input({ className = "", labelText, ...props }, ref) {
  const inputClass = `input input-bordered ${className}`;
  return (
    <div className="flex w-full flex-col">
      {labelText && <label>{labelText}</label>}
      <input className={inputClass} {...props} ref={ref} />
    </div>
  );
});

/**
 * textareaタグにCSSを適用したラッパー
 */
export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<"textarea"> & CommonProps
>(function Textarea({ className = "", labelText, ...props }, ref) {
  const textareaClass = `textarea textarea-bordered ${className}`;
  return (
    <div className="flex w-full flex-col">
      {labelText && <label>{labelText}</label>}
      <textarea className={textareaClass} {...props} ref={ref} />
    </div>
  );
});

type SelectProps = CommonProps & {
  options: { [key: string | number]: string | number };
};

/**
 * selectタグにCSSを適用したラッパー
 */
export const Select = forwardRef<
  HTMLSelectElement,
  ComponentPropsWithoutRef<"select"> & SelectProps
>(function Select({ className = "", labelText, options, ...props }, ref) {
  const selectClass = `select select-bordered ${className}`;
  return (
    <div className="flex flex-col">
      {labelText && <label>{labelText}</label>}
      <select className={selectClass} {...props} ref={ref}>
        <option disabled value="" selected>
          選択してください
        </option>
        {Object.keys(options).map((option, i) => (
          <option key={i} value={option}>
            {options[option]}
          </option>
        ))}
      </select>
    </div>
  );
});

/**
 * 複数のラジオボタンを束ねて表示する選択肢用コンポーネント
 * @param props inputタグのattribute
 * @returns div
 */
export const RadioGroup = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input"> & SelectProps
>(function RadioGroup({ className = "", labelText, options, ...props }, ref) {
  const radioClass = `radio radio-primary ${className}`;
  return (
    <div className="flex flex-col">
      {labelText && <label>{labelText}</label>}
      <div className="flex flex-row gap-2">
        {Object.keys(options).map((option, i) => (
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
