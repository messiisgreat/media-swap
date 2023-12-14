"use client";

import { useEffect, useRef, useState } from "react";

import { useDeleteModal } from "@/app/(contents)/item/[id]/_components/commentSection/DeleteModal";
import { useReportModal } from "@/app/(contents)/item/[id]/_components/commentSection/ReportModal";
import { TestTransactionButton } from "@/app/(contents)/item/[id]/_components/commentSection/TestTransactionButton";
import { commentsAtom } from "@/app/(contents)/item/[id]/_components/commentSection/state";
import { addComment, fetchComments } from "@/app/(contents)/item/[id]/actions";
import { Skeleton } from "@/ui/Skeleton";
import { handleCtrlEnterSubmit } from "@/ui/form";
import { LimitTextarea } from "@/ui/form/LimitElements";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { Section } from "@/ui/structure";
import { parseRelativeTime } from "@/utils/parseRelativeTime";
import { useAtom } from "jotai";
import { type Session } from "next-auth";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaEllipsis, FaFlag, FaTrash } from "react-icons/fa6";

type Props = {
  itemId: string;
  sessionUser: Session["user"] | null;
  isItemOwner: boolean;
};

/**
 * コメント(+コメントを書き込むフォーム)
 * @param param0.itemId 商品ID
 */
export const CommentSection = ({ itemId, sessionUser, isItemOwner }: Props) => {
  const [comments, setComments] = useAtom(commentsAtom);
  const [posting, setPosting] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null,
  ); // 通報するコメントのIDを格納する
  const formRef = useRef<HTMLFormElement>(null);
  const { openReportModal, ReportModal } = useReportModal({
    commentId: selectedCommentId,
    sessionUser,
  });
  const { openDeleteModal, DeleteModal } = useDeleteModal({
    commentId: selectedCommentId,
    sessionUser,
    isItemOwner,
  });

  useEffect(() => {
    fetchComments(itemId)
      .then((comments) => setComments(comments))
      .catch((error) => {
        console.error(error);
        toast.error("コメントの取得に失敗しました。");
      });
  }, [itemId, setComments]);

  const postComment = async (f: FormData, productId: string) => {
    const text = f.get("comment") as string;

    if (!text || typeof text !== "string") return;

    if (text.length > 300) {
      toast.error("300文字以内で入力してください");
      return;
    }

    setPosting(true);
    try {
      await addComment(text, productId);
      toast.success("コメントを書き込みました。");
      formRef.current?.reset();
      setComments(await fetchComments(productId));
    } catch (e) {
      console.error(e);
      toast.error("コメントの書き込みに失敗しました。");
    } finally {
      setPosting(false);
    }
  };

  return (
    <Section className="grid w-full gap-4">
      {sessionUser ? (
        <>
          {process.env.NODE_ENV !== "production" ? (
            <TestTransactionButton
              itemId={itemId}
              sessionUserId={sessionUser.id}
            />
          ) : null}
          <form
            className="flex flex-col items-start gap-4"
            action={(f) => postComment(f, itemId)}
            ref={formRef}
          >
            <LimitTextarea
              className="w-full resize-none"
              disabled={posting}
              name="comment"
              maxLength={300}
              placeholder="はじめまして。購入を検討しています！"
              onKeyDown={handleCtrlEnterSubmit}
            />
            <SubmitButton secondary className="self-end">
              コメントを書き込む
            </SubmitButton>
          </form>
        </>
      ) : (
        <p>コメントを書き込むにはログインが必要です。</p>
      )}
      <ul className="mt-8 flex w-full flex-col gap-6">
        {!comments ? (
          <div className="flex w-full flex-col gap-6">
            <Skeleton />
            <Skeleton />
          </div>
        ) : comments.length === 0 ? (
          <p className="text-center">コメントはありません。</p>
        ) : (
          comments.map((comment) => {
            const handleReport = () => {
              setSelectedCommentId(comment.id);
              openReportModal();
            };

            const handleDelete = () => {
              setSelectedCommentId(comment.id);
              openDeleteModal();
            };

            return (
              <li key={comment.id} className="flex flex-1 items-center gap-4">
                <div className="h-16 w-16 flex-none items-center justify-center rounded-full bg-gray-400">
                  <Image
                    src={comment.user.image || ""}
                    alt={comment.user.name || "名無し"}
                    className="rounded-full"
                    width={64}
                    height={64}
                  />
                </div>
                <div className="flex w-full flex-col">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold">{comment.user.name}</p>{" "}
                    <div className="flex items-center gap-2 text-gray-400">
                      <p className="text-sm">
                        {parseRelativeTime(comment.createdAt)}
                      </p>
                      {sessionUser ? (
                        <div className="dropdown dropdown-end dropdown-bottom">
                          <label
                            tabIndex={0}
                            className="btn btn-ghost h-[initial] min-h-0 p-2"
                          >
                            <FaEllipsis />
                          </label>
                          <ul
                            tabIndex={0}
                            className="menu dropdown-content z-[1] w-24 gap-2 rounded-box bg-base-100 p-2 text-red-500 shadow"
                          >
                            {comment.userId !== sessionUser.id ? (
                              <li onClick={handleReport}>
                                <div className="flex items-center whitespace-nowrap">
                                  <FaFlag />
                                  通報
                                </div>
                              </li>
                            ) : null}
                            {isItemOwner ? (
                              <li onClick={handleDelete}>
                                <div className="flex items-center whitespace-nowrap">
                                  <FaTrash />
                                  削除
                                </div>
                              </li>
                            ) : null}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <p className="whitespace-pre text-sm ">{comment.comment}</p>
                </div>
              </li>
            );
          })
        )}
      </ul>
      <ReportModal />
      <DeleteModal />
    </Section>
  );
};
