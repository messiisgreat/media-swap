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
                「外国 PEPs 等」とは、
                <Link
                  href="/peps/"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  外国PEPs（外国の政府等において重要な地位を占める方）とは
                </Link>
                に掲げる者をいいます。
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
