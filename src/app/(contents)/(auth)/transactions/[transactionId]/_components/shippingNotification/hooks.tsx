import { insertTrackingNumber } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/shippingNotification/actions";
import { initialTrackingNumberFormValues } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/shippingNotification/type";
import { useForm, type FormOptions } from "@/ui/form/hooks";
import { useFormActionModal } from "@/ui/modal";
import { useSetModal } from "@/ui/modal/modalProvider";
import { H } from "@/ui/structure/H";

/**
 * 送り状番号送信用モーダル
 * @param transactionId 取引ID
 * @param value 送り状番号
 * @returns handleOpen モーダルを開く関数
 */
export const useShippigNotificationModal = (
  transactionId: string,
  value: string,
) => {
  const formOptions: FormOptions = {
    authenticationRequired: true,
    showToast: true,
  };
  const { action } = useForm(
    insertTrackingNumber,
    initialTrackingNumberFormValues,
    formOptions,
  );

  const { handleOpen, FormActionModal } = useFormActionModal(
    action,
    "送信する",
  );

  useSetModal(
    <FormActionModal>
      <H className="text-center text-lg font-bold">入力番号の確認</H>
      <p>この送り状番号で送信してもよろしいですか？</p>
      <div className="flex justify-center">
        <p className="mr-4 font-bold">送り状番号:</p>
        <p className="font-bold">{value}</p>
      </div>
      <input type="hidden" name="transactionId" defaultValue={transactionId} />
      <input type="hidden" name="trackingNumber" defaultValue={value} />
    </FormActionModal>,
  );

  return { handleOpen };
};
