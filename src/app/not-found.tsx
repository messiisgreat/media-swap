import { TextLink } from "@/components/TextLink";
import { Section, TitleUnderbar } from "@/components/structure";

/**
 * 404ページ
 */
export default function NotFound() {
  return (
    <>
      <TitleUnderbar title="ページが見つかりません" />
      <Section className="grid gap-2">
        <p>お探しのページは見つかりませんでした。</p>
        <p>URLが間違っているか、削除された可能性があります。</p>
        <TextLink href="/">トップページへ</TextLink>
      </Section>
    </>
  );
}
