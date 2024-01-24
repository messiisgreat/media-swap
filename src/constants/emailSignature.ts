import { PAGE_CONTENT, PAGE_LINK } from "@/constants/myPage";
import { SITE_NAME, SITE_URL } from "@/constants/site";
import { env } from "@/utils/serverEnv";

export const EMAIL_SIGNATURE = `
────────────────────────────────────
サービス名: ${SITE_NAME}
お問い合わせ先: ${env.GMAIL_ADDRESS}
サイトURL: ${SITE_URL}

※このメールに心当たりのない場合は、お手数ですが${
  env.GMAIL_ADDRESS
}までご連絡ください。

メールの配信設定
${SITE_URL}${PAGE_LINK[PAGE_CONTENT.NOTIFICATIONS]}
────────────────────────────────────
`;
