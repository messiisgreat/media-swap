import Link from "next/link";
import "./reCAPTCHA.css";

/**
 * recaptchaの利用規約
 */
export const ReCAPTCHASignature = () => {
  return (
    <span>
      このサイトは reCAPTCHA によって保護されており、Googleの
      <Link
        href="https://policies.google.com/privacy"
        rel="noopener noreferrer"
        className="ReCAPTCHASignature"
      >
        プライバシーポリシー
      </Link>
      と
      <Link
        href="https://policies.google.com/terms"
        rel="noopener noreferrer"
        className="ReCAPTCHASignature"
      >
        利用規約
      </Link>
      が適用されます。
    </span>
  );
};
