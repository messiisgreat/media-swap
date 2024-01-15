import { failure, success, type Result } from "@/lib/result";
import { type URLString } from "@/utils/types";

type APIErrorResponse = {
  /**エラーコード */
  code: string | undefined;
  /** エラーの種類を表す文字列 */
  title: string;
  /** APIの取得結果に含まれるエラーメッセージ */
  message: string;
};

const ERROR_PATTERN = {
  400: "INVALID_TOKEN",
  401: "UNAUTHORIZED",
  403: "FORBIDDEN",
  500: "INTERNAL_SERVER_ERROR",
  502: "BAD_GATEWAY",
  404: "NOT_FOUND",
} as const;

const UNHANDLED_ERROR = "UNHANDLED_ERROR";

const handleErrors = <T>(res: Response): Result<T, APIErrorResponse> => {
  const statusCode = res.status.toString();

  if (isStatusCode(statusCode)) {
    return failure({
      code: statusCode,
      title: ERROR_PATTERN[statusCode],
      message: res.statusText,
    });
  } else {
    return failure({
      code: undefined,
      title: UNHANDLED_ERROR,
      message: res.statusText,
    });
  }
};

/**
 * fetchの結果をResult型で取得するラッパー関数
 * @param url URL
 * @param options fetchのオプション
 * @returns 型引数で指定した型 | APIErrorResponseのResult型
 */
export const fetchResult = async <T extends Record<string, unknown>>(
  url: URLString,
  options?: RequestInit,
): Promise<Result<T, APIErrorResponse>> => {
  try {
    const res = await fetch(url, options);

    if (!res)
      return failure({
        code: undefined,
        title: UNHANDLED_ERROR,
        message: "unhandled error",
      });

    if (!res.ok) return handleErrors(res);

    return success(await res.json());
  } catch (error) {
    return failure({
      code: undefined,
      title: UNHANDLED_ERROR,
      message: "unhandled error",
    });
  }
};

const isStatusCode = (value: unknown): value is keyof typeof ERROR_PATTERN =>
  typeof value === "string" && value in ERROR_PATTERN;
