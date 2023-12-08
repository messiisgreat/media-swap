import { type ReactNode } from "react";

import { SITE_NAME } from "@/constants/site";
import { Section } from "@/ui/structure";
import { H } from "@/ui/structure/H";

type Item = {
  title: string;
  content: ReactNode;
};

const guideActions = [
  {
    title: "禁止されている行為",
    content: (
      <>
        <p className="py-4">
          {SITE_NAME}
          は、誰しもが商品を手軽に購入や販売できるフリマプラットフォームです。
          多数のユーザーが心置きなく安全に取引を行えるため、以下の活動を制限しております。
        </p>
        <p className="py-4">
          これらの活動を検知した際には、アカウントの使用制約などの処置を考慮することがございます。
        </p>
      </>
    ),
  },
  {
    title: "取引に関する注意点",
    content: (
      <ul className="list-disc px-4">
        <li>{SITE_NAME}が提供していない支払い手段の使用を推奨すること</li>
        <li>商品情報が不明確な取引</li>
        <li>{SITE_NAME}の指定した取引手順に従わない活動</li>
        <li>資金洗浄と見なされる活動</li>
        <li>
          商品を出品した者やその家族、関連する人物がその商品を購入すること
        </li>
        <li>商品の交換や部分的な交換</li>
      </ul>
    ),
  },
  {
    title: "発送に関する注意",
    content: (
      <ul className="list-disc px-4">
        <li>
          価格に送料が含まれている商品を、送料を除外して(着払い)で送る行為
        </li>
        <li>商品の到着先を郵便局や営業所での保管にする行為</li>
        <li>商品の直接の受け渡しを求める行為</li>
        <li>支払い前に出品者に商品の発送を要求する行為</li>
        <li>受取が困難な場所を商品の到着先として選択する行為</li>
      </ul>
    ),
  },
  {
    title: "出品に関する注意点",
    content: (
      <ul className="list-disc px-4">
        <li>
          法的な許可や報告、ライセンスが必要なアイテムを、それらの確認なしにリスト化すること
        </li>
        <li>商品の具体的な状態を示す写真を載せないこと</li>
        <li>
          保有していないアイテムのリスト化や、他のECサイトからの直接配送を行うこと
        </li>
        <li>実際の販売意図のない出品</li>
        <li>他の人の商品を代わりにリスト化すること</li>
        <li>オークション方式での出品</li>
        <li>購入ボタンをクリックしても商品が最終的に確定しない出品スタイル</li>
        <li>商品に不具合があったとしても返品を受け付けない旨を記述すること</li>
        <li>虚偽の設定、または誤った情報を記載すること</li>
        <li>他会員が撮影した画像、文章などを無断で使用すること</li>
      </ul>
    ),
  },
  {
    title: "その他",
    content: (
      <ul className="list-disc px-4">
        <li>他のサービスへの誘導</li>
        <li>不快と感じる行為</li>
        <li>他者を勧誘する活動</li>
        <li>真実でない情報の掲載</li>
        <li>個人情報を伴うリスト・投稿、またはその不正な使用</li>
        <li>{SITE_NAME}アカウントの不正な活用</li>
        <li>非合法的な行為やそれを助長する行為</li>
        <li>人々の間での差別感を生じさせる行為</li>
        <li>一般的な道徳に違反する行為</li>
        <li>選挙活動に関連する行為</li>
        <li>その他、適さないと見なされる行為</li>
      </ul>
    ),
  },
] as const satisfies readonly Item[];

/**
 * ガイドページ(取引)
 */
export default function GuideActionPage() {
  return (
    <div>
      <div className="border-2">
        <H className="text-center text-xl font-bold">{SITE_NAME}ガイド</H>
        <Section>
          {guideActions.map((guideAction) => (
            <div key={guideAction.title} className="py-6">
              <H className="text-lg font-bold">{guideAction.title}</H>
              {guideAction.content}
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
}
