"use client";

import { useCallback, useEffect, useRef, type ComponentProps } from "react";

import toast from "react-hot-toast";

import { toastErrors, type FormState } from "@/ui/form";
import { useVerify } from "@/ui/form/securityVerifier/hooks";
import { getObjectValues } from "@/utils/converter";
import { useFormState } from "react-dom";

/**
 * フォームの状態を監視し、エラーと通知をトースト表示する
 * @param formState フォームの状態
 * @todo 2箇所で使用されているので残しているが、削除予定
 * @deprecated
 */
export const useFormMessageToaster = <T,>(formState: FormState<T>) => {
  useEffect(() => {
    if (formState.errors) {
      getObjectValues(formState.errors).forEach((messages) => {
        messages?.forEach((message) => {
          toast.error(message);
        });
      });
    }
  }, [formState.errors]);

  useEffect(() => {
    if (formState.message) {
      toast.success(formState.message);
    }
  }, [formState.message]);
};

const useMessageToaster = <T,>(
  formState: FormState<T>,
  hasToaster: boolean,
) => {
  useEffect(() => {
    if (!hasToaster) return;
    if (!formState.errors) return;
    toastErrors(formState.errors);
  }, [formState.errors, hasToaster]);

  useEffect(() => {
    if (!hasToaster) return;
    if (!formState.message) return;
    toast.success(formState.message);
  }, [formState.message, hasToaster]);
};

export type FormOptions = {
  /** フォーム送信後に初期化するかどうか */
  hasReset?: boolean;
  /** 認証を行うかどうか */
  hasAuth?: boolean;
  /** トースト表示を行うかどうか */
  hasToaster?: boolean;
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
  const { hasReset = false, hasAuth = false, hasToaster = false } = options;

  useMessageToaster(state, hasToaster);

  const action = useCallback(
    async (f: FormData) => {
      if (hasAuth) {
        const verificationCode = await getVerificationCode();
        f.append("verificationCode", verificationCode);
      }
      dispatch(f);
      if (hasReset) {
        ref.current?.reset();
      }
    },
    [dispatch, getVerificationCode, hasAuth, hasReset],
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
