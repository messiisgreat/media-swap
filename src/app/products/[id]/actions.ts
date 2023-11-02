"use server";

import { updateProductStatus } from "@/services/product";
import { revalidatePath } from "next/cache";
import { Comment, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";

/**
 * 製品のステータスを更新し、関連するパスをrevalidate
 *
 * @param {string} productId - 更新対象の製品のID
 */
export async function updateProduct(productId: string) {
  await updateProductStatus(productId);

  revalidatePath("/products/[id]");
}

export type CommentWithPartialUser = Comment & { user: Partial<Pick<User, "name" | "image">> };
/**
 * コメントを取得する
 * @param productId 取得対象の製品のID
 * @returns 取得したコメント
 */
export const getComments = async (productId: string): Promise<CommentWithPartialUser[]> => {
  const comments = await prisma.comment.findMany({
    where: { productId },
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
 * @param session NextAuthのセッション
 * @param productId 商品ID
 */
export async function addComment(f: FormData, session: Session, productId: string) {
  await prisma.comment.create({
    data: {
      productId,
      userId: session.user.id,
      body: f.get("text") as string,
    },
  });
}