import { ComponentProps, useCallback } from "react";

import { twMerge } from "tailwind-merge";

import { useDialog } from "@/ui/dialog";

/**
 * 「はい」か「いいえ」の確認用モーダルを表示するためのフック
 * @param handleOk 「はい」ボタンを押した時に実行する関数
 * @param handleNo 「いいえ」ボタンを押した時に実行する関数
 * @returns open,  CheckModal
 */
export const useCheckModal = (
  handleOk: () => void | Promise<void>,
  handleNo: () => void | Promise<void>,
) => {
  const { open, close, Dialog } = useDialog();

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
              onClick={async () => {
                await handleOk();
                close();
              }}
            >
              はい
            </button>
            <button
              className={twMerge(
                "bg-white text-black hover:bg-gray-100 md:row-start-1 md:row-end-2",
                linkClass,
              )}
              onClick={async () => {
                await handleNo();
                close();
              }}
            >
              いいえ
            </button>
          </div>
        </div>
      </Dialog>
    ),
    [Dialog, handleOk, handleNo, close],
  );

  return { open, CheckModal };
};
