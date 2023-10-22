"use client";
import { useEffect } from "react";

const switchViewport = () => {
  const viewport = document.querySelector('meta[name="viewport"]');
  const value =
    window.outerWidth > 360
      ? "width=device-width,initial-scale=1"
      : "width=360";
  if (viewport!.getAttribute("content") !== value) {
    viewport!.setAttribute("content", value);
  }
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

/**
 * 画面幅が360px以下の場合にviewportをwidth=360に設定する
 */
export const useViewport = () => {
  useEffect(() => {
    addEventListener("resize", switchViewport, false);
    switchViewport();
    return () => removeEventListener("resize", switchViewport);
  }, []);
};
