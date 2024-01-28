"use client";

import { useCallback, useEffect, useRef, type ComponentProps } from "react";

import toast from "react-hot-toast";

import { type FormState } from "@/ui/form";
import { useVerify } from "@/ui/form/securityVerifier/hooks";
import { useFormState } from "react-dom";

const useMessageToaster = <T,>(
  formState: FormState<T>,
  hasToaster: boolean,
) => {
  useEffect(() => {
    if (!hasToaster) return;
    if (!formState.toast?.message) return;
    switch (formState.toast.type) {
      case "error":
        toast.error(formState.toast.message);
        break;
      case "success":
        toast.success(formState.toast.message);
        break;
      default:
        break;
    }
  }, [formState.toast, hasToaster]);
};

export type FormOptions = {
  /** フォーム送信後に初期化するかどうか */
  shouldReset?: boolean;
  /** 認証を行うかどうか */
  authenticationRequired?: boolean;
  /** トースト表示を行うかどうか */
  showToast?: boolean;
};

/**
 * フォームに定義されるべき実装を提供する    \
 * useFormStateをラップし、適用済みのフォームのコンポーネントと、その子要素に必要な値の登録用関数を返す
 * @param formAction Submit時に実行するform action関数
 * @param initialState フォームの初期状態
 * @param options フォームのオプション
 * @see https://react.dev/reference/react-dom/hooks/useFormState
 * @example src/app/(support)/inquiry/MailForm.tsx 参照
 */
export const useForm = <T,>(
  /** Submit時に実行するform action関数 */
  formAction: (s: FormState<T>, d: FormData) => Promise<FormState<T>>,
  /** フォームの初期状態 */
  initialState: FormState<T>,
  /** 付加機能を有効化する際に指定 */
  options: FormOptions = {},
) => {
  const [state, dispatch] = useFormState(formAction, initialState);
  const getVerificationCode = useVerify();
  const ref = useRef<HTMLFormElement>(null);
  const {
    shouldReset = false,
    authenticationRequired = false,
    showToast = false,
  } = options;

  useMessageToaster(state, showToast);

  const action = useCallback(
    async (f: FormData) => {
      if (authenticationRequired) {
        const verificationCode = await getVerificationCode();
        f.append("verificationCode", verificationCode);
      }
      dispatch(f);
      if (shouldReset) {
        ref.current?.reset();
      }
    },
    [authenticationRequired, dispatch, getVerificationCode, shouldReset],
  );

  const Form = useCallback(
    (props: Omit<ComponentProps<"form">, "action" | "ref">) => (
      <form {...{ action, ref }} {...props} />
    ),
    [action, ref],
  );

  const register = useCallback(
    (key: keyof T) => ({
      name: key,
      defaultValue: state.values[key],
    }),
    [state.values],
  );

  return {
    /** action適用済みのフォームのコンポーネント */
    Form,
    /**
     * フォーム配下の要素に必要なプロパティを登録するための関数
     * @param key フォームの値のキー
     * @returns inputなどの入力要素に登録するべきプロパティ
     */
    register,
    /** フォームの値にアクセスする場合に使用 */
    values: state.values,
    /** Formを使用せずにactionを受け取りたい場合に使用 */
    action,
  };
};
