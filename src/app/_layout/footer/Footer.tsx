"use client";
import { useEffect, useState } from "react";
import { FooterContent, FooterMobileContent, FooterIcons } from "./";

/**
 * サイトのフッター
 *
 * @returns footer
 */
export function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, [isMobile]);

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
