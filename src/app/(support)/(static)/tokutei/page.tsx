import { type ReactNode } from "react";

import Link from "next/link";

import {
  CORPORATE_ADDRESS,
  CORPORATE_DELEGATE,
  CORPORATE_MAIL,
  CORPORATE_NAME,
  CORPORATE_TEL,
  SITE_NAME,
  SITE_URL,
} from "@/constants/site";
import { Section } from "@/ui/structure";
import { H } from "@/ui/structure/H";

type Item = {
  title: string;
  content: ReactNode;
};

const companies = [
  {
    title: "事業者",
    content: CORPORATE_NAME,
  },
  {
    title: "代表者",
    content: CORPORATE_DELEGATE,
  },
  {
    title: "ホームページ",
    content: (
      <Link
        href="/"
        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
      >
        {SITE_URL}
      </Link>
    ),
  },
  {
    title: "メールアドレス",
    content: CORPORATE_MAIL,
  },
  {
    title: "所在地",
    content: CORPORATE_ADDRESS,
  },
  {
    title: "電話番号",
    content: CORPORATE_TEL,
  },
] as const satisfies readonly Item[];

const aboutSwappyList = [
  {
    title: "役務の内容",
    content: <p>お客さま間の商品の取引の場所・機会を提供します。</p>,
  },
  {
    title: "役務の対価及びその支払い手段・期間",
    content: (
      <table className="min-w-full bg-white">
        <tbody>
          <tr>
            <td className="border-b border-r border-gray-200 px-3 py-2">
              出品者
            </td>
            <td className="border-b border-r border-gray-200 px-3 py-2">
              <ul>
                <li>・ 販売からの手数料は販売価格の10%</li>
                <li>
                  ・ 商品が売れた際に、販売価格の10%を手数料として引かれる。
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td className="border-b border-r border-gray-200 px-3 py-2">
              購入者
            </td>
            <td className="border-b border-r border-gray-200 px-3 py-2">
              <ul>
                <li>・ 料金はかかりません。</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    title: "役務の提供時期",
    content: (
      <table className="min-w-full bg-white">
        <tbody>
          <tr>
            <td className="border-b border-r border-gray-200 px-3 py-2">
              出品者
            </td>
            <td className="border-b border-r border-gray-200 px-3 py-2">
              <ul>
                <li>・ 「出品する」ボタンを押したら、即時に出品となります。</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td className="border-b border-r border-gray-200 px-3 py-2">
              購入者
            </td>
            <td className="border-b border-r border-gray-200 px-3 py-2">
              <ul>
                <li>・ 会員として登録すると、すぐにサービスを利用できます。</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    title: "上記販売手数料以外に必要な費用",
    content: (
      <ul className="list-disc px-4">
        <li>商品を購入する際、支払い方法により所定の支払手数料</li>
        <li>商品の配送費用</li>
        <li>Swappyで販売した商品の売上を引き出す際、所定の振込手数料</li>
      </ul>
    ),
  },
] as const satisfies readonly Item[];

const aboutSwappyStoreList = [
  {
    title: "販売価格帯",
    content: <p>各商品に表記された価格に準じます</p>,
  },
  {
    title: "商品等の引き渡し時期",
    content: (
      <ul className="list-disc px-4">
        <li>下記以外：購入手続きから2日~7日でのお届け</li>
        <li>九州・沖縄・北海道：購入手続きから3日~10日でのお届け</li>
        <li>一部離島：購入手続きから5日〜12日でのお届け</li>
      </ul>
    ),
  },
  {
    title: "代金の支払方法",
    content: (
      <p>
        クレジットカード払い、コンビニ払い、郵便局/銀行ATM払い、残高（売上金含む）使用
      </p>
    ),
  },
  {
    title: "代金の支払時期",
    content: (
      <ul className="list-disc px-4">
        <li>
          クレジットカード払い（※）、残高（売上金含む）使用、ポイント使用、※引き落とし日は、クレジットカード会社とお客さまとの契約内容によります。
        </li>
        <li>
          コンビニ払い、郵便局/銀行ATM払いの場合は購入手続き後、翌々日23時59分まで
        </li>
      </ul>
    ),
  },
  {
    title: "商品代金以外に必要な費用",
    content: (
      <ul className="list-disc px-4">
        <li>商品により配送費用</li>
        <li>支払い方法により所定の手数料</li>
      </ul>
    ),
  },
  {
    title: "返品・交換について",
    content: (
      <ul className="list-disc px-4">
        <li>お客さま都合による返品・交換は受け付けておりません。</li>
        <li>
          到着した商品に不良・不足があった場合は、商品名や状況を明記のうえ、Webにログイン後「マイページ＞お問い合わせ」からご連絡ください。
        </li>
      </ul>
    ),
  },
] as const satisfies readonly Item[];

/**
 * 特定商取引に関する表記ページ
 */
export default function TokuteiPage() {
  return (
    <div>
      <div className="border-2">
        <H className="text-center text-xl font-bold">特定商取引に関する表記</H>
        <Section>
          {companies.map((company) => (
            <div key={company.title} className="py-6">
              <H className="text-lg font-bold">{company.title}</H>
              <div className="py-2">{company.content}</div>
            </div>
          ))}
          <div className="py-6">
            <H className="text-lg font-bold">{SITE_NAME}について</H>
            <Section>
              {aboutSwappyList.map((aboutSwappyItem) => (
                <div key={aboutSwappyItem.title} className="py-2">
                  <H className="text-lg font-bold">{aboutSwappyItem.title}</H>
                  {aboutSwappyItem.content}
                </div>
              ))}
            </Section>
          </div>
          <div className="py-6">
            <H className="text-lg font-bold">Swappy Storeについて</H>
            <Section>
              {aboutSwappyStoreList.map((aboutSwappyStoreItem) => (
                <div key={aboutSwappyStoreItem.title} className="py-2">
                  <H className="text-lg font-bold">
                    {aboutSwappyStoreItem.title}
                  </H>
                  {aboutSwappyStoreItem.content}
                </div>
              ))}
              <div className="py-2">
                本名・住所・電話番号については求めに応じて遅延なく提供します。
              </div>
            </Section>
          </div>
        </Section>
      </div>
    </div>
  );
}
