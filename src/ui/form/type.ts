/** フォームに定義されるべき状態の共通型 */
export type FormState<T> = {
  /** 型引数と確認コード */
  values: T & { verificationCode: string };
  /** 型引数のkeyに対するエラーメッセージを保持する */
  errors?: Partial<Record<keyof T, string[]>>;
  /** そのフォーム全体に対するメッセージ */
  message?: string;
};
