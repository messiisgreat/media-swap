"use client";

import { useCallback, useEffect } from "react";

import { Button, TextLink } from "@/ui";
import { Section, TitleUnderbar } from "@/ui/structure";

/**
 * 何らかのエラーが発生した場合に表示するコンポーネント
 * @todo URLを先を作成する
 */
const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      // sendMail(error); // エラー内容を何らかの手段で送信し、分析に使う
    }
  }, [error]);

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <>
      <TitleUnderbar title="エラーが発生しました" />
      <Section className="grid gap-2">
        <p>サーバー側でエラーが発生しました。</p>
        <p>お手数ですが、時間をおいて再度お試しください。</p>
        <Button onClick={handleReset}>再読み込み</Button>
        <p>解決しない場合は、お問い合わせください。</p>
        <TextLink href="inquiry">お問い合わせ</TextLink>
      </Section>
    </>
  );
};

export default Error;
