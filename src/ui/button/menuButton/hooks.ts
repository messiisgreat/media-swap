import { useCallback, useEffect, useRef } from "react";

/**
 * 外側クリックを検知するカスタムフック
 * @returns
 */
export const useCloseDetailsOnOutsideClick = () => {
  const dropdownRef = useRef<HTMLDetailsElement>(null);

  const isOutsideClick = (event: MouseEvent): boolean => {
    const target = event.target as HTMLElement;
    return !dropdownRef.current?.contains(target);
  };

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (isOutsideClick(event)) {
      dropdownRef.current?.removeAttribute("open");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return { dropdownRef, handleOutsideClick };
};
