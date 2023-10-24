"use client";
import { FooterContent, FooterMobileContent, NaviMenu } from "./";
import { useMediaQuery } from "@/app/hooks";

/**
 * サイトのフッター
 *
 * @returns footer
 */
export function Footer() {
  const isMobile = useMediaQuery();

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
