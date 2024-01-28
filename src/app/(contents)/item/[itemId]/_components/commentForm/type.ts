import { type FormState } from "@/ui/form";
import { z, type ZodType } from "zod";

export type ItemCommentFormValues = {
  /** コメントの内容 */
  comment: string;
  /** 出品商品ID */
  itemId: string;
  /** 認証コード */
  verificationCode: string;
};

export type ItemCommentFormState = FormState<ItemCommentFormValues>;

export const initialItemCommentState = {
  values: {
    comment: "",
    itemId: "",
    verificationCode: "",
  },
} as const satisfies ItemCommentFormState;

export const ItemCommentSchema: ZodType<ItemCommentFormValues> = z.object({
  comment: z
    .string()
    .min(1, { message: "コメントを入力してください" })
    .max(300, { message: "コメントは300文字以内で入力してください" }),
  itemId: z.string(),
  verificationCode: z.string(),
});
