import { SITE_URL } from "@/constants/site";

/**
 * メール送信時の本文作成
 * @param code email認証コード
 * @returns メール本文
 */
export const createVerificationEmailContent = (code: string) => {
  const message = `
  以下のURLをクリックして、メールアドレスの検証を完了してください。

  [認証用URL]
  ${SITE_URL}/mypage/settings/email-verification?code=${code}

`;
  return message;
};
