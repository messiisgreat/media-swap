/** フォームに定義されるべき状態の共通型 */
export type FormState<T> = {
  /** 型引数と確認コード */
  values: T & { verificationCode: string };
  /** toastで表示したいバリデーションエラーのメッセージ */
  toast?: {
    message: string;
    type: "success" | "error";
  };
};
