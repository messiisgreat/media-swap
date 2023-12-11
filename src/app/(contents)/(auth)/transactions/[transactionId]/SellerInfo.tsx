import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
import { OptionMenu } from "@/app/(contents)/(auth)/transactions/OptionMenu";
import { transactionOptionItems } from "@/app/(contents)/(auth)/transactions/[transactionId]/transactionOptionItems";
import { type StaticImageData } from "next/image";

type SellerInfoProps = {
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
};

/**
 * 出品者情報
 * @returns
 */
export function SellerInfo({ seller, defaultIcon }: SellerInfoProps) {
  return (
    <div className="flex flex-col">
      <p>出品者情報</p>
      <div className="btn btn-ghost flex h-20 items-center justify-between px-0 normal-case">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <Image
                src={seller.image || defaultIcon}
                width={64}
                height={64}
                alt=""
              />
            </div>
          </div>
          <span className="text-xl">{seller.name}</span>
        </div>
        <FaChevronRight />
      </div>
      <div className="ml-auto">
        <OptionMenu
          className="absolute right-0 text-center"
          items={transactionOptionItems}
        />
      </div>
    </div>
  );
}
