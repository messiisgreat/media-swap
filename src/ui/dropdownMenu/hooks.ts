import { useEffect, type RefObject } from "react";

/**
 * ドロップダウンの外側をクリックした時にメニューを閉じるイベントリスナーを登録する
 * @param ref detailsのref
 */
export const useMenuButtonClickHandler = (
  ref: RefObject<HTMLDetailsElement>,
) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const detailsElement = ref.current;

      if (!detailsElement) return;

      const target = event.target;

      if (!target) return;

      if (!(target instanceof HTMLElement)) return;

      if (!detailsElement.contains(target) || target.closest("li")) {
        detailsElement.removeAttribute("open");
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref]);
};
