"use server";

import {
  ItemCommentSchema,
  initialItemCommentState,
  type ItemCommentFormState,
} from "@/app/(contents)/item/[itemId]/_components/commentForm/type";
import { createComment } from "@/repositories/itemComment";
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
      message: "セッションが切れました。再度ログインしてください。",
    };
  }

  const result = await verifyForm(verificationCode);
  if (result.isFailure) {
    return {
      ...prevState,
      message: result.error,
    };
  }

  const validated = ItemCommentSchema.safeParse(values);
  if (!validated.success) {
    return {
      ...prevState,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    await createComment(comment, userId, itemId);
    revalidatePath(`/item/${itemId}`);
    return {
      ...initialItemCommentState,
      message: "コメントを投稿しました",
    };
  } catch (error) {
    return {
      ...prevState,
      message: "コメントの投稿に失敗しました",
    };
  }
};
