import Link from "next/link";

export default function TokuteiPage() {
  return (
    <div>
      <div className="border-2">
        <h2 className="text-center text-xl font-bold">
          特定商取引に関する表記
        </h2>
        <div className="py-6">
          <h3 className="text-lg font-bold">事業者</h3>
          <div className="py-2">
            <p>株式会社Swappy</p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">代表者</h3>
          <div className="py-2">
            <p>原奏音</p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">ホームページ</h3>
          <div className="py-2">
            <Link
              href={"/"}
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              https://www.swappy.jp/
            </Link>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">メールアドレス</h3>
          <div className="py-2">
            <p>apapk434@gmail.com</p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">所在地</h3>
          <div className="py-2">
            <p>〒160-0022 東京都新宿区新宿７丁目２６−７</p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">電話番号</h3>
          <div className="py-2">
            <p>070-83255472</p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">Swappyについて</h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">役務の内容</h4>
            <p>お客さま間の物品の売買の場・機会を提供します。</p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">
              役務の対価及びその支払い方法・支払時期
            </h4>
            <table className="min-w-full bg-white">
              <tbody>
                <tr>
                  <td className="border-b border-r border-gray-200 px-3 py-2">
                    出品者
                  </td>
                  <td className="border-b border-r border-gray-200 px-3 py-2">
                    <ul>
                      <li>・ 販売手数料として販売価格の10%</li>
                      <li>
                        ・
                        出品した商品が購入され取引が完了した時に、販売価格の10%が販売手数料として販売価格から差し引かれます。
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
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">役務の提供時期</h4>
            <table className="min-w-full bg-white">
              <tbody>
                <tr>
                  <td className="border-b border-r border-gray-200 px-3 py-2">
                    出品者
                  </td>
                  <td className="border-b border-r border-gray-200 px-3 py-2">
                    <ul>
                      <li>
                        ・ 「出品する」ボタンを押したら、即時に出品となります。
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
                      <li>・ 会員登録後、直ちにご利用いただけます。</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">
              上記販売手数料以外に必要な費用
            </h4>
            <ul className="list-disc px-4">
              <li>商品を購入する際、支払い方法により所定の支払手数料</li>
              <li>商品の配送費用</li>
              <li>
                メルカリで販売した商品の売上を引き出す際、所定の振込手数料
              </li>
            </ul>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">Swappy Storeについて</h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">販売価格帯</h4>
            <p>各商品に表記された価格に準じます</p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">商品等の引き渡し時期</h4>
            <ul className="list-disc px-4">
              <li>下記以外：購入手続きから2日~7日でのお届け</li>
              <li>九州・沖縄・北海道：購入手続きから3日~10日でのお届け</li>
              <li>一部離島：購入手続きから5日〜12日でのお届け</li>
            </ul>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">代金の支払方法</h4>
            <p>
              クレジットカード払い、コンビニ払い、郵便局/銀行ATM払い、残高（売上金含む）使用
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">代金の支払時期</h4>
            <ul className="list-disc px-4">
              <li>
                クレジットカード払い（※）、残高（売上金含む）使用、ポイント使用、※引き落とし日は、クレジットカード会社とお客さまとの契約内容によります。
              </li>
              <li>
                コンビニ払い、郵便局/銀行ATM払いの場合は購入手続き後、翌々日23時59分まで
              </li>
            </ul>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">商品代金以外に必要な費用</h4>
            <ul className="list-disc px-4">
              <li>商品により配送費用</li>
              <li>支払い方法により所定の手数料</li>
            </ul>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">返品・交換について</h4>
            <ul className="list-disc px-4">
              <li>お客さま都合による返品・交換は受け付けておりません。</li>
              <li>
                到着した商品に不良・不足があった場合は、商品名や状況を明記のうえ、Webにログイン後「マイページ＞お問い合わせ」からご連絡ください。
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
