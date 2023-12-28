import { useCallback, type ReactNode } from "react";

import { Button } from "@/ui";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useDialog } from "@/ui/modal/dialog";

/**
 * form要素を使ったモーダルを作成するためのフック    \
 * このhookから提供されるコンポーネントでラップすることで、共通レイアウトを適用できる
 * @param action 実行ボタンを押した時に実行する関数
 * @param actionText 実行ボタンのテキスト
 * @returns handleOpen,  FormActionModal
 */
export const useFormActionModal = (
  action: (formData: FormData) => void | Promise<void>,
  actionText: string = "実行する",
) => {
  const { handleOpen, handleClose, Dialog } = useDialog();

  const onAction = useCallback(
    async (f: FormData) => {
      await action(f);
      handleClose();
    },
    [action, handleClose],
  );

  const FormActionModal = useCallback(
    ({ children }: { children: ReactNode }) => (
      <Dialog>
        <div className="modal-box mx-auto">
          <button
            className="btn btn-circle btn-ghost btn-md absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>
          <form className="flex flex-col gap-4" action={onAction}>
            {children}
            <SubmitButton className="btn-error">{actionText}</SubmitButton>
          </form>
        </div>
      </Dialog>
    ),
    [Dialog, actionText, handleClose, onAction],
  );

  return {
    /** モーダルを開く関数 */
    handleOpen,
    /** モーダルを表示するコンポーネント */
    FormActionModal,
  };
};

/**
 * 何らかの動作をするかどうかの確認用モーダルを作成するためのフック    \
 * formActionではなく、通常のReact Acitonを実行する想定    \
 * 関数は`use server`ならサーバー側、`use client`ならクライアント側で実行される。
 * @param onClick 実行ボタンを押した時に実行する関数
 * @param actionText 実行ボタンのテキスト
 */
export const useReactActionModal = (
  onClick: () => void | Promise<void>,
  actionText: string = "実行する",
) => {
  const { handleOpen, handleClose, Dialog } = useDialog();

  const handleClick = useCallback(async () => {
    await onClick();
    handleClose();
  }, [onClick, handleClose]);

  const ReactActionModal = useCallback(
    ({ children }: { children: ReactNode }) => (
      <Dialog>
        <div className="modal-box mx-auto">
          <button
            className="btn btn-circle btn-ghost btn-md absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>
          <div className="flex flex-col gap-4">
            {children}
            <Button className="btn-primary" onClick={handleClick}>
              {actionText}
            </Button>
          </div>
        </div>
      </Dialog>
    ),
    [Dialog, actionText, handleClose, handleClick],
  );

  return {
    /** モーダルを開く関数 */
    handleOpen,
    /** モーダルを表示するコンポーネント */
    ReactActionModal,
  };
};
