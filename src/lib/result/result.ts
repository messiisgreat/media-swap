/** 成功時の型 */
type Success<T> = {
  isSuccess: true;
  isFailure: false;
  value: T;
};

/** 失敗時の型 */
type Failure<E> = {
  isSuccess: false;
  isFailure: true;
  error: E;
};

/**
 * 成功と失敗時の戻り値の型定義を行う
 * @param T 成功時の型 (デフォルトはstring)
 * @param E 失敗時の型 (デフォルトはstring)
 * @example
 * ```typescript
 * type MyResult = Result<number, string>
 * ```
 * このようにすると
 * 成功時にresult.valueでnumberが、
 * 失敗時にresult.errorでstringが取得できる
 */
export type Result<T = undefined, E = undefined> = Success<T> | Failure<E>;

/**
 * 成功時の結果を格納する
 * @param value 成功時の値
 * @returns
 */
export const success = <T = undefined>(value?: T): Success<T> => ({
  isSuccess: true,
  isFailure: false,
  value: value as T,
});

/**
 * 失敗時の結果を格納する
 * @param error 失敗時のエラー
 * @returns
 */
export const failure = <E = undefined>(error?: E): Failure<E> => ({
  isSuccess: false,
  isFailure: true,
  error: error as E,
});
