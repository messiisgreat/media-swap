import "./reCAPTCHA.css";

/**
 * recaptchaの利用規約
 */
export const ReCAPTCHASignature = () => {
  return (
    <span>
      このサイトは reCAPTCHA によって保護されており、Googleの
      <a href="https://policies.google.com/privacy" rel="noopener noreferrer">
        プライバシーポリシー
      </a>
      と
      <a href="https://policies.google.com/terms" rel="noopener noreferrer">
        利用規約
      </a>
      が適用されます。
    </span>
  );
};
