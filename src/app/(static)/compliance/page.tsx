import { CORPORATE_NAME } from "@/constants/site";
import { Section } from "@/ui/structure";
import { H } from "@/ui/structure/H";

type Item = {
  title: string;
  content: string;
};

const compliances = [
  {
    title: "第１条 （会社の使命）",
    content: `${CORPORATE_NAME}（以下「弊社」と呼びます。）の基本方針として「すべての人に可能性を」と掲げ、弊社が行う事業を通じ、新しい価値を持続的に社会に届けることを目的としております。`,
  },
  {
    title: "第２条 （社会的責任）",
    content:
      "弊社は、社会の構成員としての自覚をもち社会の要請にこたえ、倫理にもとることのなく責任のある行動をとるように心がけます。",
  },
  {
    title: "第３条 （法令遵守）",
    content:
      "弊社は、社会の一部としての認識をもち、社会からの期待に応えるため、倫理的に問題のない責任感のある態度で行動することを志向します。",
  },
  {
    title: "第４条 （公正な取引）",
    content:
      "弊社は、契約の厳正な遵守のもと、公平かつ公正な取引を継続的に実施いたします。",
  },
  {
    title: "第５条 （個人情報の保護）",
    content:
      "弊社は、個人情報を適切かつ法的に取り扱い、その情報の漏洩・毀損・滅失を厳重に防ぐ努力をします。",
  },
  {
    title: "第６条 （情報開示）",
    content:
      "弊社は、帳簿や会計記録を正確に作成し、会社情報を適切に管理します。さらに、情報の開示を迅速かつ適切に行うことを重視します。",
  },
  {
    title: "第７条 （社員の尊重）",
    content:
      "弊社は、各社員の主体性や創造力を重視し、これを基に企業活動の質を向上させる風土を築いています。職場の安全性や従業者の健康を保護することを忘れず、全員の人権を重んじ、健全で差別のない職場を実現します。",
  },
  {
    title: "第８条 （反社会的勢力の排除）",
    content:
      "弊社は、暴力団やその他の反社会的勢力との接触や取引を絶対に行いません。もし反社会的勢力から接触があった場合、弊社は断固としてそれを拒否する立場を取ります。",
  },
  {
    title: "第９条 （贈答・接待の受領）",
    content:
      "弊社は、社会的に許容される範囲を超える贈答・接待の受け入れは行いません。",
  },
] as const satisfies readonly Item[];

/**
 * コンプライアンスポリシー
 */
export default function CompliancePage() {
  return (
    <div>
      <div className="border-2">
        <H className="text-center text-xl font-bold">
          コンプライアンスポリシー
        </H>
        <Section>
          {compliances.map((compliance) => (
            <div key={compliance.title} className="py-6">
              <H className="text-lg font-bold">{compliance.title}</H>
              <div className="py-2">
                <p>{compliance.content}</p>
              </div>
            </div>
          ))}
        </Section>
      </div>
      <div className="text-right">2023年10月1日制定</div>
    </div>
  );
}
