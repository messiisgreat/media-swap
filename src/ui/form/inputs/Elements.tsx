import {
  DEFAULT_INPUT_MAX_LENGTH,
  DEFAULT_TEXTAREA_MAX_LENGTH,
} from "@/constants/maxLength";
import { Label } from "@/ui/form/inputs/Label";
import { forwardRef, memo, type ComponentPropsWithoutRef } from "react";

import { twMerge } from "tailwind-merge";

type CommonProps = {
  labelText?: string;
};

type InputProps = CommonProps & {
  prefix?: string;
  suffix?: string;
};

/**
 * inputタグにCSSを適用したラッパー
 */
export const Input = memo(
  forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input"> & InputProps>(
    (
      {
        className: _className = "",
        maxLength = DEFAULT_INPUT_MAX_LENGTH,
        labelText,
        required,
        suffix,
        prefix,
        ...props
      },
      ref,
    ) => {
      const className = twMerge("input input-bordered", _className);
      return (
        <div className="flex w-full flex-col">
          {labelText && <Label required={required}>{labelText}</Label>}
          {prefix || suffix ? (
            <div className="relative flex items-center font-bold">
              {prefix && <div className="absolute ml-4">{prefix}</div>}
              <input {...{ ref, maxLength, required, className, ...props }} />
              {suffix && <div className="absolute end-0 mr-3">{suffix}</div>}
            </div>
          ) : (
            <input {...{ ref, maxLength, required, className, ...props }} />
          )}
        </div>
      );
    },
  ),
);

/**
 * textareaタグにCSSを適用したラッパー
 */
export const Textarea = memo(
  forwardRef<
    HTMLTextAreaElement,
    ComponentPropsWithoutRef<"textarea"> & CommonProps
  >(
    (
      {
        className: _className = "",
        maxLength = DEFAULT_TEXTAREA_MAX_LENGTH,
        labelText,
        required,
        ...props
      },
      ref,
    ) => {
      const className = twMerge("textarea textarea-bordered", _className);
      return (
        <div className="flex w-full flex-col">
          {labelText && <Label required={required}>{labelText}</Label>}
          <textarea {...{ ref, maxLength, required, className, ...props }} />
        </div>
      );
    },
  ),
);

type SelectProps = CommonProps &
  ComponentPropsWithoutRef<"select"> & {
    options: Record<string | number, string | number>;
  };

/**
 * selectタグにCSSを適用したラッパー
 */
export const Select = memo(
  forwardRef<HTMLSelectElement, SelectProps>(
    (
      { className: _className = "", labelText, options, required, ...props },
      ref,
    ) => {
      const className = twMerge("select select-bordered", _className);
      return (
        <div className="flex flex-col">
          {labelText && <Label required={required}>{labelText}</Label>}
          <select {...{ ref, required, className, ...props }}>
            <option disabled value="">
              選択してください
            </option>
            {Object.keys(options).map((option) => (
              <option key={option} value={option}>
                {options[option]}
              </option>
            ))}
          </select>
        </div>
      );
    },
  ),
);
