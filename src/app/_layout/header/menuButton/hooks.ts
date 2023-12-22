import { useEffect, type RefObject } from "react";

/**
 * メニューボタンの外側をクリックした時にメニューを閉じる機能
 * @param ref メニューボタンのref
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
