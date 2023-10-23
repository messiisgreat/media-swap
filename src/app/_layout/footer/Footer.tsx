"use client";
import { useEffect, useState } from "react";
import { FooterContent, FooterMobileContent, FooterIcons, NaviMenu } from "./";

/**
 * サイトのフッター
 *
 * @returns footer
 */
export function Footer() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const checkWindowWidth = () => {
      const footerWidth = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(footerWidth);
    };
    checkWindowWidth();
    window.addEventListener("resize", checkWindowWidth);
    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, []);

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
