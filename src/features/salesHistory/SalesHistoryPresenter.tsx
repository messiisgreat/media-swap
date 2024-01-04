import Image from "next/image";
import Link from "next/link";

type Props = {
  id: number;
  title: string;
  date: string;
  price: string;
  imageUrl: string;
};

/**
 * 売上履歴を表示する
 */
export const SalesHistoryPresenter = ({
  // id, いらないかもしれないですが一応残してます。
  title,
  date,
  price,
  imageUrl,
}: Props) => (
  <Link href="#" className="grid grid-cols-5 grid-rows-2 bg-base-200 p-4">
    <Image
      src={imageUrl}
      alt={title}
      width={30}
      height={30}
      className="row-span-2 self-center justify-self-center"
    />
    <p className="col-span-2 text-gray-500">{title}</p>
    <p className="col-span-2 col-start-2 row-start-2 text-xs text-gray-500">
      {date}
    </p>
    <div className="col-start-5 row-span-2 self-center justify-self-center font-bold">
      {price}
    </div>
  </Link>
);
