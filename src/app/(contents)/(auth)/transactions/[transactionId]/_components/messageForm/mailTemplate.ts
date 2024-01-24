import { SITE_URL } from "@/constants/site";

/**
 * 取引メッセージが送信された際に、相手にメールを送信する
 * @param recipientName 相手の名前
 * @param itemName 商品名
 * @param transactionId 取引ID
 * @param transactionCommentCreateComment 取引コメント
 */
export const createRecipientMailContent = (
  recipientName: string | null,
  itemName: string | null,
  transactionId: string,
  transactionCommentCreateComment: string,
) => `
    ${recipientName}様から取引メッセージが届きました。
    商品名: ${itemName}
    取引ページ: ${SITE_URL}/transactions/${transactionId}
    メッセージ: ${transactionCommentCreateComment}
    `;
