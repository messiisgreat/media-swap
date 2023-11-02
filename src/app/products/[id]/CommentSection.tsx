"use client";

import { CommentWithPartialUser, getComments } from "@/app/products/[id]/actions";
import { parseRelativeTime } from "@/utils/parseRelativeTime";
import { Session } from "next-auth";
import Image from "next/image";
import { useEffect, useState } from "react";

function Skeleton() {
  return (
    <div role="status" className="flex w-full animate-pulse items-center gap-2">
      <div className="h-16 w-16 flex-none items-center justify-center rounded-full bg-gray-400"></div>
      <div className="w-full">
        <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-400"></div>
        <div className="mb-2.5 h-2 rounded-full bg-gray-400"></div>
        <div className="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-400"></div>
        <div className="h-2 max-w-[360px] rounded-full bg-gray-400"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

/**
 * コメント(+コメントを書き込むフォーム)
 * @param param0.productId 商品ID
 */
export default function CommentSection({
  productId,
  session,
}: {
  productId: string;
  session: Session | null;
}) {
  const [comments, setComments] = useState<CommentWithPartialUser[] | null>(null);

  useEffect(() => {
    /*setComments([
      {
        id: "1",
        user: {
          name: "ユーザー1",
          iconUrl: "https://picsum.photos/200",
        },
        comment: "コメント1",
        createdAt: new Date(),
      },
    ]);*/

    getComments(productId).then((comments) => setComments(comments));
  }, [productId]);

  return (
    <div className="mx-auto w-full">
      <p className="mb-2 text-xl font-medium">コメント</p>
      {session ? (
        <form className="flex flex-col items-start gap-4">
          <textarea className="textarea textarea-bordered w-full resize-none"></textarea>
          <button className="btn btn-secondary">コメントを書き込む</button>
        </form>
      ) : (
        <p>コメントを書き込むにはログインが必要です。</p>
      )}
      <ul className="mt-8 flex w-full">
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
                <p className="text-sm">{comment.body}</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
