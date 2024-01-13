import { MessageCard } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/messageContainer/MessageCard";
import { ReloadButton } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/messageContainer/reloadButton";
import { type TransactionCommentReadResult } from "@/repositories/transactionComment";
import { type SessionUser } from "@/utils";

type Props = {
  /** メッセージ一覧 */
  comments: TransactionCommentReadResult;
  /** ログインユーザー */
  sessionUser: SessionUser;
};

/**
 * メッセージ一覧
 */
export const MessageList = ({ comments, sessionUser }: Props) => {
  const transactionId = comments[0]?.transactionId ?? "";
  if (comments.length === 0)
    return <div className="text-center">メッセージはありません</div>;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex max-h-96 flex-col gap-4 overflow-y-scroll">
        {comments.map((message) => (
          <MessageCard key={message.id} {...{ message, sessionUser }} />
        ))}
        <ReloadButton {...{ transactionId }} />
      </div>
    </div>
  );
};
