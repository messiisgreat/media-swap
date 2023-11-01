import { CORPORATE_ADDRESS, CORPORATE_NAME } from "config";

/**
 * 個人データの安全管理に係る基本方針
 */
export default function DataSecurityPage() {
  return (
    <div>
      <div className="border-2">
        <h2 className="text-center text-xl font-bold">
          個人データの安全管理に係る基本方針
        </h2>
        <p className="py-6">
          弊社は、お客様の信頼を最も大切にし、下記の基本方針を基に個人データの厳重な管理を行います。また、個人情報保護法をはじめとする関連する法令や規範を順守し、個人データの安全な管理を約束します。
        </p>
        <div className="py-6">
          <h3 className="text-lg font-bold">1. 個人データの安全管理方法</h3>
          <div className="py-2">
            <p>
              弊社は、個人データの不正アクセスや破壊、改ざん、漏えいを避けるため、利用するコンピュータへのウィルスチェックプログラムを用いて、コンピュータウィルスからの保護を強化し、個人データを適切に保護します。
            </p>
            <p>
              加えて、個人データの安全を維持するための組織体制や内部規定を設け、運営します。情報セキュリティの変動や、個人データ保護に関する法的な要件や基準の更新に応じて、管理体制を定期的に更新し、個人データの安全確保に取り組みます。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">2. 組織・態勢</h3>
          <p>
            弊社では、個人情報取扱いとシステム管理のための責任部署を明確に設け、管理責任を持つ役員を指名することで、個人データの安全を確保しております。
          </p>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">3. 社内規程等の整備と運用</h3>
          <p>
            弊社は、個人データの安全を確保するために、「個人情報保護規程」「情報セキュリティ管理規程」などの規程を策定し、社員に対して個人データの正しい取り扱いに関する教育を行います。
          </p>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">
            4. 個人データの安全管理の問い合わせ・苦情について
          </h3>
          <p>
            弊社は、個人データの安全管理を徹底的に行っております。その取り組みに関するご質問や苦情については、真摯に受け止め、速やかに対応いたします。
          </p>
          <p>{CORPORATE_ADDRESS}</p>
          <p>{CORPORATE_NAME} 個人情報担当者宛</p>
          <p>
            お問い合わせフォーム：
            <a
              href={"https://forms.gle/pFZjV5xMxwxcRDV1A"}
              target="_blank"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              https://forms.gle/pFZjV5xMxwxcRDV1A
            </a>
          </p>
        </div>
      </div>
      <div className="text-right">2023年10月1日制定</div>
    </div>
  );
}
