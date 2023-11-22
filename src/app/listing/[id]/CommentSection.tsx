"use client";

import {
  addComment,
  addCommentReport,
  fetchComments,
  merchant,
  removeComment,
} from "@/app/listing/[id]/actions";
import { Button } from "@/components";
import FormSubmitButton from "@/components/FormSubmitButton";
import { Skeleton } from "@/components/Skeleton";
import { LimitTextarea } from "@/components/form/LimitElements";
import { Section } from "@/components/structure";
import { CommentWithPartialUser } from "@/services/listingComment";
import { parseRelativeTime } from "@/utils/parseRelativeTime";
import { Session } from "next-auth";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast from "react-hot-toast";
import {
  FaEllipsis,
  FaFlag,
  FaTrash,
  FaTriangleExclamation,
} from "react-icons/fa6";

/**
 * コメント(+コメントを書き込むフォーム)
 * @param param0.listingId 商品ID
 */
export default function CommentSection({
  listingId,
  sessionUser,
  isListingOwner,
}: {
  listingId: string;
  sessionUser: Session["user"] | null;
  isListingOwner: boolean;
}) {
  const [comments, setComments] = useState<CommentWithPartialUser[] | null>(
    null,
  );
  const [posting, setPosting] = useState(false);
  const [selectedComment, setSelectedComment] = useState<string | null>(null); // 通報するコメントのIDを格納する
  const formRef = useRef<HTMLFormElement>(null);
  const reportModalRef = useRef<HTMLDialogElement & { showModal: () => void }>(
    null,
  );
  const deleteModalRef = useRef<HTMLDialogElement & { showModal: () => void }>(
    null,
  );
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    fetchComments(listingId)
      .then((comments) => setComments(comments))
      .catch((error) => {
        console.error(error);
        toast.error("コメントの取得に失敗しました。");
      });
  }, [listingId]);

  const postComment = async (
    f: FormData,
    sessionUser: Session["user"],
    productId: string,
  ) => {
    const text = f.get("comment") as string;

    if (!text || typeof text !== "string") return;

    if (text.length > 300) {
      toast.error("300文字以内で入力してください");
      return;
    }

    setPosting(true);
    try {
      await addComment(text, sessionUser, productId);
      toast.success("コメントを書き込みました。");
      formRef.current?.reset();
      setComments(await fetchComments(productId));
    } catch (e) {
      console.error(e);
      toast.error("コメントの書き込みに失敗しました。");
    } finally {
      setPosting(false);
    }
  };

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) return;
    return executeRecaptcha("report_comment");
  }, [executeRecaptcha]);

  const reportComment = useCallback(
    async (f: FormData) => {
      const reason = f.get("report_reason") as string;

      if (!reason || typeof reason !== "string") return;

      if (reason.length < 3) {
        toast.error("3文字以上入力してください");
        return;
      }

      if (reason.length > 1000) {
        toast.error("1000文字以内で入力してください");
        return;
      }

      if (!selectedComment) {
        toast.error("通報するコメントが選択されていません");
        return;
      }

      if (!sessionUser) {
        toast.error("ログインしてください");
        return;
      }

      const verificationCode = await handleReCaptchaVerify();

      if (!verificationCode) {
        toast.error("reCAPTCHAの検証に失敗しました。");
        return;
      }

      try {
        const res = await addCommentReport(
          selectedComment,
          sessionUser.id,
          reason,
          verificationCode || "",
        );
        if ("error" in res) {
          toast.error(res.message);
          return;
        }
        toast.success("コメントを通報しました。");
        reportModalRef.current?.close();
      } catch (e: unknown) {
        if (String(e).toLowerCase().includes("already")) {
          toast.error("あなたは既にこのコメントを通報しています。");
          reportModalRef.current?.close();
          return;
        }
        toast.error("コメントの通報に失敗しました。");
      }
    },
    [selectedComment, sessionUser, handleReCaptchaVerify],
  );

  const deleteComment = useCallback(async () => {
    if (!selectedComment) {
      toast.error("削除するコメントが選択されていません");
      return;
    }

    if (!sessionUser) {
      toast.error("ログインしてください");
      return;
    }

    if (!isListingOwner) {
      toast.error("商品の出品者のみがコメントを削除できます");
      return;
    }

    try {
      await removeComment(selectedComment, sessionUser.id);
      /*if ("error" in res) {
        toast.error(res.message);
        return;
      }*/
      toast.success("コメントを削除しました。");
      deleteModalRef.current?.close();
      setComments(await fetchComments(listingId));
    } catch (e: unknown) {
      toast.error("コメントの削除に失敗しました。");
    }
  }, [selectedComment, sessionUser, isListingOwner, listingId]);

  return (
    <Section className="grid w-full gap-4">
      {/* TODO: 検証用の取引作成ボタン！リリース時には削除 */}
      <Button
        onClick={async () => {
          if (!sessionUser) {
            alert("ログインしてください");
            return;
          }
          const transactionId = await merchant(listingId, sessionUser.id);
          location.href = `/transactions/${transactionId}`;
        }}
      >
        検証用取引を作成
      </Button>
      {sessionUser ? (
        <form
          className="flex flex-col items-start gap-4"
          action={(f) => postComment(f, sessionUser, listingId)}
          ref={formRef}
        >
          <LimitTextarea
            className="w-full resize-none"
            disabled={posting}
            name="comment"
            maxLength={300}
          />
          <FormSubmitButton className="btn-secondary self-end" type="submit">
            コメントを書き込む
          </FormSubmitButton>
        </form>
      ) : (
        <p>コメントを書き込むにはログインが必要です。</p>
      )}
      <ul className="mt-8 flex w-full flex-col gap-6">
        {!comments ? (
          <div className="flex w-full flex-col gap-6">
            <Skeleton />
            <Skeleton />
          </div>
        ) : comments.length === 0 ? (
          <p className="text-center">コメントはありません。</p>
        ) : (
          comments.map((comment) => (
            <li key={comment.id} className="flex flex-1 items-center gap-4">
              <div className="h-16 w-16 flex-none items-center justify-center rounded-full bg-gray-400">
                <Image
                  src={comment.user.image || ""}
                  alt={comment.user.name || "名無し"}
                  className="rounded-full"
                  width={64}
                  height={64}
                />
              </div>
              <div className="flex w-full flex-col">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold">{comment.user.name}</p>{" "}
                  <div className="flex items-center gap-2 text-gray-400">
                    <p className="text-sm">
                      {parseRelativeTime(comment.createdAt)}
                    </p>
                    {sessionUser ? (
                      <div className="dropdown dropdown-end dropdown-bottom">
                        <label
                          tabIndex={0}
                          className="btn btn-ghost h-[initial] min-h-0 p-2"
                        >
                          <FaEllipsis />
                        </label>
                        <ul
                          tabIndex={0}
                          className="menu dropdown-content rounded-box z-[1] w-24 gap-2 bg-base-100 p-2 text-red-500 shadow"
                        >
                          {comment.userId !== sessionUser.id ? (
                            <li
                              onClick={() => {
                                setSelectedComment(comment.id);
                                reportModalRef.current?.showModal();
                              }}
                            >
                              <div className="flex items-center whitespace-nowrap">
                                <FaFlag />
                                通報
                              </div>
                            </li>
                          ) : null}
                          {isListingOwner ? (
                            <li
                              onClick={() => {
                                setSelectedComment(comment.id);
                                deleteModalRef.current?.showModal();
                              }}
                            >
                              <div className="flex items-center whitespace-nowrap">
                                <FaTrash />
                                削除
                              </div>
                            </li>
                          ) : null}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
                <p className="text-sm">{comment.comment}</p>
              </div>
            </li>
          ))
        )}
      </ul>
      {/* 通報モーダル */}
      <dialog ref={reportModalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-center text-lg font-bold">コメントの通報</h3>
          <p className="py-2">
            こちらはコメントの違反報告用のフォームです。基本的に返信は行っておりませんので予めご了承ください。虚偽の通報はペナルティの対象になりますのでご注意ください。
          </p>
          <form
            className="flex flex-col gap-4"
            action={(f) => reportComment(f)}
          >
            <LimitTextarea
              className="h-24"
              placeholder="通報理由を入力してください"
              required
              minLength={3}
              name="report_reason"
              maxLength={1000}
            />
            <FormSubmitButton className="btn-error">通報する</FormSubmitButton>
          </form>
        </div>
      </dialog>
      {/* 削除モーダル */}
      <dialog ref={deleteModalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-center text-lg font-bold">コメントの削除</h3>
          <p className="py-2">コメントを削除してもよろしいですか？</p>
          <div className="alert alert-warning mb-4" role="alert">
            <FaTriangleExclamation className="text-2xl" />
            <p>この操作は取り消せません。</p>
          </div>
          <div className="alert mb-4" role="alert">
            <FaFlag className="text-2xl" />
            <p>
              利用規約に違反しているコメントの場合は、先に通報を行ってください。
            </p>
          </div>
          <form className="flex flex-col gap-4" action={() => deleteComment()}>
            <FormSubmitButton className="btn-error">削除</FormSubmitButton>
          </form>
        </div>
      </dialog>
    </Section>
  );
}
