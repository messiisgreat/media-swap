import { useCallback, useState } from "react";

import { Dialog as Component } from "@/ui/dialog/Dialog";

type Props = Omit<
  Parameters<typeof Component>[0],
  "isOpen" | "onClose" | "rootElement"
>;

type useDialogResult = {
  /** dialogを開く関数 */
  open: () => void;
  /** dialogを閉じる関数 */
  close: () => void;
  /** dialogを表示するコンポーネント */
  Dialog: React.FC<Props>;
};

/**
 * ダイアログを扱うためのフック
 * @returns open, close, Dialog
 */
export const useDialog = (): useDialogResult => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const open = useCallback((): void => {
    setOpen(true);
  }, []);

  const close = useCallback((): void => {
    setOpen(false);
  }, []);

  const Dialog: React.FC<Props> = useCallback(
    (props: Props): React.ReactElement => {
      return <Component isOpen={isOpen} onClose={close} {...props} />;
    },
    [close, isOpen],
  );

  return { open, close, Dialog };
};
