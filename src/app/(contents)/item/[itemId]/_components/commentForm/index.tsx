"use client";

import { commentFormAction } from "@/app/(contents)/item/[itemId]/_components/commentForm/actions";
import { initialItemCommentState } from "@/app/(contents)/item/[itemId]/_components/commentForm/constants";
import { useSessionUser } from "@/app/_layout/provider/AuthProvider";
import { handleCtrlEnterSubmit } from "@/ui/form";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useForm, type FormOptions } from "@/ui/form/hooks";
import { LimitTextarea } from "@/ui/form/inputs/LimitElements";

type Props = {
  /** 商品ID */
  itemId: string;
};

/**
 * コメントを書き込むフォーム
 */
export const CommentForm = ({ itemId }: Props) => {
  const formOptions: FormOptions = {
    authenticationRequired: true,
    shouldReset: true,
    showToast: true,
  };
  const { Form, register } = useForm(
    commentFormAction,
    initialItemCommentState,
    formOptions,
  );
  const sessionUser = useSessionUser();

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
