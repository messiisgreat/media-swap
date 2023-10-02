import Link from "next/link";

export default function CookiePage() {
  return (
    <div>
      <div className="border-2">
        <h2 className="text-center text-xl font-bold">外部送信ポリシー</h2>
        <p className="py-6">
          この外部送信ポリシー (以下「本ポリシー」といいます)
          は、株式会社Swappyのうち、
          <Link
            href={"/privacy-policy/"}
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            プライバシーポリシー
          </Link>
          を採用する会社 が提供する各種サービス (以下「本サービス」といいます)
          をお客様がご利用される際に、お客様の端末から弊社や弊社が許諾した第三者等に送信される情報、当該情報の利用目的や送信先等についてお知らせするものです。本ポリシーにおける各用語の定義は、別途定義されている場合および文脈上別異に解すべき場合を除き、
          <Link
            href={"/tos/"}
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            利用規約
          </Link>
          、その他弊社の定める利用規約および
          <Link
            href={"/privacy-policy/"}
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            プライバシーポリシー
          </Link>
          に規定するとおりとします。
        </p>
        <div className="py-6">
          <h3 className="text-lg font-bold">
            1. お客様の端末から第三者に送信される情報について
          </h3>
          <p>
            お客様が本サービスを利用すると、お客様のご利用端末から、弊社が許諾する第三者等に対して、お客様やご利用端末に関する情報が送信されることがあります。送信される情報や、利用目的、送信を無効化
            (オプトアウト) する方法等については、以下をご参照ください。
          </p>
          <div>
            <h4 className="text-lg font-bold">アクセス解析</h4>
            <p>
              本サイトやアプリご利用者さまのアクセスを解析し、画面毎のアクセス回数や滞在時間、利用環境や地域毎の利用者数、流入経路や検索語句等を分析し、利便性の向上やコンテンツの最適化、広告の効果測定などを行うために以下のサービスにパーソナルデータを送信しています。これらのサービスの詳細については、以下よりご確認ください
            </p>
            <div>
              <h5 className="text-lg font-bold">Google アナリティクス</h5>
              <p>
                Google Analytics
                は、閲覧ページ毎のアクセス回数や滞在時間、利用環境や地域毎の利用者数、流入経路や検索語句等を分析する機能を提供しています。Google
                Analyticsが使用する識別子は無関係のウェブサイト間で特定のユーザーやブラウザを追跡するために使用することはできません。
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold">機能補助</h4>
            <p>
              適切なフォントでの表示、画像などのホスティング、コンテンツ管理やパーソナルデータ管理等の本サイトやアプリを提供するために必要な機能を補助するために、以下のサービスにパーソナルデータを送信しています。これらのサービスの詳細については、以下よりご確認ください。
            </p>
            <div>
              <h5 className="text-lg font-bold">Googleタグマネージャー</h5>
              <p>
                Google Tag Manager
                はウェブサイトやアプリで利用される第三者のサービスのプログラムコードを管理し、閲覧者の操作や閲覧ページ、閲覧環境に合わせた最適な第三者サービスを必要に応じて有効化するための機能を提供しています。
              </p>
            </div>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">
            2. お客様の端末から弊社が取得する情報について
          </h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">(1) 取得する情報の内容</h4>
            <p>
              弊社は、お客様が本サービスおよび業務提携先または第三者のサービスを利用・閲覧した際に、お客様の端末から、お客様やご利用端末に関する情報を取得することがあります。弊社が収集する情報には、次のような情報が含まれます。
            </p>
            <ol className="list-decimal px-4">
              <li>端末機種、OS および広告識別子等のご利用機器に係る情報</li>
              <li>IP アドレス等のネットワーク接続に係る情報</li>
              <li>
                リファラ、閲覧 URL
                および日時に関するタイムスタンプ等ご利用状況に係る情報
              </li>
            </ol>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">(2) 取得する情報の利用目的</h4>
            <p>弊社は、取得した情報を以下の目的で利用します。</p>
            <ol className="list-decimal px-4">
              <li>本サービスを提供するため</li>
              <li>本サービスのご利用状況の分析のため</li>
              <li>
                弊社や第三者の広告や各種情報の配信のため (クロスデバイス (※)
                を含みます)
              </li>
              <li>第三者の提供するサービスに連携するため</li>
              <li>その他プライバシーポリシーに規定する利用目的</li>
            </ol>
            <p>※　クロスデバイス</p>
            <p>
              弊社は、お客様が複数のブラウザや環境で本サービスを利用する場合であっても、お客様に適切と思われる広告を提供するため、お客様及びお客様のデバイスに紐づく種々の識別子
              (Cookie ID、ADID / IDFA、IP アドレス等を含みます)
              をリンクさせる場合があります。これにより、異なるブラウザまたは環境を使っているお客様の一致を確認し、または推測することにより、お客様により適切な広告をお届けすることができます。
            </p>
            <p>
              また、法令の許容するところに従い、提携先である第三者からもクロスデバイスのために情報を受け取る場合があります。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">3. Cookie の利用について</h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">(1) Cookie とは</h4>
            <p>
              本サービスが提供されるウェブサイトでは、弊社グループや弊社グループが許諾した第三者が
              Cookie
              を利用して、お客様の端末から情報を収集しています。「Cookie」とは、お客様がウェブページにアクセスした際に、お客様がご利用のデバイス上に保存され、ウェブサーバとお客様のインターネット閲覧ソフトとの間でやり取りされる、任意の情報が書かれた小さなテキストファイルです。
            </p>
            <p>
              ウェブサーバは、ウェブサイトを訪問したデバイスから Cookie
              に書かれた情報を取得することができます。例えば、ウェブサーバは、Cookie
              の中に書き込んでおいた識別子 (Cookie ID)
              を参照することで、お客様のブラウザを識別することができます。また、お客様が入力した情報や設定を
              Cookie
              に保存しておくことで、お客様の再入力や再設定の手間を省く便利な機能を提供することもできます。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">(2) Cookie の利用停止</h4>
            <p>
              お客様は、Cookie
              の使用を停止し、また、お客様のデバイスに保存されている Cookie
              を削除するようにブラウザの設定を変更することが可能です。ただし、Cookie
              の使用を停止した場合、本サービスを正常に利用できない、または
              Cookie を必要とする広告設定を反映できなくなる可能性があります。
            </p>
          </div>
        </div>
      </div>
      <div className="text-right">2023年10月1日制定</div>
    </div>
  );
}
