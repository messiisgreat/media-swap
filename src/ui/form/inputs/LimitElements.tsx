"use client";

import {
  useCallback,
  useState,
  type ChangeEvent,
  type ComponentProps,
} from "react";

import { Input, Textarea } from "@/ui/form/inputs/elements";

type CommonProps = {
  /** 最大文字数 */
  maxLength: number;
  /** 文字数制限ラベルを表示するか */
  hideLimit?: boolean;
};

type LimitInputProps = CommonProps &
  Omit<ComponentProps<typeof Input>, "onChange">;

/**
 * 文字数制限付きのinputタグ
 * 文字数の入力を超過しても入力自体は制限したくないため、maxLengthをオーバーライドしている
 * @returns input,label
 */
export const LimitInput = ({
  maxLength,
  hideLimit = false,
  ...props
}: LimitInputProps) => {
  const [charCount, setCharCount] = useState(0);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCharCount(e.currentTarget.value.length);
  }, []);
  const isOverLimit = charCount > maxLength;
  return (
    <>
      <Input onChange={handleChange} {...props} />
      {!hideLimit && (
        <label
          className={`label-text-alt flex w-full justify-between ${
            isOverLimit ? "text-error" : "text-body"
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

type LimitTextareaProps = CommonProps &
  Omit<ComponentProps<typeof Textarea>, "onChange">;

/**
 * 文字数制限付きのtextareaタグ
 * 文字数の入力を超過しても入力自体は制限したくないため、maxLengthをオーバーライドしている
 * @returns textarea,label
 */
export const LimitTextarea = ({
  maxLength,
  hideLimit = false,
  ...props
}: LimitTextareaProps) => {
  const [charCount, setCharCount] = useState(0);
  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.currentTarget.value.length);
  }, []);
  const isOverLimit = charCount > maxLength;
  return (
    <>
      <Textarea onChange={handleChange} {...props} />
      {!hideLimit && (
        <label
          className={`label-text-alt flex w-full justify-between ${
            isOverLimit ? "text-error" : "text-body"
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
