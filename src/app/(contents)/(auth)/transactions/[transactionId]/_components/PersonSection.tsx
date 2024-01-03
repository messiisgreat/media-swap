import { SellerInfo } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components";
import { OptionMenu } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/sellerInfo/OptionMenu";
import { type SessionUser } from "@/utils";
import { type StaticImageData } from "next/image";

type PersonSectionProps = {
  /** 出品者情報 */
  seller: {
    /** 出品者ID */
    id: string;
    /** 出品者名 */
    name: string | null;
    /** 出品者画像 */
    image: string | null;
  };
  /** デフォルトのアイコン */
  defaultIcon: StaticImageData;
  /** ユーザー情報 */
  sessionUser?: SessionUser;
  /** 購入者判定 */
  isBuyer?: boolean;
};

/**
 * 人物情報
 */
export const PersonSection = ({
  seller,
  defaultIcon,
  sessionUser,
  isBuyer,
}: PersonSectionProps) => (
  <>
    <SellerInfo seller={seller} defaultIcon={defaultIcon} />
    <OptionMenu sessionUser={sessionUser} isBuyer={isBuyer} />
  </>
);
