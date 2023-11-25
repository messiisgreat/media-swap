"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  /** 送信中に子要素を非表示にするかどうか */
  hideChildrenInPending?: boolean;
} & Omit<ComponentProps<"button">, "type" | "disabled">;

/**
 * フォームに設置する送信ボタン
 * 送信中はローディングアイコンを表示し、無効化する
 * @returns button
 */
export const SubmitButton = ({
  children,
  className,
  hideChildrenInPending = false,
  ...props
}: Props) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      className={`btn btn-primary ${className}`}
      type="submit"
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner"></span>}
      {pending && hideChildrenInPending ? null : children}
    </button>
  );
};
