"use client";

import { type ComponentProps } from "react";

import { useFormStatus } from "react-dom";
import { Button } from "..";

type SubmitButtonProps = Omit<
  ComponentProps<typeof Button>,
  "type" | "disabled"
>;

/**
 * フォームに設置する送信ボタン
 * 送信中はローディングアイコンを表示し、無効化する
 * @returns button
 */
export const SubmitButton = ({
  children,
  className,
  outline = false,
  secondary = false,
  ...props
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      className={className}
      outline={outline}
      secondary={secondary}
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <span className="loading loading-spinner" aria-hidden="true" />
      ) : (
        children
      )}
    </Button>
  );
};
