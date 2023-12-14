"use client";
import { useEffect, useRef, useState } from "react";

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

/**
 * 画面幅が360px以下の場合にviewportをwidth=360に設定する
 */
export const useResizeViewport = () => {
  useEffect(() => {
    const handleResize = () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      const value =
        window.outerWidth > 360
          ? "width=device-width,initial-scale=1"
          : "width=360";
      if (viewport && viewport.getAttribute("content") !== value) {
        viewport.setAttribute("content", value);
      }
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    addEventListener("resize", handleResize, false);
    handleResize();

    return () => removeEventListener("resize", handleResize);
  }, []);
};
