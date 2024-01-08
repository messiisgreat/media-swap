import { MessageList } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/messageContainer/MessageList";
import {
  findTransactionComments,
  markAsReadTransactionComments,
} from "@/repositories/transactionComment";
import { type SessionUser } from "@/utils";

type Props = {
  /** 取引ID */
  transactionId: string;
  /** ログインユーザー */
  sessionUser: SessionUser;
};

/**
 * メッセージ一覧のデータ取得が責務のコンテナ
 */
export const MessageContainer = async ({
  transactionId,
  sessionUser,
}: Props) => {
  const [comments] = await Promise.all([
    findTransactionComments(transactionId),
    markAsReadTransactionComments(transactionId, sessionUser.id),
  ]);
  return (
    <MessageList
      {...{
        comments,
        sessionUser,
      }}
    />
  );
};
