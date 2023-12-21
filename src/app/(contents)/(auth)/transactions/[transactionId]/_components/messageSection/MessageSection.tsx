"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { type Transaction, type TransactionComment } from "@prisma/client";
import { type Session } from "next-auth";
import Image from "next/image";
import toast from "react-hot-toast";
import { BiSend } from "react-icons/bi";
import { FaSyncAlt } from "react-icons/fa";

import {
  fetchMessages,
  sendMessage,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/messageSection/actions";
import { CommentLoading } from "@/app/(contents)/item/[id]/_components/commentContainer/CommentLoading";
import defaultIcon from "@/images/profile-pic-placeholder.png";
import { Button } from "@/ui";
import { LimitInput } from "@/ui/form/LimitElements";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { parseFixedDateTime } from "@/utils/parseRelativeTime";

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
  const formRef = useRef<HTMLFormElement>(null);

  const handleReloadMessage = useCallback(async () => {
    setIsReloading(true);
    try {
      const res = await fetchMessages(transaction.id);
      setMessages(res);
      chatareaRef.current?.scrollTo(0, chatareaRef.current.scrollHeight);
    } catch (e) {
      console.error(e);
      toast.error("メッセージの取得に失敗しました。");
    } finally {
      setIsReloading(false);
    }
  }, [transaction.id]);

  useEffect(() => {
    void handleReloadMessage();
    const interval = setInterval(handleReloadMessage, 10000);
    return () => clearInterval(interval);
  }, [handleReloadMessage]);

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
      await sendMessage(message, transaction.id);
      setMessages(await fetchMessages(transaction.id));
      formRef.current?.reset();
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
          onClick={handleReloadMessage}
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
                    <div className="chat-bubble break-words">
                      {message.comment}
                    </div>
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
            <CommentLoading />
            <CommentLoading />
          </div>
        )}
        <form
          className="input flex w-full items-center p-0"
          action={postComment}
          ref={formRef}
        >
          <LimitInput
            type="text"
            name="message"
            placeholder="メッセージを入力..."
            className="grow rounded-r-none"
            maxLength={300}
            hideLimit
          />
          <SubmitButton className="btn-square btn-primary shrink-0 rounded-l-none">
            <BiSend size="2rem" />
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
