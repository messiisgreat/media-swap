"use client";

import { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

/**
 * フォーム送信ボタン
 *
 * @param {ReactNode} props.children - ボタン内に表示されるコンテンツ
 * @param {string} [props.className] - 追加のCSSクラス名(省略可能)
 * @returns
 */
export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  // useFormStatusは、フォームの送信状態を返すフックです。Loading中かどうかを判定するために使います。
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      className={`btn btn-primary ${className}`}
      type="submit"
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
}
