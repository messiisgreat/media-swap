import { useCallback, useEffect, useRef } from "react";

import { RemoveScroll } from "react-remove-scroll";

type DialogProps = {
  /** dialogの開閉状態 */
  isOpen: boolean;
  /** dialog内に表示するコンテンツ */
  children: React.ReactNode;
  /** dialogを閉じる関数 */
  onClose: VoidFunction;
  /** 外側をクリックした時にdialogを閉じるかどうか */
  hasClosableOverlay?: boolean;
};

/**
 * ダイアログを表示するコンポーネント
 * @see https://zenn.dev/no4_dev/articles/ecbbf4076c51ff
 */
export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  children,
  onClose,
  hasClosableOverlay = true,
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
    if (!hasClosableOverlay) {
      return;
    }
    onClose();
  }, [onClose]);

  const handleClickContent = useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      event.stopPropagation();
    },
    [],
  );

  return (
    <RemoveScroll removeScrollBar enabled={isOpen}>
      <dialog className="modal" ref={dialogRef} onClick={handleClickDialog}>
        <div onClick={handleClickContent}>{children}</div>
      </dialog>
    </RemoveScroll>
  );
};
