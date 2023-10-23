"use client";
import { useEffect, useState, useCallback } from "react";
import { FooterContent, FooterMobileContent, FooterIcons, NaviMenu } from "./";

/**
 * サイトのフッター
 *
 * @returns footer
 */
export function Footer() {
  const checkIsMobile: () => boolean = () => {
    return window.matchMedia("(max-width: 768px)").matches;
  };

  const [isMobile, setIsMobile] = useState(checkIsMobile());

  useEffect(() => {
    const checkWindowWidth = () => {
      setIsMobile(checkIsMobile());
    };

    window.addEventListener("resize", checkWindowWidth);

    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, []);

  return (
    <>
      <footer className="bg-neutral p-10 text-neutral-content">
        {isMobile ? <FooterMobileContent /> : <FooterContent />}
        <FooterIcons />
      </footer>
      {isMobile && <NaviMenu />}
    </>
  );
}
