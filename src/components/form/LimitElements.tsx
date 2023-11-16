"use client";

import { Input, Textarea } from "@/components/form/Elements";
import {
  ChangeEvent,
  ComponentProps,
  useCallback,
  useMemo,
  useState,
} from "react";

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
 * @returns input,label
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

  const isOverLimit = useMemo(
    () => charCount > maxLength,
    [charCount, maxLength],
  );

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

type LimitTextareaProps = CommonProps &
  Omit<ComponentProps<typeof Textarea>, "onChange">;

/**
 * 文字数制限付きのtextareaタグ
 * @returns textarea,label
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

  const isOverLimit = useMemo(
    () => charCount > maxLength,
    [charCount, maxLength],
  );

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
