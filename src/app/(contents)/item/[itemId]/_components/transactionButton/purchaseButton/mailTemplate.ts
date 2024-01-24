/**
 * 出品者にメールを送信
 * @param sellerName 出品者名
 * @param itemName 商品名
 * @param siteName サイト名
 */
export const createSellerMailContent = (
  sellerName: string,
  itemName: string,
  siteName: string,
) => `${sellerName}様
  この度は${siteName}をご利用いただき、誠にありがとうございます。
  あなたの出品した商品 ${itemName} が購入されました。


  商品の発送準備をお願いします。
  発送が完了しましたら、発送完了の通知を当サービスを通じて購入者にお知らせください。
  購入者とのやり取りは取引ページをご利用ください。
  `;

/**
 * 購入者にメールを送信
 * @param buyerName 購入者名
 * @param itemName 商品名
 * @param itemPrice 商品価格
 * @param sellerName 出品者名
 * @param siteName サイト名
 */
export const createBuyerMailContent = (
  buyerName: string,
  itemName: string,
  itemPrice: number,
  sellerName: string,
  siteName: string,
) => `${buyerName}様
  この度は${siteName}をご利用いただき、誠にありがとうございます。
  以下の商品を購入しました。

  商品名: ${itemName}
  金額: ${itemPrice}円

  出品者の ${sellerName} 様が商品の発送準備を進めています。
  出品者とのやり取りは取引ページをご利用ください。
  `;
