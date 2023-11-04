"use server";

import { createTransaction } from "@/services/transaction";
import { revalidatePath } from "next/cache";
import { ListingComment, User } from "@prisma/client";
import prisma from "@/lib/prisma";
import { Session } from "next-auth";

/**
 * 購入ボタンを押したときのサーバー側処理
 * 取引を追加し、商品ページをrevalidateする
 * @param listingId - 購入対象の出品ID
 * @param buyerId - 購入対象のユーザーID
 * @param userCouponId - 購入対象のクーポンID
 */
export const purchasing = async (
  listingId: string,
  buyerId: string,
  userCouponId: string,
) => {
  await createTransaction(listingId, buyerId, userCouponId);
  revalidatePath("/products/[id]");
}

export type CommentWithPartialUser = ListingComment & { user: Partial<Pick<User, "name" | "image">> };
/**
 * コメントを取得する
 * @param listingId 取得対象の製品のID
 * @returns 取得したコメント
 */
export const getComments = async (listingId: string): Promise<CommentWithPartialUser[]> => {
  const comments = await prisma.listingComment.findMany({
    where: { listingId },
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  const commentsWithUserNameAndImage = comments.map((comment) => {
    return {
      ...comment,
      user: {
        name: comment.user?.name,
        image: comment.user?.image,
      },
    };
  });

  return commentsWithUserNameAndImage;
};

/**
 * コメントを追加する
 * @param f コメントが含まれたFormData
 * @param sessionUser NextAuthのセッション
 * @param listingId 商品ID
 */
export async function addComment(f: FormData, sessionUser: Session["user"], listingId: string) {
  await prisma.listingComment.create({
    data: {
      listingId,
      userId: sessionUser.id,
      comment: f.get("text") as string,
    },
  });
};
