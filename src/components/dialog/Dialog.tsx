import { useCallback, useEffect, useRef } from "react";
import { RemoveScroll } from "react-remove-scroll";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: VoidFunction;
};

/**
 * ダイアログを表示するコンポーネント
 * @see https://zenn.dev/no4_dev/articles/ecbbf4076c51ff
 */
export const Dialog: React.FC<Props> = ({
  isOpen,
  children,
  onClose,
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
        <div className="" onClick={handleClickContent}>
          {children}
        </div>
      </dialog>
    </RemoveScroll>
  );
};
