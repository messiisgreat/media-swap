"use server";

import {
  TrackingNumberFormScheme,
  type TrackingNumberFormState,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/shippingNotification/type";
import { updateTransaction } from "@/repositories/transaction";
import { getFormValues } from "@/ui/form";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";

/**
 * 追跡番号を登録
 * @param prevState 前の状態
 * @param formData FormData
 */
export const insertTrackingNumber = async (
  prevState: TrackingNumberFormState,
  formData: FormData,
): Promise<TrackingNumberFormState> => {
  const values = getFormValues(formData, prevState.values);
  const { verificationCode, trackingNumber, transactionId } = values;

  const result = await verifyForm(verificationCode);

  if (result.isFailure) {
    return {
      ...prevState,
      message: result.error,
    };
  } else {
    const validated = TrackingNumberFormScheme.safeParse(values);

    if (!validated.success) {
      return {
        ...prevState,
        errors: validated.error.flatten().fieldErrors,
      };
    }
    try {
      await updateTransaction({
        id: transactionId,
        trackingNumber: trackingNumber,
      });
      return {
        ...prevState,
        errors: {},
        values: {
          ...prevState.values,
          trackingNumber: trackingNumber,
        },
      };
    } catch {
      return {
        ...prevState,
        message: "送り状番号の更新に失敗しました",
      };
    }
  }
};
