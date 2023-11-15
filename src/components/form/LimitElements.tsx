"use client";

import { Input, Textarea } from "@/components/form/Elements";
import { ComponentProps, useRef, useState } from "react";

type LimitInputProps = Omit<ComponentProps<typeof Input>, "onChange"> & {
  maxLength: number;
};

/**
 * 文字数制限付きのinputタグ
 */
export const LimitInput = ({ maxLength, ...props }: LimitInputProps) => {
  const [charCount, setCharCount] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const handleChange = () => {
    setCharCount(ref.current?.value.length ?? 0);
  };
  const isOverLimit = charCount > maxLength;
  return (
    <>
      <Input ref={ref} onChange={handleChange} {...props} />
      <label
        className={`label-text-alt flex justify-between ${
          isOverLimit ? "text-error" : "text-black"
        }`}
      >
        <span>{isOverLimit ? "文字数が超過しています" : ""}</span>
        <span>
          {charCount}/{maxLength}
        </span>
      </label>
    </>
  );
};

type LimitTextareaProps = Omit<ComponentProps<typeof Textarea>, "onChange"> & {
  maxLength: number;
};

/**
 * 文字数制限付きのtextareaタグ
 */
export const LimitTextarea = ({ maxLength, ...props }: LimitTextareaProps) => {
  const [charCount, setCharCount] = useState(0);
  const ref = useRef<HTMLTextAreaElement>(null);
  const handleChange = () => {
    setCharCount(ref.current?.value.length ?? 0);
  };
  const isOverLimit = charCount > maxLength;
  return (
    <>
      <Textarea ref={ref} onChange={handleChange} {...props} />
      <label
        className={`label-text-alt flex justify-between ${
          isOverLimit ? "text-error" : "text-black"
        }`}
      >
        <span>{isOverLimit ? "文字数が超過しています" : ""}</span>
        <span>
          {charCount}/{maxLength}
        </span>
      </label>
    </>
  );
};
