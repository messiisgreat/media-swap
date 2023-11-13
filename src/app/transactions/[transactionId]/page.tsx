import NotFoundPage from "@/app/not-found";
import { MessageSection } from "@/app/transactions/[transactionId]/MessageSection";
import { findTransaction } from "@/services/transaction";
import { getSessionUser } from "@/utils/getSession";
import Image from "next/image";
import { FaClock, FaChevronRight } from "react-icons/fa";

/**
 * 取引画面
 * @param param0.transactionId 取引ID
 */
export default async function Transaction({
  params,
}: {
  params: { transactionId: string };
}) {
  const transactionId = params.transactionId;
  const [transaction, sessionUser] = await Promise.all([
    findTransaction(transactionId),
    getSessionUser()
  ]);

  // TODO: ユーザーバリデーション

  if (!transaction) {
    return NotFoundPage();
  }

  if (!sessionUser) {
    return NotFoundPage();
  }

  return (
    <div className="flex w-full flex-col gap-4 py-4 lg:flex-row">
      <aside className="flex flex-1 flex-col gap-8">
        <div className="alert alert-warning flex w-full">
          <FaClock size="2rem" />
          <div className="flex flex-col">
            <p className="font-bold">発送をお待ち下さい</p>
            <p>出品者からの発送通知をお待ち下さい</p>
          </div>
        </div>
        <div>
          <p>出品者情報</p>
          <div className="btn btn-ghost flex h-20 items-center justify-between px-0">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <Image
                    src="https://picsum.photos/200"
                    width={64}
                    height={64}
                    alt=""
                  />
                </div>
              </div>
              <span className="text-xl">テスト</span>
            </div>
            <FaChevronRight />
          </div>
        </div>
      </aside>
      <div className="flex flex-1 flex-col gap-4">
        <p>メッセージ</p>
        <MessageSection transaction={transaction} sessionUser={sessionUser} />
      </div>
    </div>
  );
}
