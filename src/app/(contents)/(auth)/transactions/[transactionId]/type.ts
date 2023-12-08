import { ZodType, z } from "zod";

import { FormState } from "@/ui/form";

export type TrackingNumberFormValues = {
  /** transactionId */
  transactionId: string;
  /** 追跡番号 */
  trackingNumber: string;
  /** 認証コード */
  verificationCode: string;
};

export type TrackingNumberFormState = FormState<TrackingNumberFormValues>;

export const initialTrackingNumberFormValues: TrackingNumberFormState = {
  values: {
    transactionId: "",
    trackingNumber: "",
    verificationCode: "",
  },
  errors: {},
  message: "",
};

export const TrackingNumberFormScheme: ZodType<TrackingNumberFormValues> =
  z.object({
    transactionId: z.string(),
    trackingNumber: z
      .string()
      .refine((value) => value.length >= 11 && value.length <= 13, {
        message: "11桁以上13桁以内の数字を入力してください",
      }),
    verificationCode: z
      .string({ required_error: "認証を行ってください" })
      .min(1, { message: "認証を行ってください" }),
  });
