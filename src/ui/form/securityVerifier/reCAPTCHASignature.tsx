import { TextLink } from "@/ui";
import { memo } from "react";
import "./reCAPTCHA.css";

/**
 * recaptchaの利用規約
 */
export const ReCAPTCHASignature = memo(function ReCAPTCHASignature() {
  return (
    <span>
      このサイトは reCAPTCHA によって保護されており、Googleの
      <TextLink
        href="https://policies.google.com/privacy"
        rel="noopener noreferrer"
      >
        プライバシーポリシー
      </TextLink>
      と
      <TextLink
        href="https://policies.google.com/terms"
        rel="noopener noreferrer"
      >
        利用規約
      </TextLink>
      が適用されます。
    </span>
  );
});
