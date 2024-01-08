import { type FormState } from "@/ui/form";
import { z, type ZodType } from "zod";

export type TransactionMessageFormValues = {
  /** メッセージ */
  message: string;
  /** 取引ID */
  transactionId: string;
};

export type TransactionMessageFormState =
  FormState<TransactionMessageFormValues>;

export const initialTransactionMessageState = {
  values: {
    message: "",
    transactionId: "",
    verificationCode: "",
  },
  errors: {},
  message: "",
} as const satisfies TransactionMessageFormState;

export const TransactionMessageSchema: ZodType<TransactionMessageFormValues> =
  z.object({
    message: z
      .string()
      .min(1, { message: "メッセージを入力してください" })
      .max(300, { message: "メッセージは300文字以内で入力してください" }),
    transactionId: z.string(),
    verificationCode: z.string(),
  });
