"use server";

import {
  ItemCommentSchema,
  initialItemCommentState,
  type ItemCommentFormState,
} from "@/app/(contents)/item/[itemId]/_components/commentForm/type";
import { sendMailOnComment } from "@/app/(contents)/item/[itemId]/_components/commentForm/utils";
import { createItemComment } from "@/repositories/itemComment";
import { getFormValues } from "@/ui/form";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getSessionUser } from "@/utils";
import { revalidatePath } from "next/cache";

/**
 * コメントフォームsubmit時の処理
 * バリデーションエラーがある場合はエラーメッセージを含んだ状態を返す
 * 成功時はコメントを登録し、ページをrevalidateする
 * @param prevState 前の状態
 * @param formData FormData
 */
export const commentFormAction = async (
  prevState: ItemCommentFormState,
  formData: FormData,
): Promise<ItemCommentFormState> => {
  const values = getFormValues(formData, prevState.values);
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.id;
  const { comment, itemId, verificationCode } = values;
  if (!userId) {
    return {
      ...prevState,
      toast: {
        message: "セッションが切れました。再度ログインしてください。",
        type: "error",
      },
    };
  }

  const result = await verifyForm(verificationCode);
  if (result.isFailure) {
    return {
      ...prevState,
      toast: {
        message: result.error,
        type: "error",
      },
    };
  }

  const validated = ItemCommentSchema.safeParse(values);
  if (!validated.success) {
    const message = validated.error.errors[0]?.message;
    return {
      ...prevState,
      toast: message ? { message, type: "error" } : undefined,
    };
  }

  try {
    const itemComment = await createItemComment(comment, userId, itemId);
    await sendMailOnComment(itemComment);
    revalidatePath(`/item/${itemId}`);
    return {
      ...initialItemCommentState,
      toast: {
        message: "コメントを投稿しました",
        type: "success",
      },
    };
  } catch (error) {
    return {
      ...prevState,
      toast: {
        message: "コメントの投稿に失敗しました",
        type: "error",
      },
    };
  }
};
