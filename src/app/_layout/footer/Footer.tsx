"use client";
import {
  FooterContent,
  FooterMobileContent,
} from "@/app/_layout/footer/FooterContents";
import { useMediaQuery } from "@/hooks";

/**
 * サイトのフッター
 *
 * @returns footer
 */
export function Footer() {
  const isMobile = useMediaQuery();

  return <>{isMobile ? <FooterMobileContent /> : <FooterContent />}</>;
}
