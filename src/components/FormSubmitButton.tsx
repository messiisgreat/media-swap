"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
  hideChildrenInPending?: boolean;
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
  hideChildrenInPending = false,
  ...props
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      className={`btn btn-primary ${className}`}
      type="submit"
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner"></span>}
      {pending && hideChildrenInPending ? null:children}
    </button>
  );
}
