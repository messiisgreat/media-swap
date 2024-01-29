"use client";

import { useEffect } from "react";

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
