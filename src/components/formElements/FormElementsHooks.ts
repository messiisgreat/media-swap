import { useState } from "react";
import { z } from "zod";

/**
 * 文字数制限を扱うためのフック
 * @param {string} initialValue - テキスト入力フィールドの初期値
 * @param {number} limit - テキスト入力フィールドで許可される最大文字数（オプション）
 * @returns {object} - テキスト入力フィールドの現在の値、エラーメッセージ、文字数カウント、および値を更新するためのhandleChange関数を含むオブジェクト
 */
export function useCharacterLimit(
  initialValue: string,
  limit?: number,
): {
  value: string;
  error: string;
  characterCount: number;
  handleChange: (newValue: string) => void;
} {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [characterCount, setCharacterCount] = useState(
    initialValue.length || 0,
  );

  if (limit === undefined) {
    return {
      value,
      error,
      characterCount,
      handleChange: (newValue: string) => setValue(newValue),
    };
  }
  const limitSchema = z
    .string()
    .max(limit, { message: `文字数は${limit}文字以下にしてください` })
    .or(z.number());

  const handleChange = (newValue: string) => {
    const result = limitSchema.safeParse(newValue);
    if (result.success) {
      setValue(newValue);
      setCharacterCount(newValue.length);
      setError("");
    } else {
      setError(result.error.errors[0].message);
    }
  };
  return { value, error, characterCount, handleChange };
}
