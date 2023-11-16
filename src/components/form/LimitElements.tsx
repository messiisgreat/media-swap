"use client";

import { Input, Textarea } from "@/components/form/Elements";
import { ChangeEvent, ComponentProps, useCallback, useState } from "react";

type LimitInputProps = Omit<ComponentProps<typeof Input>, "onChange"> & {
  maxLength: number;
  hideLimit?: boolean;
};

/**
 * 文字数制限付きのinputタグ
 */
export const LimitInput = ({
  maxLength,
  hideLimit = false,
  ...props
}: LimitInputProps) => {
  const [charCount, setCharCount] = useState(0);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCharCount(e.currentTarget.value.length ?? 0);
  }, []);
  const isOverLimit = charCount > maxLength;
  return (
    <>
      <Input onChange={handleChange} {...props} />
      {!hideLimit && (
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
      )}
    </>
  );
};

type LimitTextareaProps = Omit<ComponentProps<typeof Textarea>, "onChange"> & {
  maxLength: number;
  hideLimit?: boolean;
};

/**
 * 文字数制限付きのtextareaタグ
 */
export const LimitTextarea = ({
  maxLength,
  hideLimit = false,
  ...props
}: LimitTextareaProps) => {
  const [charCount, setCharCount] = useState(0);
  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.currentTarget.value.length ?? 0);
  }, []);
  const isOverLimit = charCount > maxLength;
  return (
    <>
      <Textarea
        onChange={(e) => {
          handleChange(e);
        }}
        {...props}
      />
      {!hideLimit && (
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
      )}
    </>
  );
};
