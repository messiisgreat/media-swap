import { useEffect, useState } from "react";

/**
 * useMediaQuery
 * PCとSPの判定
 * @param maxWidth
 * @returns boolean
 */
export function useMediaQuery(maxWidth: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(`(max-width: ${maxWidth}px)`).matches,
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(`(max-width: ${maxWidth}px)`);

    const handleResize = () => {
      setIsMobile(mediaQueryList.matches);
    };

    mediaQueryList.addEventListener("change", handleResize);

    handleResize(); // 初回実行

    return () => {
      mediaQueryList.removeEventListener("change", handleResize);
    };
  }, [maxWidth]);

  return isMobile;
}
