import { CORPORATE_NAME } from "const";
import Link from "next/link";

/**
 * プライバシーポリシー
 */
export default function PrivacyPage() {
  return (
    <div>
      <div className="border-2">
        <h2 className="text-center text-xl font-bold">プライバシーポリシー</h2>
        <p className="py-6">
          {CORPORATE_NAME}
          は、以下の「プライバシーポリシー」を基準に、お客様並びにお取引のパートナーの皆様（以下、「お客様」と称します）の個人情報を管理いたします。
          当社は、「プライバシーポリシー」に加え、特定のサービス領域（例、「金融サービス」）に関しては、特定のプライバシーポリシー（以下「サービス別プライバシーポリシー」と称します）を設けることがあります。該当する場合、「プライバシーポリシー」とサービス別プライバシーポリシーを併せて施行し、もし相違が生じた場合は、サービス別プライバシーポリシーが優先されます。
          <br />
          お客様各位におかれましては、弊社が提供する各種サービス（以下まとめて「本サービス」と称します）をご利用いただく際に、以下の「プライバシーポリシー」をよくお読みいただきますようお願い申し上げます。
        </p>
        <h3 className="text-lg font-bold">1. 取得する情報</h3>
        <div className="py-6">
          <p>
            弊社は「4.取得情報の利用目的」に記載されている目的を達成するため、以下の情報を取り集めます（以下、(1)、(2)、(3)を合わせて「取得情報」と呼びます）。
            <br />
          </p>
          <ul>
            <li>(1) 弊社がお客様から取得する情報</li>
            <li>
              「個人情報」とは、個人情報保護法（平成15年法律第57号としても知られています。以下、「個人情報保護法」と称します）の第2条第1項に記載されている情報を指しますが、特定の下記の情報は、弊社においては、個人情報とみなされます。
            </li>
            <li>
              a.
              名前、出生年月日、性別、職業、および個人を特定できるその他の情報
            </li>
            <li>
              b.
              特定の個人を識別できる情報、例えば、ご住所、電話番号、アカウントデータ（メールアドレスやパスワード含む）、ニックネームなど
            </li>
            <li>c. クレジットカード情報</li>
            <li>d. 趣味、家族構成、年齢等の個人に紐づく属性情報</li>
            <li>e. お客様の本人確認に関する情報</li>
            <li>
              f.
              お客様が本サービスに登録し、利用する際に、私たちに提供された加盟店や出店者等の情報
            </li>
            <li>
              (2) 弊社が本サービスの利用に関連して取得する情報 <br />
              以下の情報は、それが個人情報であるかどうかに関わらず、本サービスの利用と関連して取得されます。
            </li>
            <li>
              a.
              お客様が当サービスを利用された際のサービス内容、利用日時及び頻度、また当サービスを利用している最中のお客様のオンライン活動など、お客様の当サービスの利用やアクセスに伴う情報（これには、Cookie情報、アクセスログなどの利用履歴に関わる情報、利用している端末の情報、OSの情報、位置データ、およびIPアドレス、ブラウザの種類、ブラウザの言語など、お客様の通信に関わる情報も含まれます）
            </li>
            <li>
              b.
              お客様が本サービスで公開・送信した投稿、写真、動画、コメント、取引のメッセージ、評価などの情報
            </li>
            <li>c. お客様の本サービスでの決済状況に関する情報</li>
            <li>
              (3) 弊社が業務提携先および第三者から間接的に収集する情報
              <br />
              弊社は、パブリックDMP業者、アフィリエイトサービスプロバイダー、データ分析業者、不正アクセス検知サービスプロバイダー、広告業者、およびその他のサービスプロバイダー等から、お客様に関する識別情報（Cookie、ADID/IDFA、IPアドレス等を含む）、電話番号、メールアドレス、ブラウジング履歴、位置データ等の行動データ、趣味や好み等の情報といった個人または個人に関連する情報を収集することがあります。これらの情報は、既存のお客様の個人データと結びつけて、マッチング・解析される場合があります。
            </li>
          </ul>
        </div>
        <h3 className="text-lg font-bold">2. 取得情報の収集方法</h3>
        <div className="py-6">
          <p>
            弊社は、本サービスをご利用になるお客様の情報を、以下の方法等により収集します。
          </p>
          <ul>
            <li>(1) 本サービス上でお客様自身に直接ご入力いただく方法</li>
            <li>
              (2)
              お客様から弊社に対し、電子メール、郵便、書面、電話等でご提供いただく方法（弊社は、お客様との電話応対時、応対品質向上等のため通話を録音します）
            </li>
            <li>(3) お客様による本サービスの利用・閲覧の際に収集する方法</li>
            <li>
              (4) 業務提携先および第三者から間接的に収集する方法 <br />
              これには、以下の方法によるものを含みますがこれらに限られるものではありません。
            </li>
            <li>
              a.
              パブリックDMP運営者や、アフィリエイトサービス提供者、その他各種のサービス提供者などの三者が、お客様の情報をどのように収集するか
            </li>
            <li>
              (5)
              お客様のご了承を得た上で、第三者のサービスに表示されているコンテンツの情報を機械的に収集する手段
            </li>
          </ul>
        </div>
        <h3 className="text-lg font-bold">3. 取得情報の管理</h3>
        <div className="py-6">
          弊社では、収集した情報の管理・利用を行う担当者が、お客様の情報を丁寧に管理し、不正アクセス、紛失、漏えい、改ざんなどが発生しないよう万全を尽くします。また、情報取扱いにおいて最大限の注意を払い、該当業務を遂行します。
        </div>
        <h3 className="text-lg font-bold">4. 取得情報の利用目的</h3>
        <div className="py-6">
          <p>
            弊社は、収集した情報を、お客様に通知した利用目的や利用規約に記載されている利用目的、または以下で述べる目的で利用いたします。
          </p>
          <ul>
            <li>(1) 本サービスの各項目についての通知および情報の提供の目的</li>
            <li>(2) サービスを適切に届ける目的</li>
            <li>
              (3) ユーザーが本サービスに登録する際の情報入力を効率化する目的
            </li>
            <li>(4) 顧客の申し込みに基づくサービス間の情報共有の目的</li>
            <li>(5) 電子メールの配信サービス申し込みの確認及び配信の目的</li>
            <li>(6) 本サービスにおける購入の確認及び配達の目的</li>
            <li>(7) サービスに関する請求、支払い、及びその確認の目的</li>
            <li>(8) 協力いただいたアンケートなどに対する謝礼の送付の目的</li>
            <li>(9) 応募いただいたコンテストなどに対する賞品の送付の目的</li>
            <li>(10) サービスの使用状況の調査および分析の目的</li>
            <li>(11) サービス内容の向上や新しいサービスの開発の目的</li>
            <li>
              (12)
              顧客から得られた行動履歴などの情報を分析し、本サービスの信用判断及び信用管理の目的
            </li>
            <li>(13) サービス内容を顧客のニーズに合わせて最適化する目的</li>
            <li>(14) サービスに対する顧客満足度の調査の目的</li>
            <li>(15) 取得した情報を統計処理し、集約した結果を公開する目的</li>
            <li>(16) 新サービスや本サービスに関する研究開発の目的</li>
            <li>
              (17)
              本サービスや新サービス、その他各種サービスのプロモーションや通知の送付の目的
            </li>
            <li>
              (18)
              アンケート協力の依頼や各種イベントの参加依頼、またはその結果の報告の目的
            </li>
            <li>
              (19) 当社または第三者の広告を顧客に合わせて配信または表示する目的
            </li>
            <li>
              (20)
              当社または第三者が提供するサービスで商品情報を配信または表示する目的
            </li>
            <li>(21) サービス運営上の問題解決の目的</li>
            <li>
              (22) サービスに関する不正利用の防止およびセキュリティの確保の目的
            </li>
          </ul>
        </div>
        <h3 className="text-lg font-bold">5. 取得情報の第三者への提供</h3>
        <div className="py-6">
          <p>弊社は、以下に定める場合、取得情報を第三者に提供します。</p>

          <ul>
            <li>
              (1)
              本サービスを提供するために弊社が必要と判断した、本サービス上での情報の提供の場合
              お客様は、提供された他のお客様の情報を、本サービスの利用規約に従った本サービスの利用に必要な範囲でのみ利用するものとし、それぞれのお客様の事前の同意なく、他のお客様の情報を第三者に提供してはなりません。また、取得情報は、本サービス上で弊社が定める期間、公開されます。
            </li>
            <li>
              (2) 弊社がサービスの運営および提供において必要と判断した場合
            </li>
            <li>
              (3)
              商品の配送、代金決済、お客様からのお問い合わせへの対応、弊社からお客様へのお問い合わせ、関連するアフターサービスの提供等のために、配送業者、決済代行業者、業務委託先その他の第三者に提供する場合
            </li>
            <li>
              (4)
              法令等に基づき、裁判所、行政機関、監督官庁その他公的機関から取得情報を提供するよう求められた場合
            </li>
            <li>
              (5)
              第三者との紛争解決のため、または本サービスのユーザーもしくは第三者の権利や利益等を守るために情報提供が必要と弊社が判断した場合
            </li>
            <li>
              (6)
              本サービスの利用状況等を調査・分析するため、弊社がかかる調査・分析等を委託する第三者に提供する場合
            </li>
            <li>
              (7) 弊社や第三者の広告の配信または表示のため、第三者に提供する場合
            </li>
            <li>
              (8)
              弊社や第三者の提供するサービス内に商品の情報を配信または表示するため、第三者に提供する場合
            </li>
            <li>(9) 学術研究の目的のため、学術研究機関に提供する場合</li>
            <li>
              (10)
              クレジットカード発行会社が行う不正利用検知および不正利用防止のため、お客さまの出品や購買の履歴、本サービスをご利用するにあたってご登録いただいた情報、本サービスのご利用の状況等を、お客さまがご利用されているカード発行会社に提供する場合
            </li>
          </ul>

          <p>
            また、
            弊社が情報提供が必要だと判断した場合は、お客様の承諾を確認した上で、収集した情報を提供することができます。
          </p>
        </div>
        <h3 className="text-lg font-bold">
          6. 取得情報の取扱いに関する第三者への委託
        </h3>
        <div className="py-6">
          弊社は、「4.
          情報利用の目的」を達成するために必要な限り、収集した情報の全てまたは一部を業務委託先に委ねることができます。その際、私たちが定めた委託先の選定基準を満たしているかどうかを慎重に評価し、情報が適切に管理されるよう契約時に保証します。
        </div>
        <h3 className="text-lg font-bold">
          7. 外国にある第三者への取得情報の提供
        </h3>
        <div className="py-6">
          弊社は、集めた情報を海外の第三者に渡すことがあり得ます。該当する海外の国々は、日本と同等のプライバシー保護法を持っていない可能性があります。しかしながら、法律で認められているケースを除き、私たちの企業は、日本のプライバシー保護法に準じた基準を満たす者にのみ情報を提供します。また、この基準が継続的に満たされるように、必要な手段を施しています。私たちの企業は、これら必要な手段について、お客様の要望があれば情報を提供する方針ですので、ご希望の方は、「17.
          お問い合わせ」に記載されている窓口にご連絡ください。
        </div>
        <h3 className="text-lg font-bold">8. 「Cookie」等の利用</h3>
        <div className="py-6">
          <p>
            Cookieの利用許可は、お客様の設定によります。ほとんどのWebブラウザは、初期設定でCookieを許可していますが、ブラウザの設定を変更して、Cookieの利用を制限することもできます。
          </p>
          <ul>
            <li>
              (1)
              Cookieの利用を制限すると、本サービスの機能が正常に作動しない、またはCookieが必要な広告設定が適用できなくなることが考えられます。
            </li>
            <li>
              (2)
              弊社は、お客様のCookieデータ、閲覧した広告やページ、使用環境などの情報をブラウザから自動で取得し、これをサーバーに保存します。これにより、お客様がサービスにログインする際のメールアドレスの自動入力など、利便性の向上を図ります。また、セッションの保持とセキュリティの確保、新しいサービスの開発、並びにサービスや広告をお客様により適切に提供するためにこれらの情報を利用させていただきます。
            </li>
            <li>
              (3) Cookie等の利用に関する詳細については
              <Link
                href={"/static/cookie-policy/"}
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                外部送信ポリシー
              </Link>
              をご覧ください。
            </li>
          </ul>
        </div>
        <h3 className="text-lg font-bold">9. Google アナリティクスについて</h3>
        <div className="py-6">
          <p>
            弊社は、本サービスの使用状況を把握・解析する目的で、Googleが提供するGoogleアナリティクスを導入しております。Googleアナリティクスの使用条件やGoogleのプライバシーポリシーの詳細は、それぞれの公式サイトをご参照ください。
          </p>
          <p>Google アナリティクス 利用規約：</p>
          <a
            href="https://www.google.com/analytics/terms/jp.html"
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            https://www.google.com/analytics/terms/jp.html
          </a>
          <p>Google プライバシーポリシー：</p>
          <a
            href="http://www.google.com/intl/ja/policies/privacy/"
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            http://www.google.com/intl/ja/policies/privacy/
          </a>
          <p>
            Google
            アナリティクスは、Cookieなどを通じてユーザーの活動を収集しています。Google
            アナリティクスによるデータの収集を避けたい場合、Googleが提供するオプトアウトアドオンを使用してください。
          </p>
          <p>Google アナリティクス オプトアウト アドオン：</p>
          <a
            href="https://tools.google.com/dlpage/gaoptout?hl=ja"
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            https://tools.google.com/dlpage/gaoptout?hl=ja
          </a>
        </div>
        <h3 className="text-lg font-bold">
          10. 「ログ」および「機器情報」の使用等
        </h3>
        <div className="py-6">
          <ul>
            <li>
              (1) ログ
              <br />
              弊社は、お客様が当サービスにアクセスする際に、IPアドレス、使用ブラウザの種別、ブラウザの言語などを自動的に取得します。
              <br />
              このようなデータは、ユーザーの利用状況を理解し、サービスの質を向上させるため、また不正な利用を防ぐ目的で活用されます。収集した検索情報は、個人を識別できない形で保管・管理し、統計情報の作成などに用いられます。
            </li>
            <li>
              (2) 機器情報
              <br />
              弊社は、デバイスの固有識別データなどの情報を取得することがあります。
              <br />
              これらのデータはサービスの品質向上及び不正な行為を防ぐ目的で使用されます。
            </li>
          </ul>
        </div>
        <h3 className="text-lg font-bold">11. 弊社による個人情報の訂正</h3>
        <div className="py-6">
          市町村などの名称、郵便番号、金融機関名やクレジットカードの期限といった、商品配送や請求に関連する重要な情報が変わった際、弊社は登録済みの情報を更新することが考えられます。
        </div>
        <h3 className="text-lg font-bold">
          12. 個人情報の管理およびセキュリティ
        </h3>
        <div className="py-6">
          弊社は、提供された情報を一般ユーザーからアクセス不可能なサーバに安全に保存し、不正なアクセスや情報の損失・破壊・改ざん、漏洩のリスクを最小化するための措置を講じています。
        </div>
        <h3 className="text-lg font-bold">13. 未成年のお客様</h3>
        <div className="py-6">
          未成年のお客様は本サービスを利用することができません。
        </div>
        <h3 className="text-lg font-bold">
          14. 「プライバシーポリシー」の改善および更新
        </h3>
        <div className="py-6">
          <p>弊社は「プライバシーポリシー」に関し、適宜改善に取り組みます。</p>

          <ul>
            <li>
              (1)
              法律の変更やビジネス上の要請を受けて、プライバシーポリシーを変更する場合がございます。その際は、お客様へのお知らせを行います。
            </li>
            <li>
              (2)
              お客様には、本サービスを利用する前に、常に更新されたプライバシーポリシーをご参照いただくようお願い申し上げます。
            </li>
          </ul>
        </div>
        <h3 className="text-lg font-bold">
          15. 個人情報の開示・訂正・利用停止等の手続
        </h3>
        <div className="py-6">
          <p>
            お客様はいつでも自分の登録情報を、当サービスを通じて確認・修正できます。
          </p>
          <p>
            お客様は弊社に対し、本サービス上で確認できない個人情報または第三者提供記録の開示を求める場合、弊社が別途定めた手続に従って、次の場合を除き開示を請求することができます。
          </p>
          <ul>
            <li>
              (1)
              公開により、個人や他者の生命、身体、財産等の利益が損なわれる可能性がある場合
            </li>
            <li>
              (2)
              公開することで当社の業務進行に大きな障害が生じる可能性がある場合
            </li>
            <li>(3) 公開が法的規定に反する場合</li>
            <li>
              (4) 公開を求める者が本人であることが確定しない場合
              <br />
              万が一、ユーザーが当社が保持する個人データが正確ではないと判断する場合、指定された方法で、その情報の修正や追加、削除を要請できます。そうした場合、当社は目的を達成するために必要な限りで、迅速に検討し、必要に応じて情報の修正・追加・削除を実施します。
              <br />
              また、ユーザーは、指定された方法で、個人データの使用の中止、削除または第三者への提供の中止を要求できます。要求に基づき、当社が不適切な取り扱いがあったと認識した場合や、ユーザーの要求に妥当性が認められると判断した時、ユーザーの権益を守るために、該当する情報の利用や提供を停止します。しかし、要求の方法に欠点があるか、要求の内容に妥当な理由が認められない場合、他の法的理由により、ユーザーの要求に応じられないことがあります。
              当サービス内で確認しにくい個人データや第三者への提供記録の公開を要求する際、我々の指定する手続きに従い、手数料が発生する場合がございます。
            </li>
          </ul>
        </div>
        <h3 className="text-lg font-bold">16. お問い合わせ</h3>
        <div className="py-6">
          <p>
            「プライバシーポリシー」に関するお問い合わせは、弊社の下記担当までお願いします。
          </p>
          <p>〒160-0022 東京都新宿区新宿７丁目２６−７</p>
          <p>{CORPORATE_NAME} 個人情報担当者宛</p>
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
      <div className="border-2">
        <h2 className="text-center text-xl font-bold">
          金融サービス プライバシーポリシー
        </h2>
        <div className="py-6">
          <p>
            弊社は、弊社が提供する前払式支払手段の発行の業務及び資金移動業等の決済サービスその他金融関連事業（以下「本件金融サービス」といいます）におけるお客様の情報について以下のとおり取り扱います。
            なお、本ポリシーは、弊社が別途定める「プライバシーポリシー」（以下「共通ポリシー」といいます）と併せて適用されるものとし、両者に矛盾がある場合は、本ポリシーが優先するものとします。
          </p>

          <h3 className="text-lg font-bold">1. 用語の定義</h3>
          <div className="py-6">
            本ポリシーに使用する用語は、本ポリシーにて個別に定義する他は、共通ポリシーにおいて定める意味を有するものとします。
          </div>
          <h3 className="text-lg font-bold">2. 取得する情報</h3>
          <div className="py-6">
            <p>
              本ポリシーに記載された「1.
              取得する情報」に従わない場合でも、弊社は本金融サービスに関して以下のように個人情報を含むデータを収集します（以下、(1)および(2)を「取得情報」として述べます）。
            </p>
            <ul>
              <li>1. 弊社がお客様から取得する情報</li>
              <li>
                a. 氏名、誕生日、性別、仕事などの特定の個人を識別できる内容
              </li>
              <li>
                b.
                住所、連絡先、アカウント詳細（メールアドレスやパスワードなど）、ユーザーネームなど、特定の個人情報にリンクされる情報
              </li>
              <li>c. クレジットカード情報</li>
              <li>d. 銀行口座に関する情報</li>
              <li>e. 趣味や家族の構成、年齢等、個人情報と連結された属性情報</li>
              <li>
                f.
                本人確認の際に受け取った免許や住民票などの公式文書、取引の目的
              </li>
              <li>
                g.
                その他本件金融サービスの提供等に付随してお客様から弊社に提供される一切の情報
              </li>
              <li>2. 弊社が本件金融サービスの利用に関連して取得する情報</li>
              <li>
                h.
                利用された本金融サービスの内容、使用日時及び回数、オンラインの行動等、本金融サービスの利用や閲覧に関わる情報（これには、Cookie情報、アクセスのログや使用状況、利用端末やOSの情報、位置データ、及びIPアドレスやブラウザのデータ、言語設定などの通信関連情報が含まれます）
              </li>
              <li>
                i.
                ポイントの取得、購入、使用、出金、残高など、ポイント関連の情報
              </li>
              <li>j. 代金支払いの使用や支払い状態についてのデータ</li>
              <li>
                k.
                前二号（jおよびk）に掲げるもののほか、サービス、またはポイント加盟店における取引および決済に関する情報（購入商品や購入店舗（出品者を含む）等の情報を含みます）
              </li>
              <li>l. 本金融サービスの使用状態に関わるその他の情報</li>
            </ul>
          </div>
          <h3 className="text-lg font-bold">3. 取得情報の利用目的</h3>
          <div className="py-6">
            <p>
              弊社は、取得した上記 2. 記載の取得情報を、共通ポリシーにおける「4.
              取得情報の利用目的」にかかわらず、以下の目的で利用します。
            </p>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="border-b border-r border-gray-200 bg-gray-50 px-3 py-2 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                    利用目的
                  </th>
                  <th className="border-b border-r border-gray-200 bg-gray-50 px-3 py-2 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                    利用する上記2.の情報
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-r border-gray-200 px-3 py-2">
                    <ul>
                      <li>(1) サービスの提供に関する目的</li>
                      <li>
                        ・
                        お客様の情報を取り扱い、サービスのアカウントを設定するため
                      </li>
                      <li>
                        ・
                        お客様が本サービスを通じて商品やサービスを購入する際の手続きのため
                      </li>
                      <li>
                        ・ 商品の購入や有料サービスの使用時の請求対応のため
                      </li>
                      <li>
                        ・
                        お客様の活動履歴を分析して、信用評価や信用管理を実施するため
                      </li>
                      <li>
                        ・
                        本サービスの内容をお客様のニーズに合わせて調整するため
                      </li>
                      <li>
                        ・
                        その他お客様が本サービスを円滑に利用できるようにするため
                      </li>
                    </ul>
                  </td>
                  <td className="border-b border-r border-gray-200 px-3 py-2">
                    a~m
                  </td>
                </tr>
                <tr>
                  <td className="border-b border-r border-gray-200 px-3 py-2">
                    <ul>
                      <li>(2) 広告、マーケティング</li>
                      <li>
                        ・
                        本サービスについての情報や弊社の広告内容、または弊社が広告を依頼された第三者事業者からのターゲティング広告の提供や表示を目的とする
                      </li>
                      <li>
                        ・
                        弊社または弊社以外の事業者に関するアンケートの実施のため
                      </li>
                      <li>・ その他広告およびマーケティングを行うため</li>
                    </ul>
                  </td>
                  <td className="border-b border-r border-gray-200 px-3 py-2">
                    a,b,e,g,h,i,j~m
                  </td>
                </tr>
                <tr>
                  <td className="border-b border-r border-gray-200 px-3 py-2">
                    <ul>
                      <li>(3) サービス品質の向上と研究開発のため</li>
                      <li>
                        ・
                        本サービスの使用パターンの調査、利用に関する統計情報の生成のため
                      </li>
                      <li>・ 本サービスの品質向上の目的で</li>
                      <li>
                        ・ 将来の本サービスの新しい企画を考案し実施するため
                      </li>
                      <li>・ 他のサービス品質向上や研究の取り組みのため</li>
                    </ul>
                  </td>
                  <td className="border-b border-r border-gray-200 px-3 py-2">
                    a,e,g,h,i,j~m
                  </td>
                </tr>
                <tr>
                  <td className="border-b border-r border-gray-200 px-3 py-2">
                    <ul>
                      <li>(4) 安全性確保</li>
                      <li>・ 違法な使用を避けるため</li>
                      <li>・ 顧客情報の取り扱いとデータの保護のため</li>
                      <li>・ 安全を維持するためのその他の措置を取るため</li>
                    </ul>
                  </td>
                  <td className="border-b border-r border-gray-200 px-3 py-2">
                    a~m
                  </td>
                </tr>
                <tr>
                  <td className="border-b border-r border-gray-200 px-3 py-2">
                    <ul>
                      <li>(5) お客様へのご連絡、お問い合わせ対応等</li>
                      <li>・ 本サービスの資料を配布する目的</li>
                      <li>・ キャンペーンなどの抽選や景品の送付目的</li>
                      <li>・ 新しいサービスやお知らせを通知する目的</li>
                      <li>・ メールニュースの提供や情報共有の目的</li>
                      <li>
                        ・
                        お客様が本サービスを使用する際や問い合わせの際の身元確認目的
                      </li>
                      <li>
                        ・
                        お客様からの質問への回答やカスタマーサポートを行う目的
                      </li>
                      <li>
                        ・ 本サービスに係る重要な通知や、適宜な連絡をする目的
                      </li>
                    </ul>
                  </td>
                  <td className="border-b border-r border-gray-200 px-3 py-2">
                    a~d,f~h,i~m
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-bold">4. 取得情報の第三者への提供</h3>
          <div className="py-6">
            <p>
              弊社は、共通ポリシーにおける「5.
              取得情報の第三者への提供」にかかわらず、以下に定める場合、取得情報を第三者に提供します。
            </p>
            <ul>
              <li>
                (1)
                本サービス提供の際、弊社が情報提供を要としたケースにおいて、お客様は他のユーザーの情報を、サービス利用規約に基づく範囲内で利用し、無許可で第三者への提供は避けます。取得した情報は弊社により指定される期間内で公開される。
              </li>
              <li>
                (2) 弊社がサービス運営及び実施に情報提供を必要としたとき。
              </li>
              <li>
                (3)
                商品配達、決済、お客様とのコミュニケーションやアフターケア等の目的で、配送業者や決済業者などの第三者へ情報を伝達する場面。
              </li>
              <li>
                (4)
                法的義務に基づき、公的機関や裁判所等から情報提供が求められた場合。
              </li>
              <li>
                (5)
                第三者との紛争解消、もしくはユーザーや他の第三者の権益を保護するために、弊社が情報の提供が必要だと考えた場面。
              </li>
              <li>
                (6)
                サービスの利用パターンを分析する目的で、その業務を第三者に委ね、情報を提供する場合。
              </li>
              <li>
                (7)
                弊社または第三者の広告を配信・表示させる目的で情報を第三者へ伝達する場面。
              </li>
              <li>
                (8)
                お客様が第三者が管理する外部サービスにアクセスするための情報を、同意を基に当該第三者へ提供する場面。
              </li>
              <li>
                (9)
                資金確保や債権の流動化を目的として、お客様の債権に関連する情報を金融関連機関に提供するケース。
              </li>
              <li>
                (10)
                その他、情報提供が要とされる場面でお客様の許可を取得したケース。
              </li>
            </ul>
          </div>
          <h3 className="text-lg font-bold">
            5. 取得情報の取扱いに関する第三者への委託
          </h3>
          <div className="py-6">
            弊社は、「3.
            取得情報の利用目的」の達成に必要な範囲内において、取得情報の取扱いの全部または一部を業務委託先に委託することがあります。その際、弊社が定める本件金融サービスにおける委託先選定基準を満たす者であるかを十分審査し、契約にあたっては取得情報が適正に管理されるよう確保します。
          </div>
        </div>
      </div>
      <div className="text-right">2023年10月1日制定</div>
    </div>
  );
}
