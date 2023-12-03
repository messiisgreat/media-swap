import { TextLink } from "@/components";
import { Section } from "@/components/structure";
import { H } from "@/components/structure/H";
import { CORPORATE_ADDRESS, CORPORATE_NAME } from "@/constants/site";
import { ReactNode } from "react";

type Item = {
  title: string;
  content: ReactNode;
};

const dataSecurities = [
  {
    title: "1. 個人データの安全管理方法",
    content:
      "弊社は、個人データの不正アクセスや破壊、改ざん、漏えいを避けるため、利用するコンピュータへのウィルスチェックプログラムを用いて、コンピュータウィルスからの保護を強化し、個人データを適切に保護します。\n加えて、個人データの安全を維持するための組織体制や内部規定を設け、運営します。情報セキュリティの変動や、個人データ保護に関する法的な要件や基準の更新に応じて、管理体制を定期的に更新し、個人データの安全確保に取り組みます。",
  },
  {
    title: "2. 組織・態勢",
    content:
      "弊社では、個人情報取扱いとシステム管理のための責任部署を明確に設け、管理責任を持つ役員を指名することで、個人データの安全を確保しております。",
  },
  {
    title: "3. 社内規程等の整備と運用",
    content:
      "弊社は、個人データの安全を確保するために、「個人情報保護規程」「情報セキュリティ管理規程」などの規程を策定し、社員に対して個人データの正しい取り扱いに関する教育を行います。",
  },
  {
    title: "4. 個人データの安全管理の問い合わせ・苦情について",
    content: (
      <>
        <p>
          弊社は、個人データの安全管理を徹底的に行っております。その取り組みに関するご質問や苦情については、真摯に受け止め、速やかに対応いたします。
        </p>
        <p>{CORPORATE_ADDRESS}</p>
        <p>{CORPORATE_NAME} 個人情報担当者宛</p>
        <p>
          <TextLink
            href={"/inquiry"}
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            お問い合わせフォーム
          </TextLink>
        </p>
      </>
    ),
  },
] as const satisfies readonly Item[];

/**
 * 個人データの安全管理に係る基本方針
 */
export default function DataSecurityPage() {
  return (
    <div>
      <div className="border-2">
        <H className="text-center text-xl font-bold">
          個人データの安全管理に係る基本方針
        </H>
        <Section>
          <p className="py-6">
            弊社は、お客様の信頼を最も大切にし、下記の基本方針を基に個人データの厳重な管理を行います。また、個人情報保護法をはじめとする関連する法令や規範を順守し、個人データの安全な管理を約束します。
          </p>
          {dataSecurities.map((dataSecurity) => (
            <div key={dataSecurity.title} className="py-6">
              <H className="text-lg font-bold">{dataSecurity.title}</H>
              <div className="whitespace-pre-wrap py-2">
                {dataSecurity.content}
              </div>
            </div>
          ))}
        </Section>
      </div>
      <div className="text-right">2023年10月1日制定</div>
    </div>
  );
}
