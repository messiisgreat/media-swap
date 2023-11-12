"use client";

import { addComment, fetchComments } from "@/app/listing/[id]/actions";
import { parseRelativeTime } from "@/utils/parseRelativeTime";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Session } from "next-auth";
import { CommentWithPartialUser } from "@/services/listingComment";
import { Skeleton } from "@/components/Skeleton";



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
  const [comments, setComments] = useState<CommentWithPartialUser[] | null>(null);
  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);

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
    productId: string
  ) => {
    const text = comment;

    if (!text || typeof text !== "string") return;

    if (text.length > 300) {
      toast.error("300文字以内で入力してください");
      return;
    }

    setPosting(true);
    try {
      await addComment(text, sessionUser, productId);
      toast.success("コメントを書き込みました。");
      setComment("");
      setComments(await fetchComments(productId));
    } catch (e) {
      console.error(e);
      toast.error("コメントの書き込みに失敗しました。");
    }
    setPosting(false);
  }

  return (
    <div className="mx-auto w-full max-w-xs lg:max-w-2xl">
      <p className="mb-2 text-xl font-medium">コメント</p>
      {sessionUser ? (
        <form className="flex flex-col items-start gap-4" action={(f) => postComment(f, sessionUser, listingId)}>
          <textarea className="textarea textarea-bordered w-full resize-none" disabled={posting} name="comment" maxLength={300} value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
          <button className="btn btn-secondary flex items-center gap-2" type="submit" disabled={posting}><span className={`loading loading-spinner loading-md ${posting ? "":"hidden"}`}></span>コメントを書き込む</button>
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
