import { useCallback, useState } from "react";

import { Dialog as Component } from "@/ui/modal/dialog/Dialog";

type Props = Omit<
  Parameters<typeof Component>[0],
  "isOpen" | "onClose" | "rootElement"
>;

type useDialogResult = {
  /** dialogを開く関数 */
  handleOpen: () => void;
  /** dialogを閉じる関数 */
  handleClose: () => void;
  /** dialogを表示するコンポーネント */
  Dialog: React.FC<Props>;
};

/**
 * ダイアログを扱うためのフック
 * @returns open, close, Dialog
 */
export const useDialog = (): useDialogResult => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = useCallback((): void => {
    setOpen(true);
  }, []);

  const handleClose = useCallback((): void => {
    setOpen(false);
  }, []);

  const Dialog: React.FC<Props> = useCallback(
    (props: Props): React.ReactElement => (
      <Component isOpen={isOpen} onClose={handleClose} {...props} />
    ),
    [handleClose, isOpen],
  );

  return { handleOpen, handleClose, Dialog };
};
