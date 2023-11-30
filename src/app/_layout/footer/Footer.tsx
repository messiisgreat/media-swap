import {
  FooterContent,
  FooterMobileContent,
} from "@/app/_layout/footer/FooterContents";

/**
 * サイトのフッター
 *
 * @returns footer
 */
export function Footer() {
  return (
    <>
      <FooterMobileContent />
      <FooterContent />
    </>
  );
}
