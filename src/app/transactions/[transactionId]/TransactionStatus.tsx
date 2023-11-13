import { TRANSACTION_STATUS } from "@/constants/listing";
import { Transaction } from "@prisma/client";
import { Session } from "next-auth";
import { FaClock, FaMoneyCheckAlt, FaTruck, FaBriefcase, FaTimes } from "react-icons/fa";

function BeforePaymentSellerStatus() {
  return (
    <div className="alert alert-success flex w-full">
      <FaMoneyCheckAlt size="2rem" />
      <div className="flex flex-col">
        <p className="font-bold">支払いをお待ち下さい</p>
        <p>購入者からの支払い完了通知をお待ち下さい</p>
      </div>
    </div>
  );
}

function BeforePaymentBuyerStatus() {
  return (
    <div className="alert alert-warning flex w-full">
      <FaMoneyCheckAlt size="2rem" />
      <div className="flex flex-col">
        <p className="font-bold">支払いを完了してください</p>
        <p>注文処理を進めるために、支払いを完了してください</p>
      </div>
    </div>
  );
}

function CompletePaymentSellerStatus() {
  return (
    <div className="alert alert-warning flex w-full">
      <FaTruck size="2rem" />
      <div className="flex flex-col">
        <p className="font-bold">支払いが確認されました</p>
        <p>発送を行ってください</p>
      </div>
    </div>
  );
}

function CompletePaymentBuyerStatus() {
  return (
    <div className="alert alert-success flex w-full">
      <FaClock size="2rem" />
      <div className="flex flex-col">
        <p className="font-bold">発送をお待ち下さい</p>
        <p>出品者からの発送通知をお待ち下さい</p>
      </div>
    </div>
  );
}

function SentSellerStatus() {
  return (
    <div className="alert alert-success flex w-full">
      <FaTruck size="2rem" />
      <div className="flex flex-col">
        <p className="font-bold">商品が発送されました</p>
        <p>購入者への到着をお待ち下さい</p>
      </div>
    </div>
  );
}

function SentBuyerStatus() {
  return (
    <div className="alert alert-warning flex w-full">
      <FaTruck size="2rem" />
      <div className="flex flex-col">
        <p className="font-bold">商品が発送されました</p>
        <p>到着したら受け取り評価をしてください</p>
      </div>
    </div>
  );
}

function ReceivedSellerStatus() {
  return (
    <div className="alert alert-success flex w-full">
      <FaBriefcase size="2rem" />
      <div className="flex flex-col">
        <p className="font-bold">商品が購入者に到着しました</p>
        <p>購入者が評価をし次第取引完了となります</p>
      </div>
    </div>
  );
}

function ReceivedBuyerStatus() {
  return (
    <div className="alert alert-warning flex w-full">
      <FaBriefcase size="2rem" />
      <div className="flex flex-col">
        <p className="font-bold">商品が到着しました</p>
        <p>取引評価をしてください</p>
      </div>
    </div>
  );
}

function CancelSellerStatus() {
  return (
    <div className="alert alert-error flex w-full">
      <FaTimes size="2rem" />
      <div className="flex flex-col">
        <p className="font-bold">取引がキャンセルされました</p>
        <p></p>
      </div>
    </div>
  );
}

function CancelBuyerStatus() {
  return (
    <div className="alert alert-error flex w-full">
      <FaTimes size="2rem" />
      <div className="flex flex-col">
        <p className="font-bold">取引がキャンセルされました</p>
        <p></p>
      </div>
    </div>
  );
}

/**
 * 取引のステータスを表示する
 * @param param0.transaction 取引
 * @param param0.sessionUser セッションユーザー
 * @returns 
 */
export function TransactionStatus({
  transaction,
  sessionUser,
}: {
  transaction: Transaction & { listing: { sellerId: string }};
  sessionUser: Session["user"];
}) {
  const isSeller = transaction.listing.sellerId === sessionUser.id;
  const isBuyer = transaction.buyerId === sessionUser.id;

  if (transaction.transactionStatus === TRANSACTION_STATUS.BEFORE_PAYMENT) {
    if (isSeller) {
      return <BeforePaymentSellerStatus />;
    } else if (isBuyer) {
      return <BeforePaymentBuyerStatus />;
    }
  } else if (transaction.transactionStatus === TRANSACTION_STATUS.COMPLETE_PAYMENT) {
    if (isSeller) {
      return <CompletePaymentSellerStatus />;
    } else if (isBuyer) {
      return <CompletePaymentBuyerStatus />;
    }
  } else if (transaction.transactionStatus === TRANSACTION_STATUS.SENT) {
    if (isSeller) {
      return <SentSellerStatus />;
    } else if (isBuyer) {
      return <SentBuyerStatus />;
    }
  } else if (transaction.transactionStatus === TRANSACTION_STATUS.RECEIVED) {
    if (isSeller) {
      return <ReceivedSellerStatus />;
    } else if (isBuyer) {
      return <ReceivedBuyerStatus />;
    }
  } else if (transaction.transactionStatus === TRANSACTION_STATUS.CANCELLED) {
    if (isSeller) {
      return <CancelSellerStatus />;
    } else if (isBuyer) {
      return <CancelBuyerStatus />;
    }
  } else {
    return <div></div>;
  }
}