import { useState } from "react";
import { z } from "zod";

// eslint-disable-next-line jsdoc/require-jsdoc
export function useCharacterLimit2(
  initialValue: string,
  limit?: number,
): {
  value: string;
  error: string;
  handleChange: (newValue: string) => void;
} {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  if (limit === undefined) {
    return {
      value,
      error,
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
      setError("");
    } else {
      setError(result.error.errors[0].message);
    }
  };
  return { value, error, handleChange };
}

/**
 * テキスト入力フィールドの文字数制限を扱うためのフックス
 * @param {string} initialValue - テキスト入力フィールドの初期値
 * @param {number} limit - テキスト入力フィールドで許可される最大文字数（オプション）
 * @returns {object} - テキスト入力フィールドの現在の値、文字数カウント、および値を更新するためのhandleChange関数を含むオブジェクト
 */
export function useCharacterLimit(
  initialValue: string,
  limit?: number,
): {
  value: string;
  characterCount: number;
  handleChange: (newValue: string) => void;
} {
  const [value, setValue] = useState(initialValue);
  const [characterCount, setCharacterCount] = useState(
    initialValue.length || 0,
  );
  const handleChange = (newValue: string) => {
    if (limit && newValue.length > limit) {
      setValue(newValue.substring(0, limit));
      setCharacterCount(limit);
    } else {
      setValue(newValue);
      setCharacterCount(newValue.length);
    }
  };
  return { value, characterCount, handleChange };
}
