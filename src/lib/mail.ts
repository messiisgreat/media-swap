import { createTransport, type SendMailOptions } from "nodemailer";

import { EMAIL_SIGNATURE } from "@/constants/emailSignature";
import { SITE_NAME } from "@/constants/site";
import { env } from "@/utils/serverEnv";

const sendMail = (options: SendMailOptions): Promise<boolean> => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: env.GMAIL_ACCOUNT,
      pass: env.GMAIL_PASSWORD,
    },
  });

  return transporter
    .sendMail(options)
    .then(() => true)
    .catch(() => false);
};

/**
 * 管理者にメールを送信する
 * 問い合わせフォームなどで使用する
 * @param from 送信者名
 * @param subject 件名
 * @param text 本文
 * @returns 送信が成功したかどうか
 */
export const sendMailToAdmin = async (
  from: string,
  subject: string,
  text: string,
) => {
  const options = {
    from,
    to: env.GMAIL_ADDRESS,
    subject,
    text,
  };
  return await sendMail(options);
};

/**
 * ユーザーにメールを送信する
 * @param to 送信先メールアドレス
 * @param subject 件名
 * @param text 本文
 * @returns 送信が成功したかどうか
 */
export const sendMailToUser = async (
  to: string,
  subject: string,
  text: string,
) => {
  const fullText = `${text}\n\n${EMAIL_SIGNATURE}`; // 本文と署名をマージ
  const options = {
    from: `${SITE_NAME} 運営事務局 <${env.GMAIL_ADDRESS}>`,
    to,
    subject,
    text: fullText,
  };
  return await sendMail(options);
};
