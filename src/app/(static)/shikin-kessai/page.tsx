import { CORPORATE_NAME, SITE_NAME } from "@/constants";

/**
 * 資金決済法ページ
 */
export default function ShikinPage() {
  return (
    <div>
      <div className="border-2">
        <h2 className="text-center text-xl font-bold">
          資金決済法に従った有償ポイントの表示
        </h2>
        <table className="min-w-full bg-white">
          <tbody>
            <tr>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                <b>商号</b>
              </td>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                {CORPORATE_NAME}
              </td>
            </tr>
            <tr>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                <strong>事前支払いの決済手段の最大利用額</strong>
              </td>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                制限は設けられていません。ただし、有償ポイントの移転の際、月間で5000
                有償ポイントが上限です。
                利用状況などに応じて、1回、1日、または1ヶ月の利用上限が特別に設定されることがございます。1
                有償ポイント＝ 1 円として計算されます。
              </td>
            </tr>
            <tr>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                <strong>期間の有効性</strong>
              </td>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                受け取った日から1年間
                ただし、移転された有償ポイントの期間は、移転が終了した日（その日を含む）から
                1年間となります。
              </td>
            </tr>
            <tr>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                <b>お問い合わせ先</b>
              </td>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                <p>東京都新宿区新宿７丁目２６−７</p>
                <p>{CORPORATE_NAME} カスタマーサポート</p>
                <p>apapk434@gmail.com</p>
              </td>
            </tr>
            <tr>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                <b>使用場所の範囲</b>
              </td>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                <ul>
                  <li>・ {SITE_NAME}サービス内</li>
                  <li>・ 弊社加盟店</li>
                  <li>・ 弊社が提携するブランド加盟店</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                <strong>利用時の留意点</strong>
              </td>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                通常、有償ポイントの追加後の返金は受け付けておりません。ただし、弊社が有償ポイントのサービスを停止する際には、該当しません。
              </td>
            </tr>
            <tr>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                <b>未使用残高確認方法</b>
              </td>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                {SITE_NAME}サイトからご確認いただけます。
              </td>
            </tr>
            <tr>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                <strong>資金決済法第14条第1項の目的</strong>
              </td>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                前払式支払手段を持つ者の権利を守るため、資金決済法に従い、毎年3月31日と9月30日時点の未使用残高の50%以上に相当する発行保証金を法務局などに供託し、その資産を確保することが要求されています。
              </td>
            </tr>
            <tr>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                <b>資金決済法 31 条 1 項に基づく権利の詳細</b>
              </td>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                何らかの事情で、前払式支払手段の所有者は、資金決済法の第 31
                条の規定に従い、確保されている発行保証金を他の債権者より優先して受け取ることが認められています。
              </td>
            </tr>
            <tr>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                <b>
                  発行保証金の供託、発行保証金保全契約又は発行保証金信託契約の別
                </b>
              </td>
              <td className="border-b border-r border-gray-200 px-3 py-2">
                <p>弊社の利用者資金の保全方法は次のとおりです。</p>
                <ul>
                  <li>・ 金銭による供託</li>
                  <li>・ 発行保証金保全契約</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
