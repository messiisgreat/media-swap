"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/ui/Button";

/**
 * 下書き保存・出品ボタン
 * 送信中はボタンを無効化する
 * どちらのボタンが押されたかを、name="isPublic" value="true"|"false" で判定する
 * @returns Fragment > Button
 */
export const SubmitContainer = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button
        type="submit"
        name="isPublic"
        value="false"
        outline
        disabled={pending}
      >
        下書きに保存する
      </Button>
      <Button type="submit" name="isPublic" value="true" disabled={pending}>
        出品する
      </Button>
    </>
  );
};
