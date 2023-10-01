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
        <h3 className="text-lg font-bold">
          1. お客様の端末から第三者に送信される情報について
        </h3>
        <p>
          お客様が本サービスを利用すると、お客様のご利用端末から、弊社グループが許諾する第三者等に対して、お客様やご利用端末に関する情報が送信されることがあります。送信される情報や、利用目的、送信を無効化
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
            <p>Google Tag Manager はウェブサイトやアプリで利用される第三者のサービスのプログラムコードを管理し、閲覧者の操作や閲覧ページ、閲覧環境に合わせた最適な第三者サービスを必要に応じて有効化するための機能を提供しています。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
