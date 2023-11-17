"use client";

import {
  fetchMessages,
  sendMessage,
} from "@/app/transactions/[transactionId]/actions";
import defaultIcon from "@/assets/profile-pic-placeholder.png";
import { Button } from "@/components";
import FormSubmitButton from "@/components/FormSubmitButton";
import { Skeleton } from "@/components/Skeleton";
import { LimitInput } from "@/components/form/LimitElements";
import { parseFixedDateTime } from "@/utils/parseRelativeTime";
import { Transaction, TransactionComment } from "@prisma/client";
import { Session } from "next-auth";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiSend } from "react-icons/bi";
import { FaSyncAlt } from "react-icons/fa";

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
  const [isReloading, setIsReloading] = useState(false);
  const chatareaRef = useRef<HTMLDivElement>(null);

  const reloadMessage = useCallback(async () => {
    setIsReloading(true);
    try {
      const res = await fetchMessages(transaction.id, sessionUser.id);
      setMessages(res);
      chatareaRef.current?.scrollTo(0, chatareaRef.current.scrollHeight);
    } catch (e) {
      console.error(e);
      toast.error("メッセージの取得に失敗しました。");
    } finally {
      setIsReloading(false);
    }
  }, [transaction.id, sessionUser.id]);

  useEffect(() => {
    reloadMessage();
    const interval = setInterval(reloadMessage, 10000);
    return () => clearInterval(interval);
  }, [reloadMessage]);

  const postComment = async (f: FormData) => {
    const message = f.get("message") as string;
    if (!message || typeof message !== "string") {
      toast.error("メッセージを入力してください");
      return;
    }

    if (message.length > 300) {
      toast.error("300文字以内で入力してください");
      return;
    }

    try {
      await sendMessage(message, sessionUser, transaction.id);
      setMessages(await fetchMessages(transaction.id, sessionUser.id));
      toast.success("メッセージを送信しました。");
      setTimeout(
        () =>
          chatareaRef.current?.scrollTo(0, chatareaRef.current.scrollHeight),
        500,
      );
    } catch (e) {
      console.error(e);
      toast.error("メッセージの送信に失敗しました。");
    }
  };
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <p>メッセージ</p>
        <Button
          outline
          className="btn-info"
          onClick={() => {
            reloadMessage();
          }}
          disabled={isReloading}
        >
          <div className={`${isReloading ? "animate-spin" : ""}`}>
            <FaSyncAlt size="1rem" />
          </div>
        </Button>
      </div>
      <div className="flex w-full flex-col gap-4">
        {messages ? (
          messages.length === 0 ? (
            <div className="text-center">メッセージはありません</div>
          ) : (
            <div
              className="flex max-h-96 flex-col gap-4 overflow-y-scroll"
              ref={chatareaRef}
            >
              {messages.map((message) => {
                const isMe = message.user.id === sessionUser.id;
                return (
                  <div
                    className={`chat ${isMe ? "chat-end" : "chat-start"}`}
                    key={message.id}
                  >
                    <div
                      className={`avatar chat-image ${isMe ? "hidden" : ""}`}
                    >
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
                      <span className={`${isMe ? "hidden" : ""}`}>
                        {message.user.name ?? "名無し"}
                      </span>
                      <time className="text-xs opacity-50">
                        {parseFixedDateTime(message.createdAt)}
                      </time>
                    </div>
                    <div className="chat-bubble">{message.comment}</div>
                    <div className="chat-footer opacity-50">
                      {message.isRead && isMe ? "既読" : ""}
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
        <form
          className="flex w-full items-center"
          action={(f) => postComment(f)}
        >
          <LimitInput
            type="text"
            name="message"
            placeholder="メッセージを入力..."
            className="input-accent grow rounded-r-none"
            maxLength={300}
            hideLimit
          />
          <FormSubmitButton
            className="btn-square btn-accent shrink-0 rounded-l-none"
            hideChildrenInPending
          >
            <BiSend size="2rem" />
          </FormSubmitButton>
        </form>
      </div>
    </div>
  );
}
