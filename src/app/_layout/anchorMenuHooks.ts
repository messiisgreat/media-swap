import { useState, useEffect, useRef } from "react";

/**
 * スクロール中かどうかを判定するReactフック
 * @param {number} [delay] - スクロール停止後に表示を切り替えるまでの遅延時間（ミリ秒）
 * @returns {boolean} - スクロール中かどうかを示す状態
 */
export const useScrollingState = (delay: number = 250): boolean => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, delay);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [delay]);

  return isScrolling;
};
