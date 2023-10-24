import { useState, useEffect, useCallback } from "react";

/**
 * useMediaQuery
 * PCとSPの判定
 * @param maxWidth 
 * @returns boolean
 */
export function useMediaQuery(maxWidth: number): boolean {
  const [isMobile, setIsMobile] = useState(false);
  const checkWindowWidth = useCallback(() => {
    const footerWidth = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(footerWidth);
    return footerWidth;
  }, []);

  useEffect(() => {
    checkWindowWidth();

    const handleResize = () => {
      checkWindowWidth();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [checkWindowWidth]);

  return isMobile;
}
