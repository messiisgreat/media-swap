"use client";

import {
  addComment,
  fetchComments,
  merchant,
} from "@/app/listing/[id]/actions";
import { parseRelativeTime } from "@/utils/parseRelativeTime";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Session } from "next-auth";
import { CommentWithPartialUser } from "@/services/listingComment";
import { Skeleton } from "@/components/Skeleton";
import { Textarea } from "@/components/formElements/FormElements";
import FormSubmitButton from "@/components/FormSubmitButton";

/**
 * コメント(+コメントを書き込むフォーム)
 * @param param0.listingId 商品ID
 */
export default function CommentSection({
  listingId,
  sessionUser,
}: {
  listingId: string;
  sessionUser: Session["user"] | null;
}) {
  const [comments, setComments] = useState<CommentWithPartialUser[] | null>(
    null,
  );
  const [posting, setPosting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetchComments(listingId)
      .then((comments) => setComments(comments))
      .catch((error) => {
        console.error(error);
        toast.error("コメントの取得に失敗しました。");
      });
  }, [listingId]);

  const postComment = async (
    f: FormData,
    sessionUser: Session["user"],
    productId: string,
  ) => {
    const text = f.get("comment") as string;

    if (!text || typeof text !== "string") return;

    if (text.length > 300) {
      toast.error("300文字以内で入力してください");
      return;
    }

    setPosting(true);
    try {
      await addComment(text, sessionUser, productId);
      toast.success("コメントを書き込みました。");
      formRef.current?.reset();
      setComments(await fetchComments(productId));
    } catch (e) {
      console.error(e);
      toast.error("コメントの書き込みに失敗しました。");
    }
    setPosting(false);
  };

  return (
    <div className="mx-auto w-full max-w-xs lg:max-w-2xl">
      {/* TODO: 検証用の取引作成ボタン！リリース時には削除 */}
      <button
        onClick={async () => {
          if (!sessionUser) {
            alert("ログインしてください");
            return;
          }
          const transactionId = await merchant(listingId, sessionUser.id);
          location.href = `/transactions/${transactionId}`;
        }}
      >
        取引を作成
      </button>
      <p className="mb-2 text-xl font-medium">コメント</p>
      {sessionUser ? (
        <form
          className="flex flex-col items-start gap-4"
          action={(f) => postComment(f, sessionUser, listingId)}
          ref={formRef}
        >
          <Textarea
            className="w-full resize-none"
            disabled={posting}
            name="comment"
            characterLimit={300}
          ></Textarea>
          <FormSubmitButton className="btn-secondary" type="submit">
            コメントを書き込む
          </FormSubmitButton>
        </form>
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
          comments.map((comment) => (
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
                  <p className="text-sm text-gray-400">
                    {parseRelativeTime(comment.createdAt)}
                  </p>
                </div>
                <p className="text-sm">{comment.comment}</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
