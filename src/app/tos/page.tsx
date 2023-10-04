import Link from "next/link";

export default function TOSPage() {
  return (
    <div>
      <div className="border-2">
        <h2 className="text-center text-xl font-bold">Swappy利用規約</h2>
        <p className="py-6">
          この規約（以下「本利用規約」といいます。）は、株式会社Swappy（以下「弊社」といいます。）が運営するインターネットサービス「Swappy」において、弊社が提供する各種サービス（以下「本サービス」といいます。）の利用の諸条件を定めるものです。
        </p>
        <div className="py-6">
          <h3 className="text-lg font-bold">
            第 1 条 本サービスの内容及び弊社の役割
          </h3>
          <ol className="list-decimal px-4">
            <li>
              本サービスは、オンラインフリーマーケットサービスです。ユーザー（次条で定義します。）間の物品の売買の場・機会を提供するもので、ユーザー間の売買契約、出品、購入等の保証等に関しては、すべて当事者であるユーザーの自己責任とし、弊社は自ら売買を行うものではなく、売買の委託を受けるものでもありません。弊社は、本規約中に別段の定めがある場合を除き、売買契約の取消し、解約、解除、返品、返金、保証など取引の遂行には一切関与しません。また、本サービスは、競りの方法（オークション）により物品の売買を行おうとする者のあっせんを行うものではありません。
            </li>
            <li>
              本サービスの内容は、本利用規約及びガイドに規定する通りとします。
            </li>
          </ol>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">第 2 条 定義</h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">1. 定義</h4>
            <p>
              本利用規約において、以下の用語は、別途定義されている場合及び文脈上別異に解すべき場合を除き、以下の意味を有するものとします。
            </p>
            <ul>
              <li>
                (1) 「外国 PEPs 等」とは、
                <Link
                  href="/peps/"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  外国PEPs（外国の政府等において重要な地位を占める方）とは
                </Link>
                に掲げる者をいいます。
              </li>
              <li>
                (2)
                「ガイド」とは、ガイドラインその他の本サービスに関して弊社が定めるルールをいいます。
              </li>
              <li>
                (3)「購入者」とは、本サービスにて商品を購入するユーザーをいいます。
              </li>
              <li>
                (4)「個人情報」とは、個人情報の保護に関する法律（平成 15
                年法律第 57
                号。その後の改正を含みます。）に定める「個人情報」を指すものとし、ユーザーが入力した氏名、郵便番号、住所、生年月日、性別、職業、電話番号、アカウント情報（電子メールアドレス、パスワード等をいいます。）、プロフィール情報（ニックネーム、趣味、家族構成、年齢その他の個人に関する属性情報をいいます。）、クレジットカード情報、利用履歴等で、かつ特定の個人を識別できる情報（他の情報と容易に照合することができ、それにより特定の個人を識別することとなるものを含みます。）をいいます。
              </li>
              <li>
                (5)「コンテンツ」とは、弊社又はユーザーが本サービスに掲載・発信した情報をいいます。
              </li>
              <li>
                (6)「出品」とは、ユーザーが、本サービスにて、商品の取引に必要なコンテンツを掲載・発信し、他のユーザーが閲覧可能かつユーザーが商品を取引できる状態にすることをいいます。
              </li>
              <li>
                (7)「出品者」とは、本サービスを通じて商品を出品するユーザーをいいます。
              </li>
              <li>
                (8)「商品代金」とは、本サービスにおいて商品が購入された場合の、出品者と購入者との間の売買契約における当該商品の売買価格をいいます（なお、商品代金は原則として販売価格と一致しますが、第
                16 条第 3
                項に定める場合等には、商品代金は、当該定めの内容に従うものとします。これらの場合、商品代金と販売価格とが異なることがあります）。
              </li>
              <li>
                (9)「販売価格」とは、出品者が本サービスにおいて商品を出品する際に設定する商品の価格をいいます。
              </li>
              <li>
                (10)
                「プライバシーポリシー」とは、弊社が定めるプライバシーポリシー（名称の如何を問わないものとします。）をいいます。
              </li>
              <li>
                (11)
                「本規約」とは、本利用規約及びガイドをいい、これらはすべて本規約を構成するものとします。
              </li>
              <li>
                (12)
                「ユーザー」とは、本規約の内容に同意して、日本国内において本サービスを利用する日本在住の個人及び弊社が指定した法人を指します。
              </li>
              <li>
                (13)
                「利用料」とは、本サービスの利用に関連して、弊社がユーザーから徴収する料金（販売手数料、決済手数料その他名称の如何を問わないものとします。）をいいます。
              </li>
            </ul>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">2. 適用</h4>
            <p>
              本条の定義は、別途定義されている場合及び文脈上別異に解すべき場合を除き、本利用規約のほか、プライバシーポリシー及びガイドにおいても、適用されるものとします。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">
            第 3 条 本規約への同意及び本規約の変更
          </h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">1. 本規約への同意及び適用</h4>
            <p>
              本規約は、本サービスの利用に関する条件をユーザーと弊社との間で定めることを目的とし、ユーザーと弊社の間の本サービスの利用に関わる一切の関係に適用されます。ユーザーは、本規約に同意をしたうえで、本規約の定めに従って本サービスを利用するものとし、ユーザーは、本サービスを利用することにより本規約に同意をしたものとみなされます。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">2. 未成年者の場合</h4>
            <p>ユーザーが未成年者である場合は、本サービスを利用できません。</p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">3. 本規約の変更</h4>
            <p>
              弊社は、必要に応じ、弊社が運営するウェブサイト又はアプリケーション内の適宜の場所への掲示をすることにより、本規約の内容を随時変更できるものとします。本規約の変更後に、ユーザーが本サービスを利用した場合には、ユーザーは、本規約の変更に同意をしたものとみなされます。なお、本規約の変更に同意しないユーザーは、本サービスの利用を停止してください。弊社は、本規約の改定又は変更によりユーザーに生じたすべての損害について、弊社の故意又は過失に起因する場合を除き、責任を負いません。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">
            第 4 条 ユーザー登録及びアカウント情報
          </h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">1. 登録</h4>
            <p>
              ユーザー登録は、必ず本人が行ってください。また、ユーザー登録の際は、必ず正確な情報を入力してください。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">2. 複数登録の禁止</h4>
            <p>
              個人のユーザー及びユーザー登録をされようとする方（以下併せて「ユーザー等」といいます）は、複数のユーザー登録を行うことができないものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">3. 登録拒否</h4>
            <p>
              弊社は、ユーザー登録をされようとする方が以下各号のいずれかに該当する場合、ユーザー登録の申請を承認しないことがあります。
            </p>
            <ol className="list-decimal px-4">
              <li>
                第 3 条第 2 項及び本条第 2 項のユーザー資格を満たしていない場合
              </li>
              <li>
                過去に本規約違反等により、弊社から利用停止等の処分を受けている場合
              </li>
              <li>
                登録内容に正確ではない情報又は虚偽の情報が含まれている場合
              </li>
              <li>
                弊社の運営、サービス提供若しくは他のユーザーの利用を妨害する又はそれらに支障をきたす行為を行った場合やそのおそれがあると弊社が合理的な理由に基づき判断した場合
              </li>
              <li>
                暴力団、暴力団員、暴力団員でなくなったときから 5
                年を経過しない者、暴力団準構成員、暴力団関係企業、総会屋等、社会運動等標ぼうゴロ若しくは特殊知能暴力集団、その他これらに準ずる者（以下これらを「暴力団員等」といいます。）、テロリスト等日本政府若しくは外国政府が経済制裁の対象として指定する者に該当すること、又は暴力団員等と一定の関係を有すること（暴力団員等に対して資金を提供し若しくは便宜を供与するなどの関与をしていると認められること、暴力団員等を不当に利用していると認められること、又は、ユーザー登録をされようとする方が法人の場合、暴力団員等がその経営を支配し若しくはその法人の経営に実質的に関与していると認められること、その他暴力団員等と社会的に非難されるべき関係を有していると認められること）（以下、上記のすべてを総称して「反社会的勢力」といいます。）が判明した場合
              </li>
              <li>
                外国 PEPs
                等に該当する又はそのおそれがあると弊社が合理的な理由に基づき判断する場合
              </li>
              <li>
                その他弊社が不適当であると合理的な理由に基づき判断する場合
              </li>
            </ol>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">4. ユーザー等の確約</h4>
            <p>
              ユーザー等は、反社会的勢力のいずれにも該当しないこと、かつ将来にわたっても該当しないこと、及び、自ら又は第三者を利用して、暴力的な要求行為、法的な責任を超えた不当な要求行為、取引に関して脅迫的な言動をし又は暴力を用いる行為、風説を流布し、偽計を用い又は威力を用いて弊社の信用を毀損し又は弊社の業務を妨害する行為、その他これらに準ずる行為を行わないことを確約するものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">5. 登録内容の変更</h4>
            <p>
              ユーザーは、登録内容に変更がある場合は、直ちに変更しなければならず、常にユーザー自身の正確な情報が登録されているように登録内容を管理及び修正する責任を負います。登録内容に変更があったにも関わらず、変更を行っていない場合、弊社は、登録内容に変更がないものとして取り扱うことができます。変更の届出があった場合でも、変更登録前に行われた取引や各種手続は、変更前の情報に依拠する場合があります。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">6. アカウント情報の管理</h4>
            <p>
              ユーザーは、入力したメールアドレス、パスワード等の情報（以下「アカウント情報」といいます。）を自ら管理する責任を負います。ユーザーは、アカウント情報を第三者に利用させることや、譲渡、売買、質入、貸与、賃貸その他形態を問わず処分することはできません。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">7. アカウント情報の不正利用等</h4>
            <p>
              アカウント情報の管理不十分による情報の漏洩、使用上の過誤、第三者の使用、不正アクセス等による損害の責任はユーザーが負うものとし、弊社の故意又は過失に起因する場合を除き、弊社は責任を負わないものとします。また、アカウント情報が不正に利用されたことにより弊社に損害が生じた場合、ユーザーは当該損害を賠償するものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">8. アカウント情報の漏えい</h4>
            <p>
              ユーザーは、アカウント情報が第三者に漏えいした場合又はそのおそれがある場合、速やかに弊社まで連絡するものとします。また、その際に弊社の指示がある場合にはこれに従うものとします。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">第 5 条 ユーザー登録の取消等</h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">
              1. ユーザー登録の取消・利用停止等
            </h4>
            <p>
              弊社は、ユーザーが以下の各号のいずれかに該当した場合又は該当したと弊社が合理的な理由に基づき判断した場合、事前の通知なしに、ユーザー登録の取消、本サービスの全部若しくは一部へのアクセスの拒否、利用停止等、又は、ユーザーに関連するコンテンツや情報の全部若しくは一部の削除の措置をとることができるものとし、弊社は、その理由を説明する義務を負わないものとします。なお、弊社は、ユーザーが以下の各号のいずれにも該当しないことを確認するために、弊社が必要と判断する本人確認を行うことができ、かかる本人確認が完了するまで本サービスの全部又は一部へのアクセスの拒否、利用停止等の措置をとることができます。
            </p>
            <ol className="list-decimal px-4">
              <li>法令又は本規約に違反した場合</li>
              <li>不正行為があった場合</li>
              <li>登録した情報が虚偽の情報であると弊社が判断した場合</li>
              <li>本規約上必要となる手続又は弊社への連絡を行わなかった場合</li>
              <li>登録した情報が既存の登録と重複している場合</li>
              <li>
                登録した携帯電話番号又はメールアドレスが不通になったことが判明した場合
              </li>
              <li>
                ユーザーが債務超過、無資力、支払停止又は支払不能の状態に陥った場合
              </li>
              <li>他のユーザーや第三者に不当に迷惑をかけた場合</li>
              <li>
                ユーザーが登録した金融機関の口座に関し違法、不適切その他の問題があることが当該金融機関による指摘等により判明した場合
              </li>
              <li>第 4 条第 3 項各号のいずれかに該当する場合</li>
              <li>
                ユーザーが自ら又は第三者をして、暴力的な要求行為、法的な責任を超えた不当な要求行為、脅迫的な言動若しくは暴力を用いる行為、又は風評を流布し、偽計を用い若しくは威力を用いて、信用を毀損若しくは業務を妨害する行為をした場合
              </li>
              <li>その他弊社がユーザーに相応しくないと判断した場合</li>
            </ol>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">2. サービスの利用禁止等</h4>
            <p>
              弊社は、本条の措置を受けたユーザーに対し、将来にわたって弊社が提供するサービスの利用及びアクセスを禁止することができるものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">3. 弊社の免責</h4>
            <p>
              弊社は、本条の措置により生じる損害について、弊社の故意又は過失に起因する場合を除き、責任を負わないものとします。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">第 6 条 ユーザーの退会</h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">1. 退会の手続</h4>
            <p>
              ユーザーは、弊社に退会を希望する旨を申し出ることができ、弊社の判断により認められた場合には退会することができます。但し、取引の決済や商品の郵送等の取引の手続が未完のものがある場合は退会することができず、ユーザーは、一連の未完の取引を本規約に従って遅滞なく円滑に進め、完了させた後、弊社に退会の申し出を行わなければなりません。ユーザーが退会を希望する時点で売上金、残高又はポイントを保有している場合は、利用規約に従って当該売上金、残高及びポイントを全て出金又は利用した上で退会してください。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">2. 弊社の免責</h4>
            <p>
              弊社は、本条の措置により生じる損害について、弊社の故意又は過失に起因する場合を除き、責任を負わないものとします。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">第 7 条 個人情報等の取扱い</h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">1. プライバシーポリシー</h4>
            <p>
              弊社は、本規約のほか、プライバシーポリシーに従って個人情報等を取り扱います。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">
              2. プライバシーポリシーへの同意
            </h4>
            <p>
              ユーザーは、本サービスの利用又は本サービスの閲覧の前に、本サービス上で、プライバシーポリシーを必ず確認し、その内容に同意した上で、本サービスを利用するものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">3. ユーザーによる利用</h4>
            <p>
              ユーザーは、本サービスを通じて得た個人情報等に関し、本サービスの利用の範囲内においてのみ利用することができ、それ以外の利用はできないものとします。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">第 8 条 禁止事項</h3>
          <p>
            弊社は、本サービスに接したユーザー及び第三者の、
            <Link
              href={"/guide/action/"}
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              ガイドの禁止されている行為
            </Link>
            に該当すると弊社が合理的な理由に基づき判断する行為（以下「禁止事項」といいます。）を禁止します。
          </p>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">第 9 条 商品の出品</h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">1. 出品手続等</h4>
            <p>
              出品者は、弊社所定の手続に従い商品の出品を行うものとします。出品者は、出品に先立ち、弊社との間で加盟店契約を締結する必要があります。出品者は、本規約に加え、弊社が定める「加盟店規約（出品者用）」（以下「加盟店規約」といいます。）の定めに従って本サービスを利用するものとします。
              弊社は、ガイド記載の特定の出品方法について基準を設け、審査を行い、出品者が基準に合致しない場合には、当該出品方法の利用を制限することができます。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">2. 出品禁止商品</h4>
            <p>
              出品者は
              <Link
                href={"/guide/product/"}
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                ガイドの禁止されている出品物
              </Link>
              （以下「出品禁止物」といいます。）に記載された商品の出品ができないことについて、予め了承します。出品禁止物に該当する商品を出品した場合は、出品者の故意又は過失に関わらず、本規約違反行為とみなします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">3. 商品説明等</h4>
            <p>
              ユーザーは、商品を出品する際に、真に売却する意思のない出品、その商品情報だけでは正しく商品を理解できない又は混乱する可能性のある出品、商品説明で十分な説明を行わない出品等を行ってはなりません。また、出品者は、出品する商品と関係のない画像等を当該出品情報として掲載してはいけません。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">4. 法令遵守</h4>
            <p>
              ユーザーは、出品にあたっては、古物営業法、特定商取引に関する法律、不当景品類及び不当表示防止法、不正競争防止法、商標法、著作権法その他の法令を遵守しなければなりません。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">
              5. 特定ユーザーへの販売を意図した出品
            </h4>
            <p>
              ユーザーは、他の特定のユーザーのみを対象とする販売を意図して商品を出品することができません。弊社は、その裁量により、出品の条件その他の状況から、ある商品の出品が他の特定のユーザーのみを対象とする販売を意図するものであるか否かを判断することができるものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">6. 出品に関する本規約違反</h4>
            <p>
              出品に関して、弊社が本規約又は加盟店規約に違反する又は不適切であると合理的な理由に基づき判断した場合、弊社は、第
              5
              条に定める措置のほか、その出品やその出品に対して発生していた購入行為等を弊社の判断で取消すことができるものとします。本項に基づく措置によってユーザーに生じる損害について、弊社の故意又は過失に起因する場合を除き、弊社は責任を負わないものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">7. 弊社の免責</h4>
            <p>
              ユーザーの出品等によって、ユーザー及び第三者に生じる損害につき、弊社の故意又は過失に起因する場合を除き、弊社は責任を負わないものとします。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">第 10 条 商品の購入</h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">1. 購入手続</h4>
            <p>
              ユーザーは、弊社の定める手続により購入の意思をもって、注文を行うものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">2. 購入意思等</h4>
            <p>
              ユーザーは、購入する意思のない注文等、弊社の判断でいたずら目的と見受けられる注文を行うことはできません。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">3. 必要データ</h4>
            <p>
              弊社が定める取引開始可能な時間内に、弊社の管理するサーバーに商品代金に関するデータ、販売意思のアクションデータなどの弊社所定のデータの到達が確認できなかった場合、注文は無効になるものとし、ユーザーは予めこれを承諾するものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">4. 自らの出品物の購入禁止等</h4>
            <p>
              出品者は、自らの出品物を購入することはできません。出品を取り下げたい場合は、ユーザーは、弊社所定の手続に従って行うものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">5. 弊社の免責</h4>
            <p>
              ユーザーの注文、購入等によって、ユーザー及び第三者に生じる損害につき、弊社の故意又は過失に起因する場合を除き、弊社は責任を負わないものとします。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">第 11 条 支払及び取引の実行</h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">1. 売買契約の成立</h4>
            <p>
              購入者が出品された特定の商品の購入完了手続をした時をもって当該商品の売買契約が成立するものとします。出品者及び購入者は、売買契約に基づき発生した権利義務を第三者に譲渡、担保提供その他の処分することはできないものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">2. 支払期限及び送料</h4>
            <p>
              売買契約が成立した場合、購入者は、弊社の定める方法により商品代金と利用料の合計額を支払うものとします。商品の送料は、出品者が負担する場合には、商品代金に含むものとし、購入者が負担する場合には、商品の発送を着払いで行うものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">3. 発送</h4>
            <p>
              出品者は、購入者の商品代金の決済が完了した後に商品の発送をするものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">4. 商品等に関するトラブル</h4>
            <p>
              出品者及び購入者の間で商品等に関してトラブルが発生した場合は当該ユーザー間で解決するものとします。但し、弊社の判断により、弊社も協議に入ることができるものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">5. キャンセル及び商品の瑕疵</h4>
            <p>
              本サービスの利用にあたり、出品者及び購入者間の合意がある場合を除き、商品の注文後のキャンセルはできないものとします。
              商品に瑕疵がある場合、商品説明と実際の商品が明らかに異なる場合、梱包の不備により配送時に商品が破損したなどの場合は出品者が責任を負うものとし、出品者の責任及び費用により、返金、商品の返品、修理、交換等の対応を行うものとします。但し、第
              12 条第 3
              項に定める取引完了前の場合において、出品者及び購入者が弊社所定の方法により、弊社に対し、取引のキャンセル及び商品の返品が完了した旨を連絡した場合において、弊社がこれを認めた場合は、所定の方法により返金に係る金銭を出品者から受領し、これを購入者に返還します。購入者は、弊社に対し、出品者が購入者に対して支払う当該金銭の代理受領権限を付与するものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">6. 支払手続</h4>
            <ul>
              <li>
                (1)
                支払又は決済が本サービスに関して必要となる場合、本サービスのオンラインシステムを通じて行われるものとし、その詳細は本サービス中のガイドで定められるところに従うものとします。なお、本サービス利用に関し、弊社は、ユーザーに対して商品の売主又は役務の提供者となるわけではないため、ユーザーによって支払われた代金及び利用された残高又はポイントについての領収書等をユーザーに対して発行するものではありません。また、支払いに必要な費用についてのユーザーの負担は、本サービス中のガイドで定められるところに従うものとします。
              </li>
              <li>
                (2)
                弊社が契約する決済代行会社は、規約等に従い、出品者に対して立替払いを行い、商品代金の決済を行うことがあります（以下、かかる決済を「立替払決済」といいます。）。この場合、購入者は、購入手続きが完了した日の属する月の翌月末日（以下「支払期日」といいます。）までにガイドに定められた方法で商品代金及び利用料（以下「支払債務」といいます。）を決済会社に対して支払うものとします。
              </li>
            </ul>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">7. 不払・支払遅延等</h4>
            <ul>
              <li>
                (1)
                ユーザーが本規約に従って必要な支払いを行わない場合若しくは遅延した場合又は本サービスに入力したクレジットカード若しくは金融機関の口座の利用が停止された場合には、決済会社は、弊社を介して、当該ユーザーに通知することなく、当該ユーザーによる本サービスの利用を停止することができるほか、第
                5 条に定める措置をとることができるものとします。
              </li>
              <li>
                (2) 立替払決済を利用した購入者が、前項第 2
                号に規定する支払期日までに決済会社に対する支払債務を弁済することができなかった場合、決済会社は当該ユーザーに対する立替払決済の提供を停止することができるものとします。
              </li>
              <li>
                (3)
                未払いの支払債務が存在している場合、決済会社は、未払いの支払債務の回収を第三者に委託することができるものとします。
              </li>
              <li>
                (4)
                支払期日までに購入者が支払債務を支払わなかった場合、Swappy社は、当該購入者に対し、年率
                14.6％の遅延損害金を請求することができるものとします。
              </li>
            </ul>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">8. 弊社の免責</h4>
            <p>
              ユーザーが本サービスに入力した決済手段又は金融機関の情報が第三者に利用されたこと若しくは入力情報の内容が不正確であったこと又は弊社が本条に基づく措置を行ったこと若しくは行わなかったことによってユーザーに生じた損害に関して、弊社の故意又は過失に起因する場合を除き、弊社は責任を負わないものとします。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">第 12 条 ユーザーの評価</h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">1. 購入者による評価</h4>
            <p>
              購入者は、届いた商品をすみやかに確認し、弊社所定の方式に従い出品者を評価するものとします。但し、商品に瑕疵がある場合、商品説明と実際の商品が明らかに異なる場合等において、第
              11 条第 5
              項に従い当該取引のキャンセルを希望する場合は、当該評価を行わないものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">2. 出品者による評価</h4>
            <p>
              購入者が出品者を評価した後、弊社所定の方式に従い出品者は購入者を評価するものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">3. 取引の完了</h4>
            <p>
              商品代金の決済が完了した日から起算して 2
              週間以内に、購入者から当該取引に係る商品が到達した旨の通知を受領し、かつ、前項に定める出品者による評価がなされた場合は、取引完了とします。なお、弊社所定の期間内に購入者が評価せず出品者が弊社所定の手続を行った場合又は弊社が必要と認める場合には、弊社は、当該取引が完了したものとみなすことができるものとします。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">
            第 13 条 弊社による売買契約の取消
          </h3>
          <ul>
            <li>
              1.
              売買契約が成立した場合においても、弊社は、以下の各号のいずれかに該当する場合又は該当したと弊社が合理的な理由に基づき判断した場合、当該売買契約を取り消すことができるものとします。
            </li>
            <li>
              (1)
              購入者が商品代金及び利用料の合計額を支払わない又は支払いを遅延した揚合
            </li>
            <li>(2) 出品者が商品を発送しない場合</li>
            <li>
              (3) その他弊社が本サービスの適切な運営のために必要と認める場合
            </li>
            <li>
              2.
              前項により当該売買契約が取り消された場合には、購入者及び出品者は、既に受領した商品を返還するなど、売買契約前の原状に復する一切の行為を行うものとします。
            </li>
            <li>
              3.
              弊社は、本サービスの適切な運営のために必要と判断する場合、購入者又は出品者に当該売買契約の売買代金相当額を上限として、その全部又は一部の補償（金銭の給付、その他代償的な措置を含む）を提案することができるものとします。なお、弊社が売買代金相当額の補償を行った場合には、弊社は、当該ユーザーに対して当該売買契約に係る商品の所有権（所有権が回復できないときは、代償請求権等）を弊社に譲渡（引渡等、譲渡に必要な手続の一切を含みます）することを求めることができるものとします。
            </li>
          </ul>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">
            第 14 条 販売手数料等及び売上申請
          </h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">1. 販売手数料等</h4>
            <p>
              出品者は、弊社に対し、出品した商品の売買契約が成立した場合、本サービスの販売手数料として、売買契約が成立した商品の販売価格に弊社が別途ガイドにおいて定める料率を乗じた金額を支払うものとします。商品ごとの販売手数料の金額は、出品者が販売価格を設定する際に表示されます（但し、第
              16 条第 3
              項に規定する場合等には、当初表示された金額から調整されることがあります。）。
              本サービスの販売手数料は、弊社、出品者との間の加盟店契約に従って、決済会社が出品者に代わって受領する商品代金又は立替払決済の場合に支払う商品代金相当額から差し引く方法により徴収されるものとし、出品者は、かかる方法により徴収することにつき予め同意するものとします。また、出品者は、弊社が別途ガイドにおいて定める配送方法を自らが選択した場合には、当該配送に係る配送業者への支払いを弊社に委託し、弊社及び出品者との間の加盟店契約に従って決済会社が弊社に代わってその支払額と同額を商品代金から差し引く形で徴収することにつき、予め同意するものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">2. 引出申請</h4>
            <ul>
              <li>
                (1)
                取引完了となった場合、弊社は、その旨を決済会社に通知するものとし、出品者（残高ユーザーに該当する方は除くものとします。）は、当該取引完了時から
                180
                日以内に、Swappyアプリにおける所定の手続により、加盟店規約に基づき、売上金の引出請求を決済会社に対して行うものとします。
              </li>
              <li>
                (2)
                決済会社の立替払決済を利用した購入者が、支払期日までに支払債務を支払わなかった場合で、かつ、当該購入者が売上金（当該購入者が残高ユーザーの場合は残高）を保有している場合、かかる売上金（又は残高）は、支払期日の翌日をもって、支払債務（利用料及び遅延損害金を含みます。以下同じ。）と対当額で自動相殺により精算されるものとします。また、支払期日以降に支払債務が残っている場合には、購入者が支払期日以降に売上金（当該購入者が残高ユーザーの場合は残高）を得たときも、同様に、かかる売上金（又は残高）は直ちに支払債務と対当額で自動相殺により精算されるものとします。
              </li>
              <li>
                (3)
                決済会社の立替払決済を利用した購入者が、支払期日までに支払債務を支払わなかった場合（銀行口座振替以外を支払債務の支払方法として選択していた場合に限ります。）、銀行口座振替を支払方法の一つとして登録している場合であって、かつ、登録されている銀行口座に預金残高が存在する場合には、決済会社は、支払期日の翌日以降、支払方法を当該銀行口座からの銀行口座振替の方法に自動的に変更することにより、未払いの支払債務の弁済を受けることができるものとします。また、支払期日以降に支払債務が残っている場合で、当該銀行口座に新たに入金がなされたときも、同様に、決済会社は当該預金残高について、銀行口座振替の方法により、直ちに未払いの支払債務の弁済を受けることができるものとします。
              </li>
            </ul>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">
            第 15 条 残高及びポイントの取扱い
          </h3>
          <p>
            ユーザーは、本サービスにおける商品購入において、残高及びポイントを利用することができます。残高、ポイントの内容及びこれらの利用条件については、利用規約に定めるとおりとします。
          </p>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">第 16 条 割引券の取扱い</h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">1. 割引券の取得</h4>
            <p>
              ユーザーは、本サービスにおける各種キャンペーンへの参加その他の弊社が本サービスにおいて指定する方法により、割引券を取得することができます。割引券の取得条件は、弊社が本サービスにおいて表示するところに従うものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">2. 割引券の利用</h4>
            <p>
              ユーザーは、自らが保有している割引券を本サービスにおいて商品購入に利用できます。割引券の利用条件は、弊社が本サービスにおいて表示するところに従うものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">
              3. 割引券が利用された場合の取扱い
            </h4>
            <p>
              割引券が商品購入に利用された場合には、当該商品の出品者は、販売価格から、利用された割引券に表示された金額又は割合を割引いた金額を、当該商品の商品代金とすることに予め同意するものとします。かかる場合には、弊社は、割引券による割引金額相当分を、販売手数料から減額するものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">4. 割引券の交換等</h4>
            <p>
              ユーザーは、割引券を弊社が指定する本サービスにおける商品購入以外に利用することはできず、現金、財物その他の経済的利益と交換することはできません。また、弊社は、理由のいかんを問わず、割引券の払戻しは行いません。但し、法令上必要な場合はこの限りではなく、その場合の割引券の払戻し方法は、法令に従って弊社が定め、弊社のウェブサイト等に表示するところに従うものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">5. 割引券の有効期限</h4>
            <p>
              ユーザーは、割引券を獲得した日から 180
              日間又は割引券付与前に別途弊社が定めた期間内にのみ利用することができます。有効期限を過ぎた未使用の割引券は消滅し、その後利用することはできません。
              割引券の有効期間の起算点は、割引券が利用された取引のキャンセル等により割引券が返還された場合等を含めて、いずれの場合も当該割引券を当初取得した日とします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">
              6. ユーザーの退会・ユーザー登録の取消の場合
            </h4>
            <p>
              理由のいかんを問わず、ユーザーが退会した場合又はユーザー登録が取消しとなった場合には、当該ユーザーが保有する割引券は全て失効し、以後利用することはできないものとします。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">
            第 17 条 弊社による商品の出品・販売等
          </h3>
          <ol className="list-decimal px-4">
            <li>
              弊社は、本サービスにおいて、商品の出品又は販売を行う場合があります。なお、その場合も、本サービスがユーザー間の物品の売買の場・機会を提供するオンラインフリーマーケットサービスであるとの性質には何ら影響を及ぼしません。
            </li>
            <li>
              弊社が出品した商品を購入者が購入した場合であっても、システムトラブル、欠品、配送事故その他の事情により、商品を納品できない場合があります。その場合、弊社は、弊社の裁量により、当該商品にかかる購入者との売買契約を解除することができるものとし、購入者への返金その他の弊社が適切と認める措置をとるものとします。
            </li>
            <li>
              弊社が出品した商品を購入した購入者は、弊社の債務不履行の場合（商品に瑕疵がある場合又は品違いの場合を含みます。）又は弊社の故意若しくは過失に起因する場合を除き、売買のキャンセル及び商品の返品を行うことはできないものとします。
            </li>
            <li>
              弊社が出品した商品を購入した購入者は、商品に瑕疵がある場合又は品違いの場合は、弊社所定の方法により弊社に連絡するものとします。この場合には、購入者は、商品の返送等につき弊社の指示に従うものとし、弊社は、返金、商品交換その他の弊社が適切と認める措置をとることができるものとします。
            </li>
            <li>
              購入者は、弊社が出品した商品を購入した場合、本規約に従い、商品代金の支払いその他の購入者が行うべきとされている行為を行うものとします。但し、弊社が本サービスにおいて商品の出品又は販売を行う場合には、本規約の第
              10 条第 5 項、第 12 条及び第 14
              条の規定は適用されないものとします。
            </li>
          </ol>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">第 18 条 弊社による商品の配送</h3>
          <ol className="list-decimal px-4">
            <li>
              弊社が本サービスにおいて商品の販売を行う場合、弊社は、自ら又は配送業者を通じて、購入者に商品を配送します。購入者は、弊社又は弊社から委託を受けた配送業者が、商品配送のため、夜間を含め、電話等にて購入者に日時の確認その他の連絡を行う場合があることを承諾します。
            </li>
            <li>
              購入者は、商品の配送時に商品配送先住所に不在の場合、当該配送時に配布する不在票に従って、配送日から弊社又は配送業者所定の日数以内に、再配送日時を指定するものとします。前記の期間内に再配送日の指定がない場合若しくは再配送日時に不在の場合、又は、購入者の受取拒否、所在不明その他の事由により商品の引渡しが困難な場合には、弊社は、その裁量により、購入者との売買契約の解除その他弊社が適切と認める措置をとることができるものとします。
            </li>
            <li>
              前項に定める場合において、弊社は、売買契約の解除又は前項に基づく措置により購入者又は第三者に生じた損害に関して、弊社の故意又は過失に起因する場合を除き、責任を負わないものとします。前項に定める場合において、弊社が損害を被った場合には、購入者は当該損害を賠償するものとします。
            </li>
          </ol>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">第 19 条 他のサービスへの遷移</h3>
          <p>
            ユーザーが本サービスを利用するにあたり、本サービスから、弊社グループ又は第三者が運営する他のサービス（以下「外部サービス」といいます。）に遷移する場合があります。ユーザーは、予めこれに同意するものとし、本規約及び外部サービスの利用規約等を遵守して、本サービス及び外部サービスを利用するものとします。なお弊社は、外部サービスについて保証しません。
          </p>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">
            第 20 条 本サービスの中断・終了及び変更
          </h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">1. 本サービスの中断</h4>
            <p>
              弊社は、以下の各号のいずれかに該当する場合には、ユーザーに事前に通知することなく一時的に本サービスの全部又は一部を中断する事ができるものとします。
            </p>
            <ul>
              <li>
                (1)
                サーバー、通信回線、その他の設備の故障、障害の発生又はその他の理由により本サービスの提供ができなくなった場合
              </li>
              <li>
                (2)
                定期的な又は緊急のシステム（サーバー、通信回線や電源、それらを収容する建築物などを含む）の保守、点検、修理、変更を行う場合
              </li>
              <li>
                (3) 火災、停電等により本サービスの提供ができなくなった場合
              </li>
              <li>
                (4)
                地震、噴火、洪水、津波等の天災により本サービスの提供ができなくなった場合
              </li>
              <li>
                (5)
                戦争、変乱、暴動、騒乱、労働争議等その他不可抗力により本サービスの提供ができなくなった場合
              </li>
              <li>
                (6)
                法令又はこれに基づく措置により本サービスの提供ができなくなった場合
              </li>
              <li>(7) その他運用上又は技術上、弊社が必要と判断した場合</li>
            </ul>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">2. 本サービスの終了及び変更</h4>
            <p>
              弊社は、適用法令に定める手続に従うことにより、任意の理由により、本サービスの全部又は一部を終了及び変更できるものとします。本サービスを終了する場合においては、弊社が適当と判断する方法で、可能な限り事前にユーザーにその旨を通知し、または公表するものとします。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">
            第 21 条 知的財産権及びコンテンツ
          </h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">1. 知的財産権等の帰属</h4>
            <p>
              本サービスを構成するすべての素材に関する権利は、弊社又は当該権利を有する第三者に帰属しています。ユーザーは、本サービスのすべての素材に関して、一切の権利を取得することはないものとし、権利者の許可なく、所有権、著作権を含む一切の知的財産権、肖像権、パブリシティー権等、コンテンツ素材に関する権利を侵害する一切の行為をしてはならないものとします。本規約に基づく本サービスの利用の許諾は、本サービスに関する弊社又は当該権利を有する第三者の権利の使用許諾を意味するものではありません。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">2. 弊社による利用</h4>
            <p>
              出品者により投稿された出品物の写真、動画、情報等に関しては、本サービスの宣伝、運営、研究開発及び発表等を目的として、弊社及び弊社の指定する者が自由に利用できるものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">3. コンテンツに関する責任</h4>
            <p>
              ユーザー等が本サービスに関連して発信又は掲載したコンテンツに関する一切の責任は、当該ユーザー等が負うものとし、弊社は、その内容、品質、正確性、信憑性、適法性、最新性、有用性等について、確認いたしません。また、弊社は、それらに関して保証しないものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">4. コンテンツの内容等</h4>
            <p>
              ユーザー等は、他のユーザー等が発信又は掲載するコンテンツについて、その内容、品質、正確性、信憑性、適法性、最新性、有用性等を、ユーザー等ご自身で判断する必要があります。弊社は、ユーザー等及び第三者が弊社のコンテンツを利用することにより生じる損害について、弊社の故意又は過失に起因する場合を除き、責任を負わないものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">5. バックアップ</h4>
            <p>
              弊社はコンテンツのバックアップを行う義務を負わないものとします。ユーザーは、コンテンツのバックアップが必要な場合には、自己の費用と責任でこれを行うものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">6. コンテンツの変更及び削除</h4>
            <p>
              弊社は、ユーザーが本規約に違反又は本規約の精神に照らして不適切な行為を行ったと弊社が判断した場合、当該ユーザーが掲載したあらゆるコンテンツを、事前の通知なしに変更及び削除できるものとします。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">
            第 22 条 ユーザーの責任及び接続環境等
          </h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">1. 必要な機器の準備等</h4>
            <p>
              本サービスの提供を受けるために必要なコンピューター、スマートフォンその他の機器、ソフトウェア、通信回線その他の通信環境等は、ユーザーの費用と責任において準備し維持するものとします。また、その機器、ソフトウェア、通信環境等の設置や操作についても、ユーザーの費用と責任で行っていただく必要があります。弊社は、本サービスがあらゆる機器等に適合することを保証するものではなく、機器等の準備、設置、操作に関し、一切関与せず、ユーザーに対するサポートも行いません。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">2. ネットワークの経由等</h4>
            <p>
              ユーザーは、本サービスを利用する際に、種々のネットワークを経由する場合があることを理解し、接続しているネットワークや機器等によっては、それらに接続したり、それらを通過するために、データや信号等の内容が変更される可能性があることを理解したうえで、本サービスを利用するものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">3. 手続の成立</h4>
            <p>
              ユーザーがインターネット回線を通じて行う本サービスへの入力、出品、購入、退会、その他の手続は、弊社のサーバーに当該手続に関するデータが送信され、弊社のシステムに当該手続の内容が反映された時点をもって有効に成立するものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">4. トラブルの解決</h4>
            <p>
              本サービスに関連してユーザー間又はユーザーと第三者間で発生したトラブル（本サービスを将来利用するという前提の下で起こったトラブルを含みます。）に関して、ユーザーは各自の費用及び責任で解決するものとします。トラブルが生じた際には、当事者間で解決するものとし、当該トラブルにより弊社が損害を被った場合は、当事者は連帯して当該損害を賠償するものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">5. 第三者との紛争解決</h4>
            <p>
              ユーザーと第三者との間で、本サービスに関連して、裁判、クレーム、請求等のあらゆるトラブルを含む紛争が生じた場合、ユーザー各自の責任や費用で解決するものとし、弊社は、当該紛争に一切関与しません。当該紛争がユーザーの故意又は過失に起因して生じた場合には、ユーザーは、当該紛争により弊社に生じた損害を連帯して賠償するものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">6. 費用の負担</h4>
            <p>
              弊社とユーザー間で紛争が生じた場合において、当該紛争がユーザーの故意又は過失に起因して生じた場合には、ユーザーは当該紛争に関連して弊社に発生した損害を賠償するものとします。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">第 23 条 非保証及び免責</h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">1. 内容等に関する非保証</h4>
            <p>
              弊社は、本サービスの内容、品質及び水準並びに本サービスの安定的な提供、本サービスの利用に伴う結果等については、保証しません。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">2. 弊社の免責</h4>
            <p>
              本サービス提供における、不正確、不適切又は不明瞭な内容、表現、行為等により、ユーザー及び第三者に対して損害が生じた場合、弊社の故意又は過失に起因する場合を除き、弊社は、当該損害について責任を負わないものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">3. 情報提供に関する非保証</h4>
            <p>
              弊社は、本サービスに関連して、ユーザー等に対して、適宜情報提供を行うことがありますが、当該情報の正確性や有用性を保証するものではありません。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">
              4. コンピュータウィルス等に関する非保証
            </h4>
            <p>
              本サービスに関連するコンテンツの中に、コンピュータウィルス等有害なものが含まれていないことに関して、保証しません。弊社は、本サービスに関連するコンテンツの中に、コンピュータウィルス等有害なものが含まれていたことにより生じた損害について、ユーザー及び第三者に対して、弊社の故意又は過失に起因する場合を除き、責任を負わないものとします。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">第 24 条 損害賠償</h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">1. ユーザーの責任</h4>
            <p>
              ユーザーが本規約に違反した場合、当該ユーザーが、当該違反により損害を受けたユーザー及び第三者に対する損害賠償責任を含む、一切の責任を負うものとします。ユーザーがかかる違反行為を行ったことにより、弊社が損害を被った場合は、当該ユーザーその他関連当事者は連帯して当該損害を賠償するものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">2. 弊社の免責</h4>
            <p>
              弊社は、弊社による本サービスの提供の停止、終了又は変更、ユーザー登録の取消、コンテンツの削除又は消失､本サービスの利用によるデータの消失又は機器の故障その他本サービスに関連してユーザーが被った損害につき、弊社の故意又は過失に起因する場合を除き、賠償する責任を負わないものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">3. 弊社の責任の範囲</h4>
            <p>
              弊社がユーザーに対して損害賠償責任を負う場合においても、弊社の責任は、弊社の債務不履行又は不法行為によりユーザーに生じた損害のうち現実に発生した直接かつ通常の損害に限るものとします。但し、弊社の故意又は重過失に起因する場合を除きます。
            </p>
          </div>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold">第 25 条 一般条項</h3>
          <div className="py-2">
            <h4 className="text-lg font-bold">1. 通知</h4>
            <ul>
              <li>
                (1)
                本サービスに関する弊社からユーザーへの通知又は連絡は、弊社が運営するウェブサイト又はアプリケーション内の適宜の場所への掲示その他、弊社が適当と判断する方法により行なうものとします。弊社は、個々のユーザーに通知及び連絡をする必要があると判断した際、登録された電子メールアドレス、住所又は電話番号に対し、メッセージング機能、電子メール、郵便、電話等を用いて通知及び連絡を行うことがあります。
              </li>
              <li>
                (2)
                ユーザーが弊社に通知、連絡又は問い合わせをする必要が生じた場合、本サービスのお問い合わせフォームを利用するものとし、電話や来訪を行うことはできないものとします。弊社は、かかる連絡又は問い合わせがあった場合、弊社が定める方法により、ユーザーの本人確認を行うことができるものとします。また、問合せに対する回答方法に関しては、弊社が適切と考える回答方法を利用することができるものとし、その回答方法をユーザーが決めることはできないものとします。
              </li>
            </ul>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">2. 譲渡禁止</h4>
            <p>
              ユーザーは、弊社の書面による事前の承諾なく、本規約に基づく契約上の地位又は本規約に基づく権利若しくは義務につき、第三者に対し、譲渡、移転、担保設定、貸与、その他の処分をすることはできません。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">3. 事業譲渡</h4>
            <p>
              弊社が本サービスに係る事業を第三者に譲渡する場合（事業譲渡、会社分割その他本サービスの主体が移転する一切の場合を含みます。）には、弊社は、当該事業の譲渡に伴い、ユーザーの本規約に基づく契約上の地位、本規約に基づく権利義務及びユーザー登録に伴い登録された情報その他の情報を当該事業の譲受人に譲渡することができるものとし、ユーザーは、かかる譲渡につき予め承諾するものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">4. 分離可能性</h4>
            <p>
              本規約のいずれかの条項又はその一部が、法令等により無効と判断された場合であっても、当該無効とされた以外の部分は、継続して有効に存続するものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">5. 定めのない事項等</h4>
            <p>
              本規約に定めのない事項又は本規約の解釈に疑義が生じた場合には、弊社及びユーザーは、信義誠実の原則に従って協議の上速やかに解決を図るものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">6. 言語</h4>
            <p>
              本規約は、日本語を正文とします。本規約につき、参考のために英語による翻訳文が作成された場合でも、日本語の正文のみが契約としての効力を有するものとし、英訳はいかなる効力も有しないものとします。
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-bold">7. 準拠法及び裁判管轄</h4>
            <p>
              本規約は、日本法に基づき解釈されるものとし、ユーザーと弊社の間で生じた紛争については、その内容に応じて東京簡易裁判所又は東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </div>
        </div>
      </div>
      <div className="text-right">2023年10月1日制定</div>
    </div>
  );
}
