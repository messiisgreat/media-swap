"use client";

import { Button } from "@/components/Button";
import { useFormStatus } from "react-dom";

/**
 * 下書き保存・出品ボタン
 * 送信中はボタンを無効化する
 * どちらのボタンが押されたかを、name="submit" value="draft"|"publish" で判定する
 * @returns Fragment > Button
 */
export const SubmitContainer = () => {
  const { pending } = useFormStatus();
  const loading = pending && <span className="loading loading-spinner"></span>;

  return (
    <>
      <Button
        type="submit"
        name="submit"
        value="draft"
        outline
        disabled={pending}
      >
        {loading}下書きに保存する
      </Button>
      <Button type="submit" name="submit" value="publish" disabled={pending}>
        {loading}出品する
      </Button>
    </>
  );
};
