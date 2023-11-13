"use client";

import { Button } from "@/components/Button";
import { TextLink } from "@/components/TextLink";
import { Section } from "@/components/structure";
import { TitleUnderbar } from "@/components/structure/TitleUnderbar";
import { useEffect } from "react";

/**
 * 何らかのエラーが発生した場合に表示するコンポーネント
 * @todo URLを先を作成する
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      // sendMail(error); // エラー内容を何らかの手段で送信し、分析に使う
    }
  }, [error]);

  return (
    <>
      <TitleUnderbar title="エラーが発生しました" />
      <Section className="grid gap-2">
        <p>サーバー側でエラーが発生しました。</p>
        <p>お手数ですが、時間をおいて再度お試しください。</p>
        <Button onClick={reset}>再読み込み</Button>
        <p>解決しない場合は、お問い合わせください。</p>
        <TextLink href="inquiry">お問い合わせ</TextLink>
      </Section>
    </>
  );
}
