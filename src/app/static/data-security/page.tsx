export default function DataSecurityPage() {
  return (
    <div>
      <div className="border-2">
        <h2 className="text-center text-xl font-bold">
          個人データの安全管理に係る基本方針
        </h2>
        <p className="py-6">
          弊社は、お客様からの信頼を第一と考え、以下の基本方針に沿って個人データを厳格に管理し、個人情報保護法等の関係法令や規範を遵守するとともに、個人データの安全管理に努めることを宣言します。
        </p>
        <div className="py-6">
          <h3 className="text-lg font-bold">1. 個人データの安全管理方法</h3>
          <div className="py-2">
            <p>
              弊社は、個人データへの不当なアクセス、およびその破壊、改ざん、漏洩を防止するため、使用するコンピュータに対してはウィルスチェックプログラムによるコンピュータウィルス対策を徹底する等、個人データの厳重な安全管理対策を実施します。
            </p>
            <p>
              また、個人データの安全管理に関する組織・態勢や社内規程等を整備・運用するとともに、情報セキュリティに関する環境の変化や個人データの安全管理に関する法令・規範の改正に合わせて継続的に管理態勢を見直し、個人データの安全管理に努めます。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">2. 組織・態勢</h3>
          <p>
            弊社は、個人情報の取扱いに関する責任部署およびシステム管理の責任部署を設置するとともにそれぞれの役員を管理責任者として任命し、個人データの安全管理を実施します。
          </p>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">3. 社内規程等の整備と運用</h3>
          <p>
            弊社は、個人データの安全管理を実行するため、「個人情報保護規程」「情報セキュリティ管理規程」等の関連規程類を定めるとともに、個人データの適正な管理方法等に関する社員教育を徹底いたします。
          </p>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">
            4. 個人データの安全管理に関する質問および苦情窓口
          </h3>
          <p>
            弊社は、個人データの安全管理に万全を期しますが、弊社の個人データの安全管理に関してご質問や苦情のお申出をいただいた際には、誠実に対応させていただきます。
          </p>
          <p>〒160-0022 東京都新宿区新宿７丁目２６−７</p>
          <p>株式会社Swappy 個人情報担当者宛</p>
          <p>
            お問い合わせフォーム：{" "}
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
