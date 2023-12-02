import { useDialog } from "@/components/dialog";
import { SubmitButton } from "@/components/form/SubmitButton";
import { ReactNode, useCallback } from "react";

type useFormActionModalResult = {
  /** モーダルを開く関数 */
  open: () => void;
  /** モーダルを表示するコンポーネント */
  FormActionModal: ({ children }: { children: ReactNode }) => JSX.Element;
};

/**
 * 何らかの動作をするかどうかの確認用モーダルを表示するためのフック
 * @param action 実行ボタンを押した時に実行する関数
 * @param actionText　実行ボタンのテキスト
 * @returns open,  FormActionModal
 */
export const useFormActionModal = (
  action: (formData: FormData) => void | Promise<void>,
  actionText: string = "実行する",
): useFormActionModalResult => {
  const { open, close, Dialog } = useDialog();

  const FormActionModal = useCallback(
    ({ children }: { children: ReactNode }) => (
      <Dialog>
        <div className="modal-box mx-auto">
          <button
            className="btn btn-circle btn-ghost btn-md absolute right-2 top-2"
            onClick={close}
          >
            ✕
          </button>
          <form
            className="flex flex-col gap-4"
            action={async (f) => {
              await action(f);
              close();
            }}
          >
            {children}
            <SubmitButton className="btn-error">{actionText}</SubmitButton>
          </form>
        </div>
      </Dialog>
    ),
    [Dialog, action, actionText, close],
  );

  return { open, FormActionModal };
};
