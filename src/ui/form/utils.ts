import { isArrayOfFiles } from "@/utils/typeGuard";

type FormObject = {
  [key: string]: string | number | File | File[] | undefined;
};

/**
 * formDataから全ての値を取得する
 * @param formData FormData
 * @param formObject 型情報を含んだ初期値などのオブジェクト
 * @returns 全ての値が入ったオブジェクト
 */
export const getFormValues = <T extends FormObject>(
  formData: FormData,
  formObject: T,
) =>
  Object.keys(formObject).reduce((acc, key) => {
    const value = isArrayOfFiles(formObject[key])
      ? (formData.getAll(key) as File[])
      : Number.isInteger(formObject[key])
        ? Number(formData.get(key))
        : (formData.get(key) as T[typeof key]);
    return { ...acc, [key]: value };
  }, {} as T);

/**
 * Ctrl + Enterでフォームを送信する
 * @param event キーボードイベント
 */
export const handleCtrlEnterSubmit = (event: React.KeyboardEvent) => {
  const isCtrlEnter = event.ctrlKey && event.key === "Enter";
  if (!isCtrlEnter) return;

  const textArea = event.currentTarget as HTMLTextAreaElement | null;
  if (!textArea) return;

  const form = textArea.form;
  if (form) {
    form.requestSubmit();
  }
};
