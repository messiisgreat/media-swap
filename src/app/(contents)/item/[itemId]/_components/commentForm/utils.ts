import { createCommentNotificationMailContent } from "@/app/(contents)/item/[itemId]/_components/commentForm/mailTemplate";
import {
  NOTIFICATION_KEYS,
  NOTIFICATION_TYPES,
} from "@/constants/emailNotification";
import { sendMailToUser } from "@/lib/mail";
import { type ItemCommentsCreateResult } from "@/repositories/itemComment";
import { decimalToBinary } from "@/utils/converter";

/**
 * 商品コメントが投稿された際に、メールを送信する
 * @param itemComment 商品コメント
 */
export const sendMailOnComment = async (
  itemComment: ItemCommentsCreateResult,
): Promise<boolean> => {
  const { item, itemId, userId, comment } = itemComment;
  const { name: itemName, sellerId, seller } = item;
  const {
    name: sellerName,
    email: sellerEmail,
    noticePermissionCode: sellerNotificationSettings,
  } = seller;

  // コメントが出品者自身によるものでない場合に限り、通知処理を行う
  if (userId !== sellerId) {
    const numberOfKeys = Object.keys(NOTIFICATION_TYPES).length;
    const sellerNoticePermissionCode = decimalToBinary(
      sellerNotificationSettings,
      numberOfKeys,
    );

    const itemCommentsNotificationIndex = NOTIFICATION_KEYS.indexOf(
      "itemCommentsNotification",
    );

    // itemComments の boolean 値を取得
    const sellerWantsItemComments =
      sellerNoticePermissionCode[itemCommentsNotificationIndex];

    const mailSubject = `出品した商品:${itemName} にてコメントが届きました`;

    const mailContent = createCommentNotificationMailContent(
      sellerName,
      itemName,
      itemId,
      comment,
    );

    if (sellerWantsItemComments) {
      return await sendMailToUser(sellerEmail, mailSubject, mailContent);
    }
  }
  return true;
};
