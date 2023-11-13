import { FaClock, FaMoneyCheckAlt, FaTruck } from "react-icons/fa";

function BeforePaymentSellerStatus() {
  return (
    <div className="alert alert-info flex w-full">
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
    <div className="alert alert-info flex w-full">
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
    <div className="alert alert-info flex w-full">
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
        <p>到着をお待ち下さい</p>
      </div>
    </div>
  );
}
