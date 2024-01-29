"use client";

import { Button } from "@/ui";
import { type ComponentProps } from "react";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = Omit<ComponentProps<typeof Button>, "type">;

/**
 * フォームに設置する送信ボタン
 * 送信中はローディングアイコンを表示し、無効化する
 * @returns button
 */
export const SubmitButton = ({
  children,
  outline = false,
  secondary = false,
  ...props
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const disabled = props.disabled ?? pending;

  return (
    <Button {...props} type="submit" {...{ outline, secondary, disabled }}>
      {pending ? (
        <span className="loading loading-spinner" aria-hidden="true" />
      ) : (
        children
      )}
    </Button>
  );
};
