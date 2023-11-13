"use client";

import { fetchMessages } from "@/app/transactions/[transactionId]/actions";
import { Skeleton } from "@/components/Skeleton";
import { Transaction, TransactionComment } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import defaultIcon from "@/assets/profile-pic-placeholder.png";
import { Session } from "next-auth";
import { parseFixedDateTime } from "@/utils/parseRelativeTime";
import { BiSend } from "react-icons/bi";

/**
 * 取引画面のメッセージ
 * @returns
 */
export function MessageSection({
  transaction,
  sessionUser,
}: {
  transaction: Transaction;
  sessionUser: Session["user"];
}) {
  const [messages, setMessages] = useState<
    | (TransactionComment & {
        user: { name: string | null; image: string | null; id: string | null };
      })[]
    | null
  >(null);
  useEffect(() => {
    fetchMessages(transaction.id)
      .then((res) => {
        setMessages(res);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [transaction.id]);
  return (
    <div className="w-full flex flex-col gap-4">
      {messages ? (
        messages.length === 0 ? (
          <div>メッセージはありません</div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages
              .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
              .map((message, i) => {
                const isMe = message.user.id === sessionUser.id;
                return (
                  <div
                    className={`chat ${isMe ? "chat-end" : "chat-start"}`}
                    key={i}
                  >
                    <div
                      className={`avatar chat-image ${isMe ? "hidden" : ""}`}
                    >
                      <div className="w-10 rounded-full">
                        <Image
                          src={message.user.image ?? defaultIcon}
                          width={40}
                          height={40}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="chat-header flex items-end gap-1">
                      <span className={`${isMe ? "hidden" : ""}`}>
                        {message.user.name ?? "名無し"}
                      </span>
                      <time className="text-xs opacity-50">
                        {parseFixedDateTime(message.createdAt)}
                      </time>
                    </div>
                    <div className="chat-bubble">{message.comment}</div>
                    <div className="chat-footer opacity-50">
                      {message.isRead && !isMe ? "既読" : ""}
                    </div>
                  </div>
                );
              })}
          </div>
        )
      ) : (
        <div className="flex flex-col gap-4">
          <Skeleton />
          <Skeleton />
        </div>
      )}
      <form className="flex w-full items-center">
        <input
          type="text"
          placeholder="メッセージを入力..."
          className="input input-bordered input-accent grow rounded-r-none"
        />
        <button className="btn btn-square btn-accent shrink-0 rounded-l-none" type="submit">
          <BiSend size="2rem" />
        </button>
      </form>
    </div>
  );
}
