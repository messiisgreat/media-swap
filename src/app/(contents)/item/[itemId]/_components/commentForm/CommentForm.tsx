"use client";

import { commentFormAction } from "@/app/(contents)/item/[itemId]/_components/commentForm/actions";
import { initialItemCommentState } from "@/app/(contents)/item/[itemId]/_components/commentForm/type";
import { handleCtrlEnterSubmit } from "@/ui/form";
import { LimitTextarea } from "@/ui/form/LimitElements";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useForm } from "@/ui/form/hooks";
import { type SessionUser } from "@/utils";

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
  const { Form, register } = useForm(
    commentFormAction,
    initialItemCommentState,
    {
      hasAuth: true,
      hasToaster: true,
      hasReset: true,
    },
  );

  const isNotLoggedIn = !sessionUser;

  const placeholder = isNotLoggedIn
    ? "ログインするとコメントができます"
    : "はじめまして。購入を検討しています！";

  return (
    <Form className="flex flex-col items-start gap-4">
      <LimitTextarea
        className="w-full resize-none"
        {...register("comment")}
        maxLength={300}
        placeholder={placeholder}
        onKeyDown={handleCtrlEnterSubmit}
        disabled={isNotLoggedIn}
      />
      <input type="hidden" {...register("itemId")} defaultValue={itemId} />
      <SubmitButton secondary className="self-end" disabled={isNotLoggedIn}>
        コメントを書き込む
      </SubmitButton>
    </Form>
  );
};
