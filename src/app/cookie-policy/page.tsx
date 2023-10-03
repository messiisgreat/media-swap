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
          を適用する事業体
          により提供される様々なサービス（以下、「本サービス」と称します）
          をご活用の際、ユーザーの端末より弊社または弊社が許可した第三者へ転送されるデータや、その目的、転送先等に関する内容を示しています。本ガイドラインでの用語の解釈は、特に明記されているケースや文の流れから異なる意味が取れる場合を除き、
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
            1. お客様端末からの第三者への情報転送に関する説明
          </h3>
          <p>
            お客様が本サービスを使用した際、お客様の端末から、弊社が認可した第三者に向けて、関連する情報が転送される可能性がございます。詳細な情報や、その目的、そして転送を停止（オプトアウト）する手段などは、以下の部分で明示しております。
          </p>
          <div>
            <h4 className="text-lg font-bold">アクセス情報の解析</h4>
            <p>
              本サービスにおけるユーザーアクセスを詳しく調査し、各ページの訪問頻度や滞在期間、使用条件やユーザーの居住地域、訪問源や検索されたキーワード等の情報を把握して、サービスの使いやすさの向上、コンテンツの調整、広告効果の確認等の目的で、以下のサービスへのデータ転送を行っております。詳しい内容は、下記をご覧ください。
            </p>
            <div>
              <h5 className="text-lg font-bold">Google アナリティクス</h5>
              <p>
                Google Analytics
                には、各ページの訪問回数や滞在期間、利用条件や地域別のユーザー数、アクセス源や検索フレーズ等の解析ツールが含まれています。また、Google
                Analyticsの識別子を、他のサイトをまたいで個別のユーザーやブラウザを追尾する目的で利用することは許されていません。
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold">機能補助</h4>
            <p>
              正確なフォント表示や画像のホスティング、コンテンツの取り扱いや個人情報の管理など、このサイトやアプリケーションを提供するために要求される機能をサポートする目的で、下記のサービスに個人データを転送しています。それらのサービスの詳細は、以下でご覧いただけます。
            </p>
            <div>
              <h5 className="text-lg font-bold">Googleタグマネージャー</h5>
              <p>
                Google Tag Manager
                はウェブサイトやアプリケーションで使われる第三者提供のサービスのコードを統制し、ユーザーのアクションや表示ページ、利用環境に応じて、適切な第三者のサービスを必要に応じて起動する機能を持っています。
              </p>
            </div>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">
            2. お客様のデバイスから私たちが受け取る情報の詳細
          </h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">(1) 取得する情報の内容</h4>
            <p>
              私たちが提供するサービスや、パートナーや第三者が提供するサービスの使用・アクセス時に、お客様のデバイスより、関連する情報を収集する場合がございます。私たちが取得するデータには、以下の内容が該当します。
            </p>
            <ol className="list-decimal px-4">
              <li>
                デバイスのタイプ、オペレーティングシステム、及び広告識別情報などのデバイス関連情報
              </li>
              <li>IPアドレスやその他のネットワーク関連情報</li>
              <li>
                参照元、訪問したURL、そしてアクセス時刻などの利用履歴に関する情報
              </li>
            </ol>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">(2) 取得する情報の利用目的</h4>
            <p>弊社は、取得した情報を以下の目的で利用します。</p>
            <ol className="list-decimal px-4">
              <li>本サービスの提供のため</li>
              <li>本サービスの使用状況の調査のため</li>
              <li>
                弊社あるいは第三者の広告や情報の送信のため（クロスデバイス(※)を含む）
              </li>
              <li>他の第三者サービスとの連動のため</li>
              <li>その他、プライバシーポリシーで定める目的</li>
            </ol>
            <p>※　クロスデバイス</p>
            <p>
              弊社は、ユーザーが多様なブラウザや端末で本サービスを使用する際、ユーザーに最適な広告を表示する目的で、ユーザーやそのデバイス関連の識別情報
              (Cookie ID、ADID / IDFA、IP アドレスなど)
              の関連付けを行うことがあります。このプロセスにより、違うブラウザや端末を使用するユーザーの同一性を検証または予測し、最適な広告を提供できます。
            </p>
            <p>
              さらに、法的に許される範囲で、提携先の第三者からクロスデバイス関連の情報を取得することもあります。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">3. Cookie の利用について</h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">(1) Cookie とは</h4>
            <p>
              本サービスのウェブページは、弊社グループまたは弊社グループが認可した第三者によってCookieを活用し、お客様の端末情報を取得しております。ここでいう「Cookie」とは、お客様がウェブサイトを閲覧するとき、その使用デバイスに保存されるとともに、ウェブサーバとブラウザ間で交換される、特定の情報を持つ小さなテキストデータのことを指します。
            </p>
            <p>
              このウェブサーバは、訪れたデバイスの Cookie
              からの情報を読み取る能力があります。たとえば、ウェブサーバは、Cookie
              内に保存された識別情報（Cookie
              ID）をチェックし、お客様のブラウジングツールを特定できます。さらに、お客様が以前に入力した内容や選んだ設定を
              Cookie
              に保持することにより、次回からの入力や設定の手間を減らし、より便利にサービスを享受できるようにすることも可能です。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">(2) Cookie の利用停止</h4>
            <p>
              お客様は、ブラウザの設定を通じて Cookie
              の活用を制限し、さらに、お客様のデバイス上にある Cookie
              を除去することができます。しかしながら、Cookie
              の活用を制限すると、本サービスの正常な動作が妨げられる、あるいは
              Cookie が必要な広告の設定が適用されないリスクが生じます。
            </p>
          </div>
        </div>
      </div>
      <div className="text-right">2023年10月1日制定</div>
    </div>
  );
}
