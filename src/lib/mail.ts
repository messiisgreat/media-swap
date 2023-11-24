import { SITE_NAME } from "@/constants/site";
import { env } from "@/utils/serverEnv";
import { createTransport, SendMailOptions } from "nodemailer";

const sendMail = async (options: SendMailOptions): Promise<boolean> => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  return transporter
    .sendMail(options)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
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
  return sendMail(options);
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
  const options = {
    from: `${SITE_NAME} 運営事務局 <${env.GMAIL_ADDRESS}>`,
    to,
    subject,
    text,
  };
  return sendMail(options);
};
