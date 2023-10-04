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
              href={"/guide/"}
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              ガイドの禁止されている行為
            </Link>
            に該当すると弊社が合理的な理由に基づき判断する行為（以下「禁止事項」といいます。）を禁止します。
          </p>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold"></h3>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold"></h3>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold"></h3>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold"></h3>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold"></h3>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold"></h3>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold"></h3>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold"></h3>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold"></h3>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold"></h3>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold"></h3>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold"></h3>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold"></h3>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-bold"></h3>
        </div>
      </div>
    </div>
  );
}
