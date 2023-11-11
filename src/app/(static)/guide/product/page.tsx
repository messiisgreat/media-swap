import { SITE_NAME } from "@/constants/site";

/**
 * ガイドページ(出品)
 */
export default function GuideListingPage() {
  return (
    <div>
      <div className="border-2">
        <h2 className="text-center text-xl font-bold">{SITE_NAME}ガイド</h2>
        <div className="py-6">
          <h3 className="text-lg font-bold">禁止されている出品物</h3>
          <p className="py-4">
            {SITE_NAME}
            は、誰しもが商品を手軽に購入や販売できるフリマプラットフォームです。
            多数のユーザーが心置きなく安全に取引を行えるため、以下の活動を制限しております。
          </p>
          <p className="py-4">
            これらの活動を検知した際には、アカウントの使用制約などの処置を考慮することがございます。
          </p>
        </div>
        <div className="py-6">
          <ul className="list-disc px-4">
            <li>ダウンロードコンテンツやデジタルコンテンツなどの電子データ</li>
            <li>不正な手段で取得したアイテムや盗品</li>
            <li>犯罪や違法行為に使用される可能性があるもの</li>
            <li>危険物や安全性に問題があるもの</li>
            <li>児童ポルノやそれに類するとみなされるもの</li>
            <li>手元にない商品の出品やECサイト等から直送すること</li>
            <li>個人情報を含む出品・投稿、個人情報の不正利用</li>
            <li>その他、不適切と判断されるもの</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
