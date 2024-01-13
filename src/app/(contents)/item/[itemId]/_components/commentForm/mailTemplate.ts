import { PAGE_CONTENT, PAGE_LINK } from "@/constants/myPage";
import { CORPORATE_MAIL, SITE_URL } from "@/constants/site";

/**
 * 出品商品にコメントが投稿された際に、出品者にメールを送信する
 * @param sellerName 出品者の名前
 * @param itemName 商品名
 * @param itemId 商品ID
 * @param comment コメント
 */
export const createCommentNotificationMailContent = (
  sellerName: string | null,
  itemName: string | null,
  itemId: string,
  comment: string,
) => `
    ${sellerName}様が出品した商品にコメントが届きました。

    商品名: ${itemName}
    商品ページ: ${SITE_URL}/item/${itemId}
    コメント: ${comment}

    ※このメールに心当たりのない場合は、お手数ですが${CORPORATE_MAIL}までご連絡ください。
    ${SITE_URL}

    メールの配信設定
    ${SITE_URL}${PAGE_LINK[PAGE_CONTENT.NOTIFICATIONS]}
    `;
