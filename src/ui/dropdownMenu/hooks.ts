import { useCallback, useEffect, type RefObject } from "react";

/**
 * ドロップダウンの外側をクリックした時にメニューを閉じるイベントリスナーを登録する
 * @param ref detailsのref
 */
export const useMenuButtonClickHandler = (
  ref: RefObject<HTMLDetailsElement>,
) => {
  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      const detailsElement = ref.current;

      if (!detailsElement) return;

      const target = event.target;

      if (!target || !(target instanceof HTMLElement)) return;

      if (!detailsElement.contains(target) || target.closest("li")) {
        detailsElement.removeAttribute("open");
      }
    },
    [ref],
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);
};
