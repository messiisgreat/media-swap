"use client";
import { useEffect, useState, useCallback } from "react";
import { FooterContent, FooterMobileContent, NaviMenu } from "./";

/**
 * サイトのフッター
 *
 * @returns footer
 */
export function Footer() {
  const [isMobile, setIsMobile] = useState(false);
      const checkWindowWidth = useCallback(() => {
    const footerWidth = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(footerWidth);
    return footerWidth
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

  return (
    <>
      {isMobile ? (
        <>
          <FooterMobileContent />
          <NaviMenu />
        </>
      ) : (
        <FooterContent />
      )}
    </>
  );
}
