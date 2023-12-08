import { useCallback, type ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

import { useDialog } from "@/ui/dialog";

/**
 * 「はい」か「いいえ」の確認用モーダルを表示するためのフック
 * @param onOkClick 「はい」ボタンを押した時に実行する関数
 * @param onNoClick 「いいえ」ボタンを押した時に実行する関数
 * @returns open,  CheckModal
 */
export const useCheckModal = (
  onOkClick: () => void | Promise<void>,
  onNoClick: () => void | Promise<void>,
) => {
  const { handleOpen: open, handleClose: close, Dialog } = useDialog();

  const handleOkClick = useCallback(async () => {
    await onOkClick();
    close();
  }, [onOkClick, close]);

  const handleNoClick = useCallback(async () => {
    await onNoClick();
    close();
  }, [onNoClick, close]);

  const linkClass =
    "h-12 btn btn-circle btn-wide border-gray-500 text-lg font-bold";

  const CheckModal = useCallback(
    ({ children, ...props }: ComponentProps<typeof Dialog>) => (
      <Dialog {...props}>
        <div className="my-16 flex flex-col items-center bg-white p-8">
          {children}
          <div className="grid justify-center gap-8 md:grid-cols-2">
            <button
              className={twMerge(
                "btn-error bg-red-500 text-white hover:bg-red-700 md:col-start-2 md:col-end-3",
                linkClass,
              )}
              onClick={handleOkClick}
            >
              はい
            </button>
            <button
              className={twMerge(
                "bg-white text-black hover:bg-gray-100 md:row-start-1 md:row-end-2",
                linkClass,
              )}
              onClick={handleNoClick}
            >
              いいえ
            </button>
          </div>
        </div>
      </Dialog>
    ),
    [Dialog, handleOkClick, handleNoClick],
  );

  return { open, CheckModal };
};
