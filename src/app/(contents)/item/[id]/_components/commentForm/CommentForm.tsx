"use client";

import { commentFormAction } from "@/app/(contents)/item/[id]/_components/commentForm/actions";
import { initialItemCommentState } from "@/app/(contents)/item/[id]/_components/commentForm/type";
import { handleCtrlEnterSubmit } from "@/ui/form";
import { LimitTextarea } from "@/ui/form/LimitElements";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useFormMessageToaster } from "@/ui/form/hooks";
import { useVerify } from "@/ui/form/securityVerifier/hooks";
import { type SessionUser } from "@/utils";
import { useRef } from "react";
import { useFormState } from "react-dom";

type Props = {
  /** 商品ID */
  itemId: string;
  /** セッションユーザーID */
  sessionUser: SessionUser | undefined;
};

/**
 * コメントを書き込むフォーム
 */
export const CommentForm = ({ itemId, sessionUser }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, dispatch] = useFormState(
    commentFormAction,
    initialItemCommentState,
  );
  useFormMessageToaster(state);
  const getVerificationCode = useVerify();

  const action = async (f: FormData) => {
    const verificationCode = await getVerificationCode();
    f.append("verificationCode", verificationCode);
    dispatch(f);
    formRef.current?.reset();
  };

  const isNotLoggedIn = !sessionUser;

  const placeholder = isNotLoggedIn
    ? "ログインするとコメントができます"
    : "はじめまして。購入を検討しています！";

  return (
    <form
      className="flex flex-col items-start gap-4"
      action={action}
      ref={formRef}
    >
      <LimitTextarea
        className="w-full resize-none"
        name="comment"
        maxLength={300}
        placeholder={placeholder}
        onKeyDown={handleCtrlEnterSubmit}
        defaultValue={state.values.comment}
        disabled={isNotLoggedIn}
      />
      <input type="hidden" name="itemId" defaultValue={itemId} />
      <SubmitButton secondary className="self-end" disabled={isNotLoggedIn}>
        コメントを書き込む
      </SubmitButton>
    </form>
  );
};
