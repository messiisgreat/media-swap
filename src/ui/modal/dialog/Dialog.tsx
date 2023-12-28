import { useCallback, useEffect, useRef } from "react";

import { RemoveScroll } from "react-remove-scroll";
import { twMerge } from "tailwind-merge";

type DialogProps = {
  /** dialogの開閉状態 */
  isOpen: boolean;
  /** dialog内に表示するコンテンツ */
  children: React.ReactNode;
  /** dialogを閉じる関数 */
  onClose: VoidFunction;
  /** 外側をクリックした時にdialogを閉じられないようにする場合に付与 */
  hasNotClosableOverlay?: boolean;
};

/**
 * ダイアログを表示するコンポーネント
 * @see https://zenn.dev/no4_dev/articles/ecbbf4076c51ff
 */
export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  children,
  onClose,
  hasNotClosableOverlay = false,
}): React.ReactElement | null => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect((): void => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) {
      return;
    }
    if (isOpen) {
      if (dialogElement.hasAttribute("open")) {
        return;
      }
      dialogElement.showModal();
    } else {
      if (!dialogElement.hasAttribute("open")) {
        return;
      }
      dialogElement.close();
    }
  }, [isOpen]);

  const handleClickDialog = useCallback((): void => {
    if (hasNotClosableOverlay) {
      return;
    }
    onClose();
  }, [onClose, hasNotClosableOverlay]);

  const handleClickContent = useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      event.stopPropagation();
    },
    [],
  );

  return (
    <RemoveScroll removeScrollBar enabled={isOpen}>
      <dialog
        className={twMerge("modal", isOpen ? "" : "hidden")}
        ref={dialogRef}
        onClick={handleClickDialog}
      >
        <div onClick={handleClickContent}>{children}</div>
      </dialog>
    </RemoveScroll>
  );
};
