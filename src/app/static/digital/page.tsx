import { SITE_NAME } from "config";

/**
 * 電磁交付規約ページ
 */
export default function DigitalPage() {
  return (
    <div>
      <div className="border-2">
        <h2 className="text-center text-xl font-bold">電磁交付規約</h2>
        <p className="py-6">
          本規約は、我々が提供するサービスを利用しているユーザーに向け、貸金業法に基づく書面の電磁的な交付を可能とするサービス（以下、本サービスと称します。）の利用条件を明記したものです。なお、本文中での用語の定義は、特段の注釈がない場合、利用規約での解釈に従います。
        </p>
        <div className="py-6">
          <h3 className="text-lg font-bold">
            第 1 条 書面の電磁的交付について
          </h3>
          <div className="py-2">
            <p>
              弊社が貸金業法に従いユーザーへ提供する契約締結前書面（貸金業法第
              16 条の 2 第 1
              項で示される書面）、契約締結時書面、受取証書（貸金業法第 18 条第 1
              項で示される書面）ならびにその他の法律に基づき弊社が交付を義務付けられる書面（以下、「法定書面」と総称します。）は、次条で述べる電磁的手段を用いての交付に、ユーザーが合意するものとします。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">
            第 2 条 電磁的手段を用いた書面の提示方法
          </h3>
          <div className="py-2">
            <p>
              書面を電磁的手段で提供する方法として、{SITE_NAME}アプリの画面でユーザーが確認できる形で表示します。ユーザーは、表示された画面をスマートフォンやPCへ保存するため、スクリーンショットなどを取ってください。その際の保存形式は、jpgまたはpngを推奨します。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">第 3 条 通信費用等</h3>
          <div className="py-2">
            <p>
              前条で規定される閲覧やインストールの際の通信費用等は、ユーザーが負担するものとします。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">第 4 条 電磁的方法の変更</h3>
          <div className="py-2">
            <p>
              弊社は、電磁的方法による書面の提供について、利用者への影響が非常に小さいと考えられる場合、{SITE_NAME}アプリでの告知や弊社のウェブサイトへの情報掲載などを通じて内容をお知らせします。このような場合、第2条に記載された電磁的方法の変更を、ユーザーの追加の同意なしに行うことが可能となります。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">第 5 条 郵送による交付</h3>
          <div className="py-2">
            <p>
              この規約の他の条文とは別に、ユーザーが郵送での法定書面の提供を望む場合は、弊社の指定する手順で要求してください。ただし、郵送の要求をすると、弊社が設定した手数料が必要になります。さらに、将来、ユーザーが第1条での同意を取り消すことを選ぶと、本サービスの利用に一部制約が生じる可能性があります。
            </p>
          </div>
        </div>
      </div>
      <div className="text-right">2023年10月1日制定</div>
    </div>
  );
}
