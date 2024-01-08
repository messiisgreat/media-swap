import defaultIcon from "@/images/profile-pic-placeholder.png";
import { type TransactionCommentReadResult } from "@/repositories/transactionComment";
import { parseFixedDateTime, type SessionUser } from "@/utils";
import Image from "next/image";

type Props = {
  /** コメント */
  message: TransactionCommentReadResult[number];
  /** ログインユーザー */
  sessionUser: SessionUser;
};

/**
 * 取引メッセージのカード
 */
export const MessageCard = ({ message, sessionUser }: Props) => {
  const isOwnComment = message.user.id === sessionUser.id;
  return (
    <div
      className={`chat ${isOwnComment ? "chat-end" : "chat-start"}`}
      key={message.id}
    >
      <div className={`avatar chat-image ${isOwnComment ? "hidden" : ""}`}>
        <div className="w-10 rounded-full">
          <Image
            src={message.user.image ?? defaultIcon}
            width={40}
            height={40}
            alt={message.user.name ?? "名無し"}
          />
        </div>
      </div>
      <div className="chat-header flex items-end gap-1">
        <span className={`${isOwnComment ? "hidden" : ""}`}>
          {message.user.name ?? "名無し"}
        </span>
        <time className="text-xs opacity-50">
          {parseFixedDateTime(message.createdAt)}
        </time>
      </div>
      <div className="chat-bubble break-words">{message.comment}</div>
      <div className="chat-footer opacity-50">
        {message.isRead && isOwnComment ? "既読" : ""}
      </div>
    </div>
  );
};
