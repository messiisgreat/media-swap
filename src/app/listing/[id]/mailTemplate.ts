import { CORPORATE_MAIL, SITE_URL } from "@/constants/site";

/**
 * 出品者にメールを送信
 * @param sellerName 出品者名
 * @param listingName 商品名
 * @param siteName サイト名
 */
export const createSellerMailContent = (
  sellerName: string,
  listingName: string,
  siteName: string,
) => {
  return `${sellerName}様
  この度は${siteName}をご利用いただき、誠にありがとうございます。
  あなたの出品した商品 ${listingName} が購入されました。


  商品の発送準備をお願いします。
  発送が完了しましたら、発送完了の通知を当サービスを通じて購入者にお知らせください。
  購入者とのやり取りは取引ページをご利用ください。

  ※このメールに心当たりのない場合は、お手数ですが${CORPORATE_MAIL}までご連絡ください。

  ${SITE_URL}
  `;
};

/**
 * 購入者にメールを送信
 * @param buyerName 購入者名
 * @param listingName 商品名
 * @param listingPrice 商品価格
 * @param sellerName 出品者名
 * @param siteName サイト名
 */
export const createBuyerMailContent = (
  buyerName: string,
  listingName: string,
  listingPrice: number,
  sellerName: string,
  siteName: string,
) => {
  return `${buyerName}様
  この度は${siteName}をご利用いただき、誠にありがとうございます。
  以下の商品を購入しました。

  商品名: ${listingName}
  金額: ${listingPrice}円

  出品者の ${sellerName} 様が商品の発送準備を進めています。
  出品者とのやり取りは取引ページをご利用ください。

  ※このメールに心当たりのない場合は、お手数ですが${CORPORATE_MAIL}までご連絡ください。

  ${SITE_URL}
  `;
};