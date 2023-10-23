"use client";
import { useEffect, useState, useCallback } from "react";
import { FooterContent, FooterMobileContent, FooterIcons, NaviMenu } from "./";

/**
 * サイトのフッター
 *
 * @returns footer
 */
export function Footer() {
  const checkIsMobile = () => {
    return window.matchMedia("(max-width: 768px)").matches;
  };

  const [isMobile, setIsMobile] = useState(checkIsMobile());

  const checkWindowWidth = useCallback(() => {
    setIsMobile(checkIsMobile());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      checkWindowWidth();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [checkWindowWidth]);

  return (
    <footer className="bg-neutral p-10 text-neutral-content">
      {isMobile ? (
        <FooterMobileContent />
      ) : (
        <FooterContent />
      )}
      <FooterIcons />
    </footer>
  );
}
